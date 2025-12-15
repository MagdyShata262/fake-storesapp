import { effect, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  // ========================
  // STATE (Signals)
  // ========================
  // signals لتخزين الثيم و RTL
  theme = signal<'light' | 'dark' | 'brand'>('light');
  rtl = signal(false);

  constructor() {}

  // دالة لتحديث <html> عند تغير الإعدادات
  private updateHtml() {
    document.documentElement.setAttribute('data-bs-theme', this.theme());
    document.documentElement.dir = this.rtl() ? 'rtl' : 'ltr';
  }

  // دالة تغيير الثيم
  setTheme(value: 'light' | 'dark' | 'brand') {
    this.theme.set(value);
    localStorage.setItem('theme', value);
    this.updateHtml();
  }

  // دالة تغيير RTL
  setRtl(value: boolean) {
    this.rtl.set(value);
    localStorage.setItem('rtl', value ? '1' : '0');
    this.updateHtml();
  }

  // ✅ دالة init لتطبيق الإعدادات من localStorage عند تشغيل التطبيق
  init() {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | 'brand';
    const savedRtl = localStorage.getItem('rtl');

    if (savedTheme) this.theme.set(savedTheme);
    if (savedRtl) this.rtl.set(savedRtl === '1');

    this.updateHtml();
  }
}
