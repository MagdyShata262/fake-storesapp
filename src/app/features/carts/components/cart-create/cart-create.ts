import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CartServices } from '../../services/cart-services/cart-services';

@Component({
  selector: 'app-cart-create',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './cart-create.html',
  styleUrl: './cart-create.scss',
})
export class CartCreate {
  private cartService = inject(CartServices);
  form = new FormGroup({
    userId: new FormControl(1, { nonNullable: true, validators: [Validators.required] }),
    date: new FormControl(new Date().toISOString().substring(0, 10), {
      nonNullable: true,
      validators: [Validators.required],
    }),
    products: new FormArray([this.createProduct()]),
  });

  /* ===============================
     GETTERS
  =============================== */
  get products() {
    return this.form.controls.products;
  }

  /* ===============================
     HELPERS
  =============================== */
  createProduct() {
    return new FormGroup({
      productId: new FormControl(1, { nonNullable: true, validators: [Validators.required] }),
      quantity: new FormControl(1, {
        nonNullable: true,
        validators: [Validators.required, Validators.min(1)],
      }),
    });
  }

  addProduct() {
    this.products.push(this.createProduct());
  }

  removeProduct(index: number) {
    this.products.removeAt(index);
  }

  /* ===============================
     SUBMIT
  =============================== */
  submit() {
    if (this.form.invalid) return;

    this.cartService.addCart(this.form.getRawValue());
  }
}
