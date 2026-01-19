import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Header } from '../../../services/header';

@Component({
  selector: 'app-user-create',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './user-create.html',
  styleUrl: './user-create.css',
})
export class UserCreate {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private headerService = inject(Header)
  isSubmitting = false;

  userForm: FormGroup = this.fb.group({
    firstName: ['', [Validators.required, Validators.minLength(2)]],
    lastName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    role: ['', Validators.required],
    department: [''],
    status: ['Active', Validators.required]
  });


  ngOnInit() {

    this.headerService.setTitle('Create User');
  }
 
  get f() { return this.userForm.controls; }

  onSubmit() {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched(); 
      return;
    }

    this.isSubmitting = true;

 
    console.log('User Data:', this.userForm.value);
    
    setTimeout(() => {
      this.isSubmitting = false;
      alert('User Created Successfully!');
      this.router.navigate(['/dashboard']); 
    }, 1500);
  }
}
