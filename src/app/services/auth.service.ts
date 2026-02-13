import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { API_BASE_URL } from '../constants/api.constants';
import { LoginDto, RegisterDto, AuthResponse, SocialLoginDto } from '../models/auth.model';

export interface User {
    email: string;
    name: string;
    userId: string;
    role: string;
}

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private http = inject(HttpClient);
    private router = inject(Router);

    private currentUser = signal<User | null>(null);
    private currentToken = signal<string | null>(null);

    // Public readonly signals
    user = this.currentUser.asReadonly();
    token = this.currentToken.asReadonly();
    isAuthenticated = computed(() => this.currentToken() !== null);

    constructor() {
        this.loadTokenFromStorage();
    }

    private loadTokenFromStorage() {
        const token = localStorage.getItem('token');
        const userJson = localStorage.getItem('user');

        if (token && userJson) {
            try {
                this.currentToken.set(token);
                this.currentUser.set(JSON.parse(userJson));
            } catch (e) {
                console.error('Error loading auth from storage', e);
                this.logout();
            }
        }
    }

    login(dto: LoginDto): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(`${API_BASE_URL}/Auth/login`, dto).pipe(
            tap(response => this.handleAuthResponse(response))
        );
    }

    register(dto: RegisterDto): Observable<any> {
        return this.http.post(`${API_BASE_URL}/Auth/register`, dto);
    }

    socialLogin(dto: SocialLoginDto): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(`${API_BASE_URL}/Auth/login`, dto).pipe(
            tap(response => this.handleAuthResponse(response))
        );
    }

    reloadFromStorage() {
        this.loadTokenFromStorage();
    }

    private handleAuthResponse(response: AuthResponse) {
        const user: User = {
            email: response.email,
            name: response.name,
            userId: response.userId,
            role: response.role
        };

        this.currentToken.set(response.token);
        this.currentUser.set(user);

        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(user));
    }

    logout() {
        this.currentToken.set(null);
        this.currentUser.set(null);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('currentUser'); // Cleanup old mock key
        this.router.navigate(['/login']);
    }

    getToken(): string | null {
        return this.currentToken();
    }
}
