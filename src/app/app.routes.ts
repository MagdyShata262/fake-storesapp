import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  {
    path: 'products',
    loadComponent: () =>
      import('./features/products/components/product-list/product-list').then((c) => c.ProductList),
  },
  // 📄 Product Detail
  {
    path: 'products/:id',
    loadComponent: () =>
      import('./features/products/components/product-detali/product-detali').then(
        (c) => c.ProductDetali
      ),
  },

  {
    path: 'carts',
    loadComponent: () =>
      import('./features/carts/components/cart-list/cart-list').then((m) => m.CartList),
  },

  {
    path: 'carts/:id',
    loadComponent: () =>
      import('./features/carts/components/cart-detali/cart-detali').then((m) => m.CartDetali),
  },

  {
    path: 'create',
    loadComponent: () =>
      import('./features/carts/components/cart-create/cart-create').then((m) => m.CartCreate),
  },

  {
    path: 'edit:id',
    loadComponent: () =>
      import('./features/carts/components/cart-edit/cart-edit').then((m) => m.CartEdit),
  },
];
