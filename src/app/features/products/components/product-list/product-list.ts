import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, OnInit } from '@angular/core';
import { ProductServices } from '../../services/product-services/product-services';
import { RouterModule } from '@angular/router';
import { ProductFilter } from '../product-filter/product-filter';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterModule, ProductFilter],
  templateUrl: './product-list.html',
  styleUrl: './product-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductList implements OnInit {
  private productService = inject(ProductServices);

  // =============================
  // VIEW STATE (READ ONLY)
  // =============================
  readonly products = this.productService.paginatedProducts;
  readonly loading = this.productService.loading;
  readonly error = this.productService.error;

  ngOnInit() {
    this.productService.loadProducts();
  }

  // ✅ Infinite Scroll
  onScroll() {
    const bottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 300;

    if (bottom && !this.loading()) {
      this.productService.loadMore();
    }
  }
}
