import { CommonModule, DatePipe, NgOptimizedImage } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CartServices } from '../../services/cart-services/cart-services';
import { Cart } from '../../models/cart';

@Component({
  selector: 'app-cart-detali',
  standalone: true,
  imports: [CommonModule, RouterModule, DatePipe],
  templateUrl: './cart-detali.html',
  styleUrl: './cart-detali.scss',
})
export class CartDetali {
  openDeleteModal(arg0: Cart) {
    throw new Error('Method not implemented.');
  }
  private route = inject(ActivatedRoute);
  private cartService = inject(CartServices);

  readonly cart = this.cartService.selectedCart;
  readonly products = this.cartService.cartProducts;

  readonly total = this.cartService.totalCartPrice;
  readonly loading = this.cartService.loadingDetails;
  readonly error = this.cartService.error;

  constructor() {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = idParam ? Number(idParam) : NaN;

    if (!isNaN(id)) {
      this.cartService.loadCartDetails(id);
    }
  }
}
