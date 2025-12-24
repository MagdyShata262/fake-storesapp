import { Routes } from '@angular/router';
import { authGuardGuard } from './features/login/guards/auth-guard/auth-guard-guard';

export const routes: Routes = [
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  {
    path: 'products',
    canActivate: [authGuardGuard],
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
    path: 'cart',
    canActivate: [authGuardGuard],
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
    path: 'checkout',
    loadComponent: () =>
      import('./features/carts/components/checkout/checkout').then((c) => c.Checkout),
  },

  {
    path: 'users',
    loadComponent: () => import('./features/users/users-list/users-list').then((c) => c.UsersList),
  },

  // 🔓 Public Routes
  {
    path: 'login',
    loadComponent: () => import('./features/login/login/login').then((c) => c.Login),
  },
  {
    path: 'logout',
    loadComponent: () => import('./features/login/logout/logout').then((c) => c.Logout),
  },

  {
    path: 'users/:id',
    loadComponent: () =>
      import('./features/users/users-detals/users-detals').then((c) => c.UsersDetals),
  },
];
