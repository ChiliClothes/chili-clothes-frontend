// src/app/auth/data/repositories/auth-implementation.repository.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterRepository } from '../../core/repositories/register-repository';
import { RegisterRequest } from '../../core/models/register-request.model';
import { AuthResponse } from '../../core/models/register-response.model';

@Injectable({ providedIn: 'root' })
export class AuthImplementationRepository extends RegisterRepository {
  // Ajusta el puerto según tu Swagger (localhost:5003)
  private readonly API_URL = 'http://localhost:5003/api/Auth/register';

  constructor(private http: HttpClient) {
    super();
  }

  register(data: RegisterRequest) {
    return this.http.post<AuthResponse>(this.API_URL, data);
  }
}