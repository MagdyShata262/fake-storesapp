import { Injectable, signal, computed, effect, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

export type ThemeMode = 'light' | 'dark';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  // =====================
  // STATE
  // =====================
  readonly theme = signal<ThemeMode>('light');
  readonly rtl = signal(false);

  // =====================
  // DERIVED STATE
  // =====================
  readonly isDark = computed(() => this.theme() === 'dark');
  readonly dir = computed<'rtl' | 'ltr'>(() => (this.rtl() ? 'rtl' : 'ltr'));

  constructor() {
    if (this.isBrowser) {
      this.loadFromStorage();
      this.syncWithDOM();
    }
  }

  // =====================
  // INITIALIZATION
  // =====================
  private loadFromStorage(): void {
    const savedTheme = localStorage.getItem('theme') as ThemeMode | null;
    const savedRtl = localStorage.getItem('rtl');

    if (savedTheme === 'light' || savedTheme === 'dark') {
      this.theme.set(savedTheme);
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.theme.set(prefersDark ? 'dark' : 'light');
    }

    this.rtl.set(savedRtl === '1');
  }

  // =====================
  // DOM EFFECT
  // =====================
  private syncWithDOM(): void {
    effect(() => {
      const root = document.documentElement;

      root.setAttribute('data-bs-theme', this.theme());
      root.dir = this.dir();

      root.classList.toggle('dark-mode', this.isDark());
    });
  }

  // =====================
  // ACTIONS
  // =====================
  setTheme(theme: ThemeMode): void {
    if (!this.isBrowser) return;
    this.theme.set(theme);
    localStorage.setItem('theme', theme);
  }

  toggleTheme(): void {
    this.setTheme(this.isDark() ? 'light' : 'dark');
  }

  setRtl(value: boolean): void {
    if (!this.isBrowser) return;
    this.rtl.set(value);
    localStorage.setItem('rtl', value ? '1' : '0');
  }

  toggleRtl(): void {
    this.setRtl(!this.rtl());
  }
}
