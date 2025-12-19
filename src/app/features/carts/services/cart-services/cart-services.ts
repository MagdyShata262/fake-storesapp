import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { Cart, CartProductView } from '../../models/cart';
import { Product } from '../../../products/models/product-interface';
import { forkJoin, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartServices {
  private http = inject(HttpClient);

  private readonly API_URL = 'https://fakestoreapi.com/carts';
  private readonly PRODUCT_API = 'https://fakestoreapi.com/products';

  /* ===============================
     STATE
  =============================== */
  private readonly _carts = signal<Cart[]>([]);
  readonly carts = this._carts.asReadonly();

  private readonly _selectedCart = signal<Cart | null>(null);
  readonly selectedCart = this._selectedCart.asReadonly();

  private readonly _cartProducts = signal<CartProductView[]>([]);
  readonly cartProducts = this._cartProducts.asReadonly();

  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

  /* ===============================
     FETCH ALL CARTS
  =============================== */
  loadCarts() {
    this.loading.set(true);
    this.error.set(null);

    this.http.get<Cart[]>(this.API_URL).subscribe({
      next: (res) => {
        this._carts.set(res);
        this.loading.set(false);
        console.log('🛒 All Carts:', res);
      },
      error: () => {
        this.error.set('فشل تحميل سلال المشتريات');
        this.loading.set(false);
      },
    });
  }

  /* ===============================
     FETCH CART DETAILS
  =============================== */
  loadCartDetails(cartId: number) {
    this.loading.set(true);
    this.error.set(null);

    this.http.get<Cart>(`${this.API_URL}/${cartId}`).subscribe({
      next: (cart) => {
        this._selectedCart.set(cart);
        this.loadCartProducts(cart.products);
      },
      error: () => {
        this.error.set('فشل تحميل تفاصيل السلة');
        this.loading.set(false);
      },
    });
  }

  /* ===============================
     LOAD PRODUCTS OF CART
  =============================== */
  private loadCartProducts(items: { productId: number; quantity: number }[]) {
    const requests = items.map((item) =>
      this.http.get<Product>(`${this.PRODUCT_API}/${item.productId}`).pipe(
        map((product) => ({
          productId: item.productId,
          quantity: item.quantity,
          product,
        }))
      )
    );

    forkJoin(requests).subscribe({
      next: (products) => {
        this._cartProducts.set(products);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('فشل تحميل منتجات السلة');
        this.loading.set(false);
      },
    });
  }

  /* ===============================
     DERIVED DATA
  =============================== */
  readonly totalCarts = computed(() => this.carts().length);

  readonly totalCartPrice = computed(() =>
    this.cartProducts().reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  );

  /* ===============================
     RESET (OPTIONAL)
  =============================== */
  clearSelectedCart() {
    this._selectedCart.set(null);
    this._cartProducts.set([]);
  }
}
