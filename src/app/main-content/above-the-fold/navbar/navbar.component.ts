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
  isMenuOpen = false;

  toggleLanguage() {
    this.currentLang = this.currentLang === 'en' ? 'de' : 'en';
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
