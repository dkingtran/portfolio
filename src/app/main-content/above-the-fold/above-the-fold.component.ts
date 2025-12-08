import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../shared/header/header.component';
import { LanguageService } from '../../services/language.service';
import AOS from 'aos';

@Component({
  selector: 'app-above-the-fold',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  templateUrl: './above-the-fold.component.html',
  styleUrl: './above-the-fold.component.scss'
})
export class AboveTheFoldComponent {
  constructor(public languageService: LanguageService) { }

  scrollTo(section: string) {
    document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
    // Refresh AOS after scroll so animations trigger on mobile
    setTimeout(() => {
      if (typeof AOS !== 'undefined' && AOS.refresh) {
        AOS.refresh();
      }
    }, 400);
  }
}
