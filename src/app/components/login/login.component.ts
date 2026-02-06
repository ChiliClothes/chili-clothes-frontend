import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { SocialAuthService, GoogleLoginProvider, GoogleSigninButtonModule } from '@abacritt/angularx-social-login';

@Component({
    selector: 'app-login',
    imports: [CommonModule, ReactiveFormsModule, GoogleSigninButtonModule],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    errorMessage = '';

    private authService = inject(AuthService);
    private router = inject(Router);
    private route = inject(ActivatedRoute);
    private socialAuthService = inject(SocialAuthService);

    constructor(private fb: FormBuilder) {
        this.loginForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            rememberMe: [false],
        });
    }

    ngOnInit() {
        // Social auth state subscription removed to focus on Backend API integration
    }

    onSubmit() {
        console.log('onSubmit called');
        this.errorMessage = '';

        if (this.loginForm.valid) {
            const { email, password } = this.loginForm.value;
            this.authService.login({ email, password }).subscribe({
                next: () => {
                    const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/shop';
                    this.router.navigate([returnUrl]);
                },
                error: (err) => {
                    this.errorMessage = err.error?.message || 'Invalid email or password. Please try again.';
                    console.error('Login error:', err);
                }
            });
        } else {
            this.errorMessage = 'Please fill in all required fields correctly.';
            this.loginForm.markAllAsTouched();
        }
    }

    onGoogleLogin() {
        console.log('Manual Google login trigger is blocked by GSI v2. Using official button overlay.');
    }

    onFacebookLogin() {
        console.log('Facebook login clicked');
        // Placeholder for future Facebook implementation
    }
}
