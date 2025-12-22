import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Router } from 'express';
import { tap } from 'rxjs';
export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id: number;
    email: string;
    username: string;
    name: string;
  };
}
@Injectable({
  providedIn: 'root',
})
export class AuthServices {
  private http = inject(HttpClient);
  private router = inject(Router);

  // State
  private readonly _isLoggedIn = signal<boolean>(false);
  readonly isLoggedIn = this._isLoggedIn.asReadonly();

  // Methods
  login(username: string, password: string) {
    const body = { username, password };

    return this.http.post<LoginResponse>('https://fakestoreapi.com/auth/login', body).pipe(
      tap((res) => {
        localStorage.setItem('token', res.token);
        this._isLoggedIn.set(true);
        this.router.navigate(['/']);
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    this._isLoggedIn.set(false);
    this.router.navigate(['/login']);
  }
}
