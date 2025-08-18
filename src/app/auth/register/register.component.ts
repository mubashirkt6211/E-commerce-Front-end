import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder) {
  this.registerForm = this.fb.group({
  firstName: ['', Validators.required],
  lastName: ['', Validators.required],
  email: ['', [Validators.required, Validators.email]],
  password: ['', Validators.required],
  confirmPassword: ['', Validators.required],
  showPassword: [false],
  showConfirmPassword: [false], // <- important!
  acceptTerms: [false, Validators.requiredTrue],
  role: ['', Validators.required]
});
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
    if (this.registerForm.valid) {
      console.log(this.registerForm.value);
      // Add your registration logic here
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
}
