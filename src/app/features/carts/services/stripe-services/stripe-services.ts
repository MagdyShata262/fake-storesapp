import { Injectable, inject } from '@angular/core';
import { loadStripe } from '@stripe/stripe-js/pure'; // ← مهم جدًا: /pure
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

interface CreateCheckoutSessionResponse {
  id: string;
}

interface CartItem {
  productId: number;
  quantity: number;
}

@Injectable({
  providedIn: 'root',
})
export class StripeService {
  private httpClient = inject(HttpClient);
  private stripePromise = loadStripe('pk_test_your_publishable_key_here');

  createCheckoutSession(cartItems: CartItem[]) {
    return this.httpClient
      .post<CreateCheckoutSessionResponse>('/api/create-checkout-session', { cartItems })
      .pipe(
        map((res) => res.id),
        catchError((err) => {
          console.error('Payment error:', err);
          return throwError(() => new Error('فشل في إنشاء جلسة الدفع'));
        })
      );
  }

  async redirectToCheckout(sessionId: string): Promise<void> {
    const stripe = await this.stripePromise;
    if (!stripe) {
      throw new Error('فشل تحميل Stripe');
    }

    // ✅ هذا يعمل في v8+
    const { error } = await stripe.redirectToCheckout({ sessionId });
    if (error) {
      throw error;
    }
  }

  async processPayment(cartItems: CartItem[]): Promise<void> {
    const sessionId = await firstValueFrom(this.createCheckoutSession(cartItems));
    await this.redirectToCheckout(sessionId);
  }
}
