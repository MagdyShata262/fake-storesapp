import { Component, inject, signal } from '@angular/core';
import { UsersServices } from '../users-services/users-services';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-users-list',
  imports: [CommonModule, RouterModule],
  templateUrl: './users-list.html',
  styleUrl: './users-list.scss',
})
export class UsersList {
  private userService = inject(UsersServices);
  readonly users = this.userService.users;
  readonly loading = signal(false); // يمكنك إضافته لاحقًا

  ngOnInit() {
    this.userService.loadUsers();
  }
}
