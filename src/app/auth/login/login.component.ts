import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService, LoginRequest } from '../../shared/auth.service';
import { ToastrService } from 'ngx-toastr';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, NgIf],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  loginForm: FormGroup;
  loading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      showPassword: [false],
      rememberMe: [false],
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  togglePassword() {
    this.f['showPassword'].setValue(!this.f['showPassword'].value);
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      this.toastr.warning('Please fill all required fields correctly', 'Warning');
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    const credentials: LoginRequest = {
      email: this.f['email'].value,
      password: this.f['password'].value,
    };

    this.authService.login(credentials).subscribe({
      next: (res) => {
        this.loading = false;
        this.toastr.success('Login successful!', 'Success');
        this.router.navigate(['/']); // redirect to category page
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage = err.error?.message || err.message || 'Login failed!';
        this.toastr.error(this.errorMessage, 'Error');
      },
    });
  }
}
