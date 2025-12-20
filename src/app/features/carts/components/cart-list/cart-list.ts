import { Component, effect, inject, signal } from '@angular/core';
import { CartServices } from '../../services/cart-services/cart-services';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Cart } from '../../models/cart';

@Component({
  selector: 'app-cart-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cart-list.html',
  styleUrl: './cart-list.scss',
})
export class CartList {
  readonly cartService = inject(CartServices);

  readonly carts = this.cartService.carts;
  readonly loading = this.cartService.loadingList;
  readonly error = this.cartService.error;
  readonly totalCarts = this.cartService.totalCarts;

  // delete flow
  readonly cartToDelete = signal<Cart | null>(null);
  readonly showToast = signal(false);

  ngOnInit() {
    this.cartService.loadCarts();
  }

  trackByCartId = (_: number, cart: Cart) => cart.id;

  openDeleteModal(cart: Cart) {
    this.cartToDelete.set(cart);
  }

  confirmDelete() {
    const cart = this.cartToDelete();
    if (!cart) return;

    this.cartService.deleteCart(cart.id);
    this.cartToDelete.set(null);
    this.showToast.set(true);

    setTimeout(() => this.showToast.set(false), 3000);
  }
}
