import { Component, inject } from '@angular/core';
import { AuthServices } from '../auth-services/auth-services';
import { Router } from 'express';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private authService = inject(AuthServices);
  private router = inject(Router);

  username = '';
  password = '';

  onSubmit() {
    this.authService.login(this.username, this.password).subscribe({
      next: () => {
        alert('تم تسجيل الدخول بنجاح!');
      },
      error: () => {
        alert('اسم المستخدم أو كلمة المرور غير صحيحة.');
      },
    });
  }
}
