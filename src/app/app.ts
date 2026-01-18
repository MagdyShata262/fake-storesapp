import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './core/header/header/header';
import { Footer } from './core/footer/footer/footer';
import { AuthServices } from './features/login/auth-services/auth-services';

import { LanguaServices } from './core/langua-services/langua-services';
import { LoadingServices } from './core/loading-services/loading-services';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Header, Footer],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  private authService = inject(AuthServices);
  private languService = inject(LanguaServices);
  private loadingService = inject(LoadingServices);
  readonly isLoading = this.loadingService.loading;
  constructor() {
    // ✅ يتم تنفيذه فقط في المتصفح
    this.authService.initializeAuth();

    this.languService.init();
    // language = inject(LanguaServices);
  }

  protected readonly title = signal('fake-storesapp');
}
