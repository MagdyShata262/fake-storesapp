import { Component, inject } from '@angular/core';
import { AuthServices } from '../auth-services/auth-services';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private authService = inject(AuthServices);
  private router = inject(Router);

  username = '';
  password = '';

  error = '';
  loading = false;

  onSubmit() {
    const success = this.authService.login(this.username, this.password);
    if (!success) {
      this.error = 'اسم المستخدم أو كلمة المرور غير صحيحة.';
    }
  }
}
