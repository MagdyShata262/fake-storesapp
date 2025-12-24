import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ThemeService } from '../../theme-service/theme-service';
import { RouterLink, RouterModule } from '@angular/router';
import { CartServices } from '../../../features/carts/services/cart-services/cart-services';
import { AuthServices } from '../../../features/login/auth-services/auth-services';
import { UsersServices } from '../../../features/users/users-services/users-services';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {
  theme = inject(ThemeService);
  private authService = inject(AuthServices);
  private userService = inject(UsersServices);
  toggleTheme() {
    this.theme.toggleTheme();
  }
  // 🔐 auth state (Signal)
  readonly isLoggedIn = this.authService.isLoggedIn;
  cartService = inject(CartServices); // ← حقن خدمة السلة
  // في AppComponent أو Header
  constructor() {
    this.userService.loadUsers(); // ← تأكد من استدعاء هذا في البداية
  }
  readonly totalItems = this.cartService.totalItems; // ← عدد العناصر في السلة
}
