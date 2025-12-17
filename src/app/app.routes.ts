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
];
