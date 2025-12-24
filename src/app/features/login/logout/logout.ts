import { Component, inject } from '@angular/core';
import { AuthServices } from '../auth-services/auth-services';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './logout.html',
  styleUrl: './logout.scss',
})
export class Logout {
  private authService = inject(AuthServices);

  constructor() {
    this.authService.logout();
  }
}
