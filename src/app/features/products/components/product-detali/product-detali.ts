import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProductServices } from '../../services/product-services/product-services';
import {
  Observable,
  switchMap,
  map,
  catchError,
  startWith,
  of,
  distinctUntilChanged,
  filter,
  shareReplay,
} from 'rxjs';
import { Product } from '../../models/product-interface';
import { CommonModule } from '@angular/common';
import { CartServices } from '../../../carts/services/cart-services/cart-services';

@Component({
  selector: 'app-product-detali',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-detali.html',
})
export class ProductDetali {
  private route = inject(ActivatedRoute);
  private productService = inject(ProductServices);
  private cartService = inject(CartServices);
  private router = inject(Router); // ← حقن Router
  // =============================
  // STATE STREAM
  // =============================
  readonly productState$: Observable<{
    product: Product | null;
    loading: boolean;
    error: boolean;
  }> = this.route.paramMap.pipe(
    map((params) => params.get('id')),
    filter((id): id is string => !!id), // ✅ أمان من null
    distinctUntilChanged(),

    switchMap((id) =>
      this.productService.getProductById(id).pipe(
        map((product) => ({
          product,
          loading: false,
          error: false,
        })),

        startWith({
          product: null,
          loading: true,
          error: false,
        }),

        catchError(() =>
          of({
            product: null,
            loading: false,
            error: true,
          })
        )
      )
    ),

    shareReplay({ bufferSize: 1, refCount: true }) // ✅ يمنع تكرار الطلب
  );

  addToCart(productId: number) {
    this.cartService.addToCart(productId, 1);
    setTimeout(() => {
      this.router.navigate(['/cart']);
    }, 100);
  }
  // addToCart(productId: number) {
  //   this.cartService.addToCart(productId).subscribe({
  //     next: () => {
  //       alert('تم إضافة المنتج إلى السلة!');
  //       setTimeout(() => {
  //         this.router.navigate(['/carts']);
  //       }, 100);
  //     },
  //     error: () => {
  //       alert('فشل إضافة المنتج إلى السلة.');
  //     },
  //   });
  // }
}
