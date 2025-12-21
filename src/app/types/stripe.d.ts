// src/app/types/stripe.d.ts
import '@stripe/stripe-js';

declare module '@stripe/stripe-js' {
  interface Stripe {
    redirectToCheckout(options: { sessionId: string }): Promise<{ error?: { message: string } }>;
  }
}
