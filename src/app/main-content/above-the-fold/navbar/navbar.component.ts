import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  currentLang: 'en' | 'de' = 'de'; // Default Deutsch

  toggleLanguage() {
    this.currentLang = this.currentLang === 'en' ? 'de' : 'en';
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
