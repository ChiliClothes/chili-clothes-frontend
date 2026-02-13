export interface LoginDto {
    email: string;
    password: string;
}

export interface RegisterDto {
    name: string;
    email: string;
    password: string;
}

export interface AuthResponse {
    token: string;
    userId: string;
    email: string;
    name: string;
    role: string;
}

export interface SocialLoginDto {
    provider: 'google' | 'facebook' | 'linkedin';
    token: string;
    authCode?: string;
}
