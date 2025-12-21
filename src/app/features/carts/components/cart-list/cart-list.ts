import { Component, effect, inject, signal } from '@angular/core';
import { CartServices } from '../../services/cart-services/cart-services';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Cart } from '../../models/cart';
import { CartCreate } from '../cart-create/cart-create';

@Component({
  selector: 'app-cart-list',
  standalone: true,
  imports: [CommonModule, RouterModule, CartCreate],
  templateUrl: './cart-list.html',
  styleUrl: './cart-list.scss',
})
export class CartList {
  readonly cartService = inject(CartServices);

  readonly cartItems = this.cartService.cartItems;
  readonly total = this.cartService.total;
  readonly totalItems = this.cartService.totalItems;

  removeFromCart(productId: number) {
    this.cartService.removeItem(productId);
  }

  decreaseQuantity(productId: number) {
    this.cartService.decreaseQuantity(productId);
  }

  increaseQuantity(productId: number) {
    this.cartService.addToCart(productId, 1);
  }
}
