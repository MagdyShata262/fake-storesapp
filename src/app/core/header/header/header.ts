import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { ThemeService } from '../../theme-service/theme-service';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  // ========================
  // Inject ThemeService
  // ========================
  themeService = inject(ThemeService);

  setTheme(theme: 'light' | 'dark') {
    this.themeService.setTheme(theme);
  }
  toggleTheme() {
    const newTheme = this.themeService.theme() === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
  }
}
