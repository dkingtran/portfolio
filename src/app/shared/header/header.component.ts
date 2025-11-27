
import { Component, Inject, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  currentLang: 'en' | 'de' = 'en';
  isMenuOpen = false;
  isOverlay = false;

  private routerSub: Subscription | null = null;
  private langSub: Subscription | null = null;

  constructor(
    private router: Router,
    @Inject(DOCUMENT) private document: Document,
    public languageService: LanguageService
  ) { }

  ngOnInit(): void {
    this.currentLang = this.languageService.currentLang;
    this.langSub = this.languageService.currentLang$.subscribe(lang => {
      this.currentLang = lang;
    });
    this.updateOverlayState();
    this.routerSub = this.router.events.subscribe((ev) => {
      if (ev instanceof NavigationEnd) {
        setTimeout(() => this.updateOverlayState(), 30);
      }
    });
  }

  ngOnDestroy(): void {
    this.routerSub?.unsubscribe();
    this.langSub?.unsubscribe();
  }

  private updateOverlayState() {
    const aotOrImprint = this.document.querySelector('.aot, .imprint-bg-full');
    this.isOverlay = !!aotOrImprint;
  }

  toggleLanguage() {
    this.languageService.toggleLanguage();
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  navigateToFragment(event: Event, fragment: string) {
    event.preventDefault();
    this.router.navigate(['/'], { fragment }).then(() => setTimeout(() => {
      const el = this.document.getElementById(fragment);
      if (!el) return;
      if (!el.hasAttribute('tabindex')) el.setAttribute('tabindex', '-1');
      try { (el as HTMLElement).focus({ preventScroll: true }); } catch { }
      const cs = getComputedStyle(this.document.documentElement);
      const matches = cs.getPropertyValue('--header-height').match(/(\d+)/);
      const offset = matches ? parseInt(matches[1], 10) : 98;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }, 20));
  }

  onLogoClick(event: Event) {
    const current = this.router.url ? this.router.url.split('?')[0].split('#')[0] : '';
    if (current === '/' || current === '') {
      event.preventDefault();
      this.scrollToTop();
    }
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    if (window.innerWidth <= 1000) {
      const target = event.target as HTMLElement;
      if (!target.closest('.mobile-dropdown') && !target.closest('.menu-icon')) {
        this.isMenuOpen = false;
      }
    }
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize(_event: Event) {
    if (window.innerWidth > 1000) {
      this.isMenuOpen = false;
    }
  }
}
