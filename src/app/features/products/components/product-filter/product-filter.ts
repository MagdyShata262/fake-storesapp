import { Component, inject } from '@angular/core';
import { ProductServices } from '../../services/product-services/product-services';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-filter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-filter.html',
  styleUrl: './product-filter.scss',
})
export class ProductFilter {
  private productService = inject(ProductServices);

  onSearch(e: Event) {
    this.productService.setSearch((e.target as HTMLInputElement).value);
  }

  onSort(e: Event) {
    this.productService.setSort((e.target as HTMLSelectElement).value as any);
  }
}
