import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { Cart, CartProductView } from '../../models/cart';
import { Product } from '../../../products/models/product-interface';
import { forkJoin, map, of, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
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

  readonly loadingList = signal(false);
  readonly loadingDetails = signal(false);
  readonly error = signal<string | null>(null);

  /* ===============================
     CACHE
  =============================== */
  private cartsLoaded = false;
  private readonly productCache = new Map<number, Product>();

  /* ===============================
     FETCH ALL CARTS (WITH CACHE)
  =============================== */
  loadCarts(force = false) {
    if (this.cartsLoaded && !force) {
      console.log('📦 Carts from cache');
      return;
    }

    this.loadingList.set(true);
    this.error.set(null);

    this.http.get<Cart[]>(this.API_URL).subscribe({
      next: (res) => {
        this._carts.set(res);
        this.cartsLoaded = true;
        this.loadingList.set(false);
      },
      error: () => {
        this.error.set('فشل تحميل السلال');
        this.loadingList.set(false);
      },
    });
  }

  /* ===============================
     CART DETAILS
  =============================== */
  loadCartDetails(cartId: number) {
    this.loadingDetails.set(true);
    this.error.set(null);

    this.http.get<Cart>(`${this.API_URL}/${cartId}`).subscribe({
      next: (cart) => {
        this._selectedCart.set(cart);
        this.loadCartProducts(cart.products);
      },
      error: () => {
        this.error.set('فشل تحميل تفاصيل السلة');
        this.loadingDetails.set(false);
      },
    });
  }

  /* ===============================
     CART PRODUCTS (WITH CACHE)
  =============================== */
  private loadCartProducts(items: { productId: number; quantity: number }[]) {
    const requests = items.map((item) => {
      if (this.productCache.has(item.productId)) {
        return of({
          productId: item.productId,
          quantity: item.quantity,
          product: this.productCache.get(item.productId)!,
        });
      }

      return this.http.get<Product>(`${this.PRODUCT_API}/${item.productId}`).pipe(
        tap((p) => this.productCache.set(item.productId, p)),
        map((product) => ({
          productId: item.productId,
          quantity: item.quantity,
          product,
        }))
      );
    });

    forkJoin(requests).subscribe({
      next: (products) => {
        this._cartProducts.set(products);
        this.loadingDetails.set(false);
      },
      error: () => {
        this.error.set('فشل تحميل منتجات السلة');
        this.loadingDetails.set(false);
      },
    });
  }

  /* ===============================
     CREATE
  =============================== */
  addCart(cart: Omit<Cart, 'id'>) {
    return this.http.post<Cart>(this.API_URL, cart).pipe(
      tap((res) => {
        this._carts.update((carts) => [...carts, res]);
      })
    );
  }

  /* ===============================
     DELETE
  =============================== */
  deleteCart(cartId: number) {
    return this.http.delete(`${this.API_URL}/${cartId}`).pipe(
      tap(() => {
        this._carts.update((carts) => carts.filter((c) => c.id !== cartId));
      })
    );
  }

  /* ===============================
     DERIVED
  =============================== */
  readonly totalCarts = computed(() => this.carts().length);

  readonly totalCartPrice = computed(() =>
    this.cartProducts().reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  );

  /* ===============================
     RESET
  =============================== */
  clearSelectedCart() {
    this._selectedCart.set(null);
    this._cartProducts.set([]);
  }
}
