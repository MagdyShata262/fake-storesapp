import { CommonModule, CurrencyPipe, DatePipe, NgOptimizedImage } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { CartServices } from '../../services/cart-services/cart-services';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink],
  templateUrl: './checkout.html',
  styleUrl: './checkout.scss',
})
export class Checkout {
  private cartService = inject(CartServices);

  readonly cartItems = this.cartService.cartItems;
  readonly total = this.cartService.total;
  readonly loading = signal(false); // لا حاجة للتحميل
  readonly error = signal<string | null>(null);

  paymentProcessing = false;
  paymentSuccess = false;

  processPayment() {
    this.paymentProcessing = true;
    setTimeout(() => {
      this.paymentProcessing = false;
      this.paymentSuccess = true;
      this.cartService.clearCart(); // ✅ تفريغ السلة بعد النجاح
    }, 2000);
  }

  resetCheckout() {
    this.paymentSuccess = false;
  }
}
