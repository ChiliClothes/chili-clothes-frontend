import { Injectable, signal, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { SocialUser } from '@abacritt/angularx-social-login';

export interface User {
    email: string;
    name: string;
}

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private currentUser = signal<User | null>(null);
    private router = inject(Router);

    // Public readonly signals
    user = this.currentUser.asReadonly();
    isAuthenticated = computed(() => this.currentUser() !== null);

    constructor() {
        // Check for saved user in localStorage
        this.loadUserFromStorage();
    }

    private loadUserFromStorage() {
        const savedUser = localStorage.getItem('currentUser');
        if (savedUser) {
            try {
                this.currentUser.set(JSON.parse(savedUser));
            } catch (e) {
                console.error('Error loading user from storage', e);
                localStorage.removeItem('currentUser');
            }
        }
    }

    login(email: string, password: string): boolean {
        // Simple validation - In production, this would call an API
        if (email && password.length >= 6) {
            const user: User = {
                email,
                name: email.split('@')[0], // Extract name from email
            };

            this.currentUser.set(user);
            localStorage.setItem('currentUser', JSON.stringify(user));
            return true;
        }
        return false;
    }

    loginWithSocialUser(socialUser: SocialUser): boolean {
        if (!socialUser.email) {
            return false;
        }
        const user: User = {
            email: socialUser.email,
            name: socialUser.name || 'Social User',
        };
        this.currentUser.set(user);
        localStorage.setItem('currentUser', JSON.stringify(user));
        return true;
    }

    logout() {
        this.currentUser.set(null);
        localStorage.removeItem('currentUser');
        this.router.navigate(['/login']);
    }
}
