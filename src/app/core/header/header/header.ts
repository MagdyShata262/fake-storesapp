import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { ThemeService } from '../../theme-service/theme-service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  // ========================
  // Inject ThemeService
  // ========================
  private themeService = inject(ThemeService);

  // signals محلية لربط template مباشرة
  theme = this.themeService.theme;
  rtl = this.themeService.rtl;

  // دوال لتبديل الثيم والـ RTL
  setTheme(value: 'light' | 'dark' | 'brand') {
    this.themeService.setTheme(value);
  }

  toggleRtl() {
    this.themeService.setRtl(!this.rtl());
  }
}
