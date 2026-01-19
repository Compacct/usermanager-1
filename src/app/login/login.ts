import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule,],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private fb = inject(FormBuilder);
  private router = inject(Router);

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  isSubmitting = false;

  onSubmit() {
    if (this.loginForm.valid) {
      this.isSubmitting = true;
      // Simulate API request
      setTimeout(() => {
        this.isSubmitting = false;
        this.router.navigate(['/dashboard'])
      }, 1500);
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  get f() { return this.loginForm.controls; }
}
