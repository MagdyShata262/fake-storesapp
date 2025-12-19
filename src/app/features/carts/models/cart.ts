import { Product } from '../../products/models/product-interface';

export interface Cart {
  id: number;
  userId: number;
  date: string;
  products: {
    productId: number;
    quantity: number;
  }[];
}
export interface CartProductView {
  productId: number;
  quantity: number;
  product: Product;
}
