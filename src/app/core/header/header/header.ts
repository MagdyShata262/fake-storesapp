import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ThemeService } from '../../theme-service/theme-service';
import { RouterLink, RouterModule } from '@angular/router';
import { CartServices } from '../../../features/carts/services/cart-services/cart-services';

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

  toggleTheme() {
    this.theme.toggleTheme();
  }

  cartService = inject(CartServices); // ← حقن خدمة السلة

  readonly totalItems = this.cartService.totalItems; // ← عدد العناصر في السلة
}
