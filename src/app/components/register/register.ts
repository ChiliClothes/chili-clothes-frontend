import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RegisterService } from '../../services/register.service';
import { Logo } from '../logo/logo';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, Logo],
  templateUrl: './register.html',
})
export class Register {
  form = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });


  errorMessage: string = '';

  constructor(private registerService: RegisterService, private router: Router) { }

  register() {
    if (this.form.valid) {
      const { name, email, password } = this.form.value;

      this.registerService.registerUser(name!, email!, password!).subscribe({
        next: (response) => {
          console.log('Registration successful', response);
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.error('Registration failed', error);
          this.errorMessage = 'Registration failed. Please try again.';
          if (error.error && error.error.message) {
            this.errorMessage = error.error.message;
          }
        }
      });
    }
  }
}

