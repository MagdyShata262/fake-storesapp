import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import 'bootstrap';
import { ThemeService } from './app/core/theme-service/theme-service';

bootstrapApplication(App, appConfig)
  .then((app) => {
    // استدعاء الخدمة وتهيئة الثيمات من localStorage
    const themeService = app.injector.get(ThemeService);
    themeService.init();
  })
  .catch((err) => console.error(err));
