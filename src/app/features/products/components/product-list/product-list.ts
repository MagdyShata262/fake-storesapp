import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, OnInit } from '@angular/core';
import { ProductServices } from '../../services/product-services/product-services';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-list.html',
  styleUrl: './product-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductList implements OnInit {
  private productService = inject(ProductServices);
  ngOnInit(): void {}

  constructor() {}
  readonly products = computed(() => this.productService.products.value() ?? []);

  readonly isLoading = this.productService.products.isLoading;
  readonly error = this.productService.products.error;
}
