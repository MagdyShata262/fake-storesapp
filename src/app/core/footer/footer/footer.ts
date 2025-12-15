import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ThemeService } from '../../theme-service/theme-service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  readonly theme = inject(ThemeService);

  sections = [
    {
      title: 'Section 1',
      links: [
        { label: 'Home', url: '#' },
        { label: 'Features', url: '#' },
        { label: 'Pricing', url: '#' },
        { label: 'FAQs', url: '#' },
        { label: 'About', url: '#' },
      ],
    },
    {
      title: 'Section 2',
      links: [
        { label: 'Home', url: '#' },
        { label: 'Features', url: '#' },
        { label: 'Pricing', url: '#' },
        { label: 'FAQs', url: '#' },
        { label: 'About', url: '#' },
      ],
    },
    {
      title: 'Section 3',
      links: [
        { label: 'Home', url: '#' },
        { label: 'Features', url: '#' },
        { label: 'Pricing', url: '#' },
        { label: 'FAQs', url: '#' },
        { label: 'About', url: '#' },
      ],
    },
  ];

  socials = [
    { label: 'Instagram', url: '#', icon: '#instagram' },
    { label: 'Facebook', url: '#', icon: '#facebook' },
  ];
}
