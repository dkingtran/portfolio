
import { Component, Inject, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
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
    // Header should behave like an overlay (fixed, full-width gradient)
    // on pages that have the above-the-fold layout or the imprint background.
    const aotOrImprint = this.document.querySelector('.aot, .imprint-bg-full');
    this.isOverlay = !!aotOrImprint;
  }

  toggleLanguage() {
    this.languageService.toggleLanguage();
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
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
    // If viewport expands beyond mobile breakpoint ensure body scroll is enabled
    if (window.innerWidth > 1000) {
      // Sync state: on larger viewports the mobile menu should be considered closed
      this.isMenuOpen = false;
    }
  }
}
