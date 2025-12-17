import { HttpClient, httpResource } from '@angular/common/http';
import { inject, Injectable, signal, computed } from '@angular/core';
import { Product } from '../../models/product-interface';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProductServices {
  private http = inject(HttpClient);
  private API = 'https://fakestoreapi.com/products';

  /* ===============================
     RAW DATA
  =============================== */
  private readonly _products = signal<Product[]>([]);
  readonly products = this._products.asReadonly();

  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

  /* ===============================
     FILTERS
  =============================== */
  readonly search = signal('');
  readonly sort = signal<'price-asc' | 'price-desc' | 'rate'>('price-asc');

  /* ===============================
     PAGINATION
  =============================== */
  readonly page = signal(1);
  readonly pageSize = signal(8);

  /* ===============================
     FETCH
  =============================== */
  loadProducts() {
    this.loading.set(true);

    this.http.get<Product[]>(this.API).subscribe({
      next: (res) => {
        this._products.set(res);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('فشل تحميل المنتجات');
        this.loading.set(false);
      },
    });
  }

  /* ===============================
     COMPUTED: SEARCH
  =============================== */
  readonly filteredProducts = computed(() => {
    const term = this.search().toLowerCase();
    if (!term) return this.products();

    return this.products().filter((p) => p.title.toLowerCase().includes(term));
  });

  /* ===============================
     COMPUTED: SORT
  =============================== */
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

  /* ===============================
     COMPUTED: PAGINATION
  =============================== */
  readonly paginatedProducts = computed(() => {
    const start = (this.page() - 1) * this.pageSize();
    const end = start + this.pageSize();
    return this.sortedProducts().slice(0, end); // ⚡ Infinite scroll ready
  });

  /* ===============================
     ACTIONS
  =============================== */
  setSearch(value: string) {
    this.page.set(1);
    this.search.set(value);
  }

  setSort(value: 'price-asc' | 'price-desc' | 'rate') {
    this.page.set(1);
    this.sort.set(value);
  }

  loadMore() {
    this.page.update((p) => p + 1);
  }

  getProductById(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.API}/${id}`);
  }
}
