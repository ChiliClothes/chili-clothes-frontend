import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { API_BASE_URL } from '../constants/api.constants';
import { AuthResponse } from '../models/auth.model';
import { tap } from 'rxjs';

// TODO: Replace with your actual LinkedIn Client ID from https://www.linkedin.com/developers/
const LINKEDIN_CLIENT_ID = 'YOUR_LINKEDIN_CLIENT_ID';
const LINKEDIN_REDIRECT_URI = 'http://localhost:4200/auth/linkedin/callback';
const LINKEDIN_SCOPE = 'openid profile email';

@Injectable({
    providedIn: 'root',
})
export class LinkedInAuthService {
    private router = inject(Router);
    private http = inject(HttpClient);

    /**
     * Redirects the user to LinkedIn's OAuth 2.0 authorization page.
     */
    initiateLogin(): void {
        const state = this.generateRandomState();
        sessionStorage.setItem('linkedin_oauth_state', state);

        const params = new URLSearchParams({
            response_type: 'code',
            client_id: LINKEDIN_CLIENT_ID,
            redirect_uri: LINKEDIN_REDIRECT_URI,
            scope: LINKEDIN_SCOPE,
            state: state,
        });

        window.location.href = `https://www.linkedin.com/oauth/v2/authorization?${params.toString()}`;
    }

    /**
     * Handles the LinkedIn OAuth callback.
     * Sends the authorization code to the backend for token exchange.
     */
    handleCallback(code: string, state: string) {
        const savedState = sessionStorage.getItem('linkedin_oauth_state');
        sessionStorage.removeItem('linkedin_oauth_state');

        if (state !== savedState) {
            console.error('LinkedIn OAuth state mismatch — possible CSRF attack.');
            this.router.navigate(['/login']);
            return;
        }

        return this.http
            .post<AuthResponse>(`${API_BASE_URL}/Auth/login`, {
                provider: 'linkedin',
                authCode: code,
                redirectUri: LINKEDIN_REDIRECT_URI,
            })
            .pipe(
                tap((response) => {
                    const user = {
                        email: response.email,
                        name: response.name,
                        userId: response.userId,
                        role: response.role,
                    };
                    localStorage.setItem('token', response.token);
                    localStorage.setItem('user', JSON.stringify(user));
                })
            );
    }

    private generateRandomState(): string {
        const array = new Uint8Array(16);
        crypto.getRandomValues(array);
        return Array.from(array, (byte) => byte.toString(16).padStart(2, '0')).join('');
    }
}
