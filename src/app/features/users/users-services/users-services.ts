import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
// src/app/features/users/models/user.model.ts
// src/app/features/users/models/user.model.ts
export interface User {
  id: number;
  email: string;
  username: string;
  password: string;
  name: {
    firstname: string;
    lastname: string;
  };
  phone: string;
  address: {
    geolocation: {
      lat: string;
      long: string; // ⚠️ لاحظ: "long" وليس "lng"
    };
    city: string;
    street: string;
    number: number;
    zipcode: string;
  };
  __v: number; // ⚠️ حقل داخلي (من MongoDB) — يمكنك تجاهله
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
  // 🔄 تحميل المستخدمين
  loadUsers() {
    this.http.get<User[]>(this.API_URL).subscribe({
      next: (users) => {
        this._users.set(users);
        console.log(users);
      },
      error: (err) => {
        console.error('فشل تحميل المستخدمين:', err);
        // يمكنك عرض رسالة خطأ للمستخدم هنا لاحقًا
      },
    });
  }
}
