import { HttpClient, httpResource } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ProductInterface } from '../../models/product-interface';

@Injectable({
  providedIn: 'root',
})
export class ProductServices {
  http = inject(HttpClient);

  readonly products = httpResource<ProductInterface[]>(() => ({
    url: 'https://fakestoreapi.com/products',
    method: 'GET',
  }));

  getProductById(id: number) {
    return this.http.get<any>(`https://fakestoreapi.com/products/${id}`);
  }
}
