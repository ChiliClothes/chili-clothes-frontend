import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { LinkedInAuthService } from '../../services/linkedin-auth.service';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-linkedin-callback',
    imports: [CommonModule],
    template: `
        <div class="min-h-screen flex items-center justify-center bg-slate-50">
            @if (error) {
                <div class="text-center">
                    <span class="material-icons text-red-500 text-5xl mb-4">error_outline</span>
                    <p class="text-slate-700 text-lg font-semibold">{{ error }}</p>
                    <a routerLink="/login" class="text-blue-600 hover:underline mt-4 block">Back to Login</a>
                </div>
            } @else {
                <div class="text-center">
                    <div class="animate-spin rounded-full h-12 w-12 border-4 border-slate-200 border-t-[#0077B5] mx-auto mb-4"></div>
                    <p class="text-slate-600 font-medium">Signing in with LinkedIn...</p>
                </div>
            }
        </div>
    `,
})
export class LinkedInCallbackComponent implements OnInit {
    error = '';

    private route = inject(ActivatedRoute);
    private router = inject(Router);
    private linkedInAuth = inject(LinkedInAuthService);
    private authService = inject(AuthService);

    ngOnInit() {
        const code = this.route.snapshot.queryParamMap.get('code');
        const state = this.route.snapshot.queryParamMap.get('state');
        const errorParam = this.route.snapshot.queryParamMap.get('error');

        if (errorParam) {
            this.error = 'LinkedIn login was cancelled or failed.';
            return;
        }

        if (!code || !state) {
            this.error = 'Invalid LinkedIn callback parameters.';
            return;
        }

        const request = this.linkedInAuth.handleCallback(code, state);
        if (request) {
            request.subscribe({
                next: (response) => {
                    // Reload auth state from storage and navigate
                    this.authService.reloadFromStorage();
                    this.router.navigate(['/shop']);
                },
                error: (err) => {
                    console.error('LinkedIn login error:', err);
                    this.error = 'Failed to sign in with LinkedIn. Please try again.';
                },
            });
        }
    }
}
