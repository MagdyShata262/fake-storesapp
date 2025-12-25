import { isPlatformBrowser } from '@angular/common';
import { HttpEventType, HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';
import { LoadingServices } from '../core/loading-services/loading-services';
import { tap, finalize } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const platformId = inject(PLATFORM_ID);
  const loadingService = inject(LoadingServices);

  // ✅ عرض مؤشر التحميل (إذا كنا في المتصفح)
  if (isPlatformBrowser(platformId)) {
    loadingService.show();
  }

  // ✅ إضافة Token فقط إذا كنا في المتصفح
  let authReq = req;
  if (isPlatformBrowser(platformId)) {
    const token = localStorage.getItem('isAuthenticated'); // أو 'token' إذا كنت تستخدمه
    if (token) {
      authReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`),
      });
    }
  }

  // ✅ إخفاء مؤشر التحميل بعد انتهاء الطلب
  return next(authReq).pipe(
    tap((event) => {
      if (event.type === HttpEventType.Response) {
        // يمكنك إضافة تسجيل النجاح هنا
      }
    }),
    finalize(() => {
      if (isPlatformBrowser(platformId)) {
        loadingService.hide();
      }
    })
  );
};
