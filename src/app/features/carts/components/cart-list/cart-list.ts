import { Component, effect, inject } from '@angular/core';
import { CartServices } from '../../services/cart-services/cart-services';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cart-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cart-list.html',
  styleUrl: './cart-list.scss',
})
export class CartList {
  private cartService = inject(CartServices);

  readonly carts = this.cartService.carts;
  readonly loading = this.cartService.loading;
  readonly error = this.cartService.error;
  readonly totalCarts = this.cartService.totalCarts;

  ngOnInit() {
    this.cartService.loadCarts();
  }
}
