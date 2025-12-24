// src/app/features/users/components/users-detals/users-detals.component.ts
import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { CommonModule } from '@angular/common';
import { NgOptimizedImage } from '@angular/common';
import { User, UsersServices } from '../users-services/users-services';

@Component({
  selector: 'app-users-detals',
  standalone: true,
  imports: [CommonModule, RouterLink, NgOptimizedImage],
  templateUrl: './users-detals.html',
  styleUrl: './users-detals.scss',
})
export class UsersDetals {
  private route = inject(ActivatedRoute);
  private userService = inject(UsersServices);

  readonly user = signal<User | null>(null);
  readonly loading = signal(true);
  readonly error = signal<string | null>(null);

  constructor() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.loadUser(id);
    } else {
      this.error.set('معرف المستخدم غير صالح');
      this.loading.set(false);
    }
  }

  private loadUser(id: number) {
    // محاكاة التحميل (لأن FakeStoreAPI لا يدعم /users/id)
    // في الواقع، نستخدم القائمة الكاملة ونبحث محليًا
    const allUsers = this.userService.users();
    const foundUser = allUsers.find((u) => u.id === id);

    if (foundUser) {
      this.user.set(foundUser);
    } else {
      // إذا لم تكن البيانات محملة، حمل القائمة أولاً
      this.userService.loadUsers();
      // مراقبة التحديثات (يمكنك استخدام effect لو أردت)
      setTimeout(() => {
        const users = this.userService.users();
        const user = users.find((u) => u.id === id);
        if (user) {
          this.user.set(user);
        } else {
          this.error.set('لم يتم العثور على المستخدم');
        }
        this.loading.set(false);
      }, 500);
      return;
    }

    this.loading.set(false);
  }
}
