import { inject, Injectable, signal, computed, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

export type AppLang = 'en' | 'ar';

@Injectable({ providedIn: 'root' })
export class LanguaServices {
  private translate = inject(TranslateService);
  private platformId = inject(PLATFORM_ID);

  private readonly STORAGE_KEY = 'lang';

  // Signal للحالة الحالية للغة — يجعلها reactive
  private _currentLangSignal = signal<AppLang>('en');
  public currentLang = this._currentLangSignal.asReadonly();

  // اختياري: computed signal لمعرفة إذا كانت اللغة عربية
  public isArabic = computed(() => this.currentLang() === 'ar');

  init() {
    const lang = this.getInitialLang();
    this.apply(lang);
  }

  toggle() {
    const nextLang: AppLang = this.currentLang() === 'en' ? 'ar' : 'en';
    this.apply(nextLang);
  }

  private apply(lang: AppLang) {
    this._currentLangSignal.set(lang);
    this.translate.use(lang);

    if (isPlatformBrowser(this.platformId)) {
      // تحديث سمة lang فقط — بدون تغيير dir
      document.documentElement.lang = lang;
      localStorage.setItem(this.STORAGE_KEY, lang);
    }
  }

  private getInitialLang(): AppLang {
    if (isPlatformBrowser(this.platformId)) {
      const saved = localStorage.getItem(this.STORAGE_KEY) as AppLang | null;
      if (saved === 'en' || saved === 'ar') {
        return saved;
      }
    }

    const browserLang = this.translate.getBrowserLang();
    return browserLang === 'ar' ? 'ar' : 'en';
  }
}
// LanguaServices
