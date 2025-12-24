import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthServices } from '../../auth-services/auth-services';
import { isPlatformBrowser } from '@angular/common';

export const authGuardGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthServices);

  const platformId = inject(PLATFORM_ID);
  const router = inject(Router);

  // ✅ إذا كنا في الخادم، نسمح بالتنقل مؤقتًا (لتحسين SEO)
  if (!isPlatformBrowser(platformId)) {
    return true;
  }

  // ✅ في المتصفح: تحقق من localStorage
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  if (!isAuthenticated) {
    router.navigate(['/login']);
    return false;
  }

  return true;
};
