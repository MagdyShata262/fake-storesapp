import { effect, Injectable, signal, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  // إشارات لتخزين الثيم واتجاه النص
  theme = signal<'light' | 'dark'>('light');
  rtl = signal(false);

  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  constructor() {
    // تهيئة الإعدادات (فقط في المتصفح)
    if (this.isBrowser) {
      this.initializeTheme();
    }

    // مراقبة التغييرات وتطبيقها (فقط في المتصفح)
    effect(() => {
      if (this.isBrowser) {
        this.applyTheme();
      }
    });
  }

  /**
   * تهيئة الإعدادات من localStorage أو تفضيلات النظام
   */
  initializeTheme(): void {
    // تحميل الثيم
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light' || savedTheme === 'dark') {
      this.theme.set(savedTheme);
    } else {
      // استخدام تفضيلات النظام
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.theme.set(prefersDark ? 'dark' : 'light');
    }

    // تحميل اتجاه النص
    const savedRtl = localStorage.getItem('rtl');
    this.rtl.set(savedRtl === '1');
  }

  /**
   * تطبيق الإعدادات على المستند
   */
  applyTheme(): void {
    // تطبيق الثيم
    document.documentElement.setAttribute('data-bs-theme', this.theme());

    // تطبيق اتجاه النص
    document.documentElement.dir = this.rtl() ? 'rtl' : 'ltr';

    // إضافة/إزالة كلاس للوضع الداكن
    if (this.theme() === 'dark') {
      document.documentElement.classList.add('dark-mode');
    } else {
      document.documentElement.classList.remove('dark-mode');
    }
  }

  /**
   * تغيير الثيم
   */
  setTheme(theme: 'light' | 'dark'): void {
    if (!this.isBrowser) return;
    this.theme.set(theme);
    localStorage.setItem('theme', theme);
  }

  /**
   * تغيير اتجاه النص
   */
  setRtl(isRtl: boolean): void {
    if (!this.isBrowser) return;
    this.rtl.set(isRtl);
    localStorage.setItem('rtl', isRtl ? '1' : '0');
  }

  /**
   * تبديل الثيم
   */
  toggleTheme(): void {
    if (!this.isBrowser) return;
    const newTheme = this.theme() === 'light' ? 'dark' : 'light';
    this.theme.set(newTheme);
    localStorage.setItem('theme', newTheme);
  }

  /**
   * تبديل اتجاه النص
   */
  toggleRtl(): void {
    if (!this.isBrowser) return;
    const newRtl = !this.rtl();
    this.rtl.set(newRtl);
    localStorage.setItem('rtl', newRtl ? '1' : '0');
  }

  /**
   * الحصول على الثيم الحالي
   */
  get currentTheme(): 'light' | 'dark' {
    return this.theme();
  }

  /**
   * الحصول على اتجاه النص الحالي
   */
  get isRtl(): boolean {
    return this.rtl();
  }
}
