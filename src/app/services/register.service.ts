import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

@Injectable({ providedIn: 'root' })
export class RegisterService {

  private apiUrl = "http://localhost:5003/api/Auth/register";

  constructor(private http: HttpClient) {}


  registerUser(name: string, email: string, password: string): Observable<any> {
    const userData: RegisterRequest = { name, email, password };
    return this.http.post(this.apiUrl, userData);
  }
}
