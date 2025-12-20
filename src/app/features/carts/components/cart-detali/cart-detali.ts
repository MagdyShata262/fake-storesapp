import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CartServices } from '../../services/cart-services/cart-services';

@Component({
  selector: 'app-cart-detali',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cart-detali.html',
  styleUrl: './cart-detali.scss',
})
export class CartDetali {
  private route = inject(ActivatedRoute);
  private cartService = inject(CartServices);

  readonly cart = this.cartService.selectedCart;
  readonly products = this.cartService.cartProducts;
  readonly total = this.cartService.totalCartPrice;
  readonly loading = this.cartService.loadingDetails;
  readonly error = this.cartService.error;

  constructor() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.cartService.loadCartDetails(id);
  }
}
