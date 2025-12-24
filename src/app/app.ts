import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './core/header/header/header';
import { Footer } from './core/footer/footer/footer';
import { AuthServices } from './features/login/auth-services/auth-services';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  private authService = inject(AuthServices);

  constructor() {
    // ✅ يتم تنفيذه فقط في المتصفح
    this.authService.initializeAuth();
  }

  protected readonly title = signal('fake-storesapp');
}
