import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { Cart, CartProductView } from '../../models/cart';
import { Product } from '../../../products/models/product-interface';
import { forkJoin, map, of, tap } from 'rxjs';
import { ProductServices } from '../../../products/services/product-services/product-services';
export interface CartItem {
  productId: number;
  quantity: number;
  product: Product;
}
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

  deleteCart(cartId: number) {
    const prev = this._carts();

    this._carts.update((c) => c.filter((x) => x.id !== cartId));

    this.http.delete(`${this.API_URL}/${cartId}`).subscribe({
      error: () => this._carts.set(prev),
    });
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

  // src/app/features/carts/services/cart-services.ts

  /* ===============================
   ADD TO CART
=============================== */
  // addToCart(productId: number, quantity = 1) {
  //   const cartItem = { productId, quantity };

  //   // نستخدم API لإنشاء سلة جديدة أو إضافة منتج
  //   // في FakeStoreAPI، يمكنك استخدام:
  //   // POST /carts/{userId} — لكن لا يوجد مستخدم ثابت، لذا سنستخدم POST /carts فقط
  //   return this.http
  //     .post<Cart>(this.API_URL, {
  //       userId: 1, // ← يمكن تغييره لاحقًا
  //       date: new Date().toISOString(),
  //       products: [cartItem],
  //     })
  //     .pipe(
  //       tap((newCart) => {
  //         this._carts.update((carts) => [...carts, newCart]);
  //       })
  //     );
  // }
  // 🛒 السلة المحلية (في الذاكرة)
  // 🛒 السلة المحلية (في الذاكرة)
  // 🛒 السلة المحلية (في الذاكرة)

  private productService = inject(ProductServices);

  // 🛒 السلة المحلية (في الذاكرة)
  private _cartItems = signal<CartItem[]>([]);
  readonly cartItems = this._cartItems.asReadonly();

  // 🧮 الإجمالي
  readonly total = computed(() =>
    this.cartItems().reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  );

  // 📦 عدد العناصر الكلي
  readonly totalItems = computed(() =>
    this.cartItems().reduce((sum, item) => sum + item.quantity, 0)
  );

  // ➕ إضافة منتج إلى السلة
  addToCart(productId: number, quantity: number = 1) {
    const product = this.productService.products().find((p) => p.id === productId);
    if (!product) return;

    this._cartItems.update((items) => {
      const existingItem = items.find((item) => item.productId === productId);
      if (existingItem) {
        // زيادة الكمية
        return items.map((item) =>
          item.productId === productId ? { ...item, quantity: item.quantity + quantity } : item
        );
      } else {
        // إضافة جديد
        return [...items, { productId, quantity, product }];
      }
    });
  }

  // ➖ تقليل الكمية
  decreaseQuantity(productId: number) {
    this._cartItems.update(
      (items) =>
        items
          .map((item) =>
            item.productId === productId && item.quantity > 1
              ? { ...item, quantity: item.quantity - 1 }
              : item
          )
          .filter((item) => item.quantity > 0) // حذف إذا أصبحت 0
    );
  }

  // 🗑️ حذف منتج
  removeItem(productId: number) {
    this._cartItems.update((items) => items.filter((item) => item.productId !== productId));
  }

  // 🧹 تفريغ السلة
  clearCart() {
    this._cartItems.set([]);
  }
}
