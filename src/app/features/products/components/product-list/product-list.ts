import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, OnInit } from '@angular/core';
import { ProductServices } from '../../services/product-services/product-services';
import { Router, RouterModule } from '@angular/router';
import { ProductFilter } from '../product-filter/product-filter';
import { ProductPagination } from '../product-pagination/product-pagination';
import { CartServices } from '../../../carts/services/cart-services/cart-services';
import { TranslateModule } from '@ngx-translate/core';
import { LanguaServices } from '../../../../core/langua-services/langua-services';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterModule, ProductFilter, ProductPagination, TranslateModule],
  templateUrl: './product-list.html',
  styleUrl: './product-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductList implements OnInit {
  private productService = inject(ProductServices);
  private cartService = inject(CartServices);
  private router = inject(Router); // ← حقن Router
  protected translate = inject(LanguaServices); // اختياري: لو احتجت استخدامه في TS
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

  addToCart(productId: number) {
    this.cartService.addToCart(productId, 1);
    setTimeout(() => {
      this.router.navigate(['/cart']);
    }, 100);
  }
}
