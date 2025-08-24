import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { CommonModule, NgIf } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../shared/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, NgIf],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  registerForm: FormGroup;
  loading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.registerForm = this.fb.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
        acceptTerms: [false, Validators.requiredTrue],
        isCUSTOMER: [false],
        isSELLER: [false],
        showPassword: [false],
        showConfirmPassword: [false],
      },
      { validators: this.passwordMatchValidator }
    );
  }

  // Custom validator: password and confirm password must match
  passwordMatchValidator(group: AbstractControl) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;

    if (!password || !confirmPassword) return null; // don't validate if empty
    return password === confirmPassword ? null : { mismatch: true };
  }

  get f() {
    return this.registerForm.controls;
  }

  togglePassword() {
    this.f['showPassword'].setValue(!this.f['showPassword'].value);
  }

  toggleConfirmPassword() {
    this.f['showConfirmPassword'].setValue(!this.f['showConfirmPassword'].value);
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();

      if (this.f['password'].invalid) {
        if (this.f['password'].errors?.['required']) {
          this.toastr.warning('Password is required', 'Warning');
        } else if (this.f['password'].errors?.['minlength']) {
          this.toastr.warning('Password must be at least 6 characters', 'Warning');
        }
      }

      if (this.registerForm.errors?.['mismatch']) {
        this.toastr.warning('Password and confirm password do not match', 'Warning');
      }

      return;
    }

    this.loading = true;
    this.errorMessage = '';

    let role = 'CUSTOMER';
    if (this.f['isSELLER'].value) role = 'SELLER';
    if (this.f['isCUSTOMER'].value && this.f['isSELLER'].value) role = 'BOTH';

    const registerData = {
      firstName: this.f['firstName'].value,
      lastName: this.f['lastName'].value,
      email: this.f['email'].value,
      password: this.f['password'].value,
      role,
    };

    console.log('Register Form Data:', registerData);

    this.authService.register(registerData).subscribe({
      next: () => {
        this.loading = false;
        this.toastr.success('Registration successful!', 'Success');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage = err.error?.message || 'Registration failed!';
        this.toastr.error(this.errorMessage, 'Error');
      },
    });
  }
}
