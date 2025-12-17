import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal, computed } from '@angular/core';
import { Product } from '../../models/product-interface';
import { Observable } from 'rxjs';

export type SortType = 'price-asc' | 'price-desc' | 'rate';

@Injectable({ providedIn: 'root' })
export class ProductServices {
  private http = inject(HttpClient);
  private API = 'https://fakestoreapi.com/products';

  // ==============================
  // RAW DATA + STATE
  // ==============================
  private readonly _products = signal<Product[]>([]);
  readonly products = this._products.asReadonly();

  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

  // ==============================
  // FILTERS
  // ==============================
  readonly search = signal('');
  readonly sort = signal<SortType>('price-asc');
  readonly category = signal<string | null>(null);
  readonly minPrice = signal<number | null>(null);
  readonly maxPrice = signal<number | null>(null);

  // ==============================
  // PAGINATION
  // ==============================
  readonly page = signal(1);
  readonly pageSize = signal(8);

  // ==============================
  // FETCH PRODUCTS
  // ==============================
  loadProducts() {
    this.loading.set(true);
    this.http.get<Product[]>(this.API).subscribe({
      next: (res) => {
        this._products.set(res);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set(err.message || 'فشل تحميل المنتجات');
        this.loading.set(false);
      },
    });
  }

  // ==============================
  // COMPUTED: FILTERED PRODUCTS
  // ==============================
  readonly filteredProducts = computed(() => {
    let products = this.products();
    const term = this.search().toLowerCase();

    if (term) {
      products = products.filter((p) => p.title.toLowerCase().includes(term));
    }

    if (this.category()) {
      products = products.filter((p) => p.category === this.category());
    }

    if (this.minPrice() !== null) {
      products = products.filter((p) => p.price >= this.minPrice()!);
    }

    if (this.maxPrice() !== null) {
      products = products.filter((p) => p.price <= this.maxPrice()!);
    }

    return products;
  });

  // ==============================
  // COMPUTED: SORTED PRODUCTS
  // ==============================
  readonly sortedProducts = computed(() => {
    const products = [...this.filteredProducts()];

    switch (this.sort()) {
      case 'price-asc':
        return products.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return products.sort((a, b) => b.price - a.price);
      case 'rate':
        return products.sort((a, b) => b.rating.rate - a.rating.rate);
      default:
        return products;
    }
  });

  // ==============================
  // COMPUTED: PAGINATED PRODUCTS (Infinite Scroll ready)
  // ==============================
  readonly paginatedProducts = computed(() => {
    const start = 0;
    const end = this.page() * this.pageSize();
    return this.sortedProducts().slice(start, end);
  });

  // ==============================
  // COMPUTED: TOTAL PAGES
  // ==============================
  readonly totalPages = computed(() => Math.ceil(this.sortedProducts().length / this.pageSize()));

  // ==============================
  // ACTIONS
  // ==============================
  setSearch(value: string) {
    this.page.set(1);
    this.search.set(value);
  }

  setSort(value: SortType) {
    this.page.set(1);
    this.sort.set(value);
  }

  setCategory(value: string | null) {
    this.page.set(1);
    this.category.set(value);
  }

  setMinPrice(value: number | null) {
    this.page.set(1);
    this.minPrice.set(value);
  }

  setMaxPrice(value: number | null) {
    this.page.set(1);
    this.maxPrice.set(value);
  }

  resetFilters() {
    this.search.set('');
    this.sort.set('price-asc');
    this.category.set(null);
    this.minPrice.set(null);
    this.maxPrice.set(null);
    this.page.set(1);
  }

  loadMore() {
    this.page.update((p) => p + 1);
  }

  // ==============================
  // GET SINGLE PRODUCT
  // ==============================
  getProductById(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.API}/${id}`);
  }
}
