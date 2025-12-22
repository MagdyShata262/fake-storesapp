import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
export interface User {
  id: number;
  email: string;
  username: string;
  name: string;
  phone: string;
  website: string;
  address: {
    street: string;
    catchPhrase: string;
    bs: string;
  };
}
@Injectable({
  providedIn: 'root',
})
export class UsersServices {
  private http = inject(HttpClient);
  private readonly API_URL = 'https://fakestoreapi.com/users'; // ← استخدم هذا إذا كان متاحًا

  // State
  private readonly _users = signal<User[]>([]);
  readonly users = this._users.asReadonly();

  // Computed
  readonly totalUsers = computed(() => this.users().length);

  // Actions
  loadUsers() {
    this.http.get<User[]>(this.API_URL).subscribe({
      next: (res) => this._users.set(res),

      error: () => console.error('فشل تحميل المستخدمين'),
    });
  }
}
