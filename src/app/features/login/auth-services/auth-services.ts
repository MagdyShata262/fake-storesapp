import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthServices {
  private http = inject(HttpClient);

  // ✅ مصادقة محاكاة (بدون API)

  // ✅ مصادقة محاكاة (بدون API)

  private platformId = inject(PLATFORM_ID);
  private router = inject(Router);

  private readonly _isLoggedIn = signal<boolean>(false);
  readonly isLoggedIn = this._isLoggedIn.asReadonly();

  // ✅ التحقق من أننا في المتصفح
  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  login(username: string, password: string): boolean {
    if (!this.isBrowser()) return false;

    const validUsername = 'admin';
    const validPassword = '123456';

    if (username === validUsername && password === validPassword) {
      localStorage.setItem('isAuthenticated', 'true');
      this._isLoggedIn.set(true);
      this.router.navigate(['/']);
      return true;
    }
    return false;
  }

  logout() {
    if (this.isBrowser()) {
      localStorage.removeItem('isAuthenticated');
    }
    this._isLoggedIn.set(false);
    this.router.navigate(['/login']);
  }

  // ✅ تهيئة الحالة (آمنة لـ SSR)
  initializeAuth() {
    if (this.isBrowser()) {
      const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
      this._isLoggedIn.set(isAuthenticated);
    }
  }
}
