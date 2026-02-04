// src/app/auth/core/repositories/auth.repository.ts
import { Observable } from 'rxjs';
import { RegisterRequest } from '../models/register-request.model';
import { AuthResponse } from '../models/register-response.model';

export abstract class RegisterRepository {
  abstract register(data: RegisterRequest): Observable<AuthResponse>;
}