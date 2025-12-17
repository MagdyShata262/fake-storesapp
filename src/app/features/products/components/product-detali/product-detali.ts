import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
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

@Component({
  selector: 'app-product-detali',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-detali.html',
})
export class ProductDetali {
  private route = inject(ActivatedRoute);
  private productService = inject(ProductServices);

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
}
