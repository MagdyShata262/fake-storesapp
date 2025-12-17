import { Component, computed, effect, inject } from '@angular/core';
import { ProductServices } from '../../services/product-services/product-services';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-pagination',
  imports: [CommonModule],
  templateUrl: './product-pagination.html',
  styleUrl: './product-pagination.scss',
})
export class ProductPagination {
  private productService = inject(ProductServices);
  // =============================
  // Signals
  // =============================
  // عدد الصفحات الكلي
  readonly totalPages = computed(() =>
    Math.ceil(this.productService.filteredProducts().length / this.productService.pageSize())
  );

  // الصفحة الحالية
  readonly currentPage = this.productService.page;

  // مصفوفة الصفحات لتوليد الأزرار
  readonly pages = computed(() => Array.from({ length: this.totalPages() }, (_, i) => i + 1));

  // الانتقال لصفحة محددة
  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages()) {
      this.productService.page.set(page);
    }
  }

  // الصفحة التالية
  nextPage() {
    this.goToPage(this.currentPage() + 1);
  }

  // الصفحة السابقة
  prevPage() {
    this.goToPage(this.currentPage() - 1);
  }
}
