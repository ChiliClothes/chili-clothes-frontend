import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LinkedInAuthService } from '../../services/linkedin-auth.service';
import {
    SocialAuthService,
    GoogleLoginProvider,
    FacebookLoginProvider,
    GoogleSigninButtonModule,
} from '@abacritt/angularx-social-login';
import { Subscription, skip } from 'rxjs';

@Component({
    selector: 'app-login',
    imports: [CommonModule, ReactiveFormsModule, GoogleSigninButtonModule],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit, OnDestroy {
    loginForm: FormGroup;
    errorMessage = '';

    private authService = inject(AuthService);
    private router = inject(Router);
    private route = inject(ActivatedRoute);
    private socialAuthService = inject(SocialAuthService);
    private linkedInAuthService = inject(LinkedInAuthService);
    private authSub?: Subscription;

    constructor(private fb: FormBuilder) {
        this.loginForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            rememberMe: [false],
        });
    }

    ngOnInit() {
        // skip(1) ignores the initial replay of the cached social user.
        // This prevents auto-login when navigating to /login after logout.
        // Only NEW auth state changes (from user clicking a social button) are processed.
        this.authSub = this.socialAuthService.authState.pipe(skip(1)).subscribe((socialUser) => {
            if (socialUser) {
                const provider = socialUser.provider === 'GOOGLE' ? 'google' : 'facebook';
                this.authService
                    .socialLogin({
                        provider,
                        token: socialUser.idToken || socialUser.authToken || '',
                    })
                    .subscribe({
                        next: () => {
                            this.redirectUser();
                        },
                        error: (err) => {
                            this.errorMessage =
                                err.error?.message ||
                                `Failed to sign in with ${provider}. Please try again.`;
                            console.error('Social login error:', err);
                        },
                    });
            }
        });
    }

    ngOnDestroy() {
        this.authSub?.unsubscribe();
    }

    onSubmit() {
        console.log('onSubmit called');
        this.errorMessage = '';

        if (this.loginForm.valid) {
            const { email, password } = this.loginForm.value;
            this.authService.login({ email, password }).subscribe({
                next: () => {
                    this.redirectUser();
                },
                error: (err) => {
                    this.errorMessage =
                        err.error?.message || 'Invalid email or password. Please try again.';
                    console.error('Login error:', err);
                },
            });
        } else {
            this.errorMessage = 'Please fill in all required fields correctly.';
            this.loginForm.markAllAsTouched();
        }
    }

    onGoogleLogin() {
        console.log(
            'Manual Google login trigger is blocked by GSI v2. Using official button overlay.'
        );
    }

    onFacebookLogin() {
        this.errorMessage = '';
        this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID).catch((err) => {
            this.errorMessage = 'Facebook login failed. Please try again.';
            console.error('Facebook signIn error:', err);
        });
    }

    onLinkedInLogin() {
        this.errorMessage = '';
        this.linkedInAuthService.initiateLogin();
    }

    private redirectUser() {
        const returnUrl = this.route.snapshot.queryParams['returnUrl'];
        if (returnUrl) {
            this.router.navigateByUrl(returnUrl);
            return;
        }

        const user = this.authService.user();
        if (user?.role?.toUpperCase() === 'ADMIN') {
            this.router.navigate(['/dashboard']);
        } else {
            this.router.navigate(['/shop']);
        }
    }
}
