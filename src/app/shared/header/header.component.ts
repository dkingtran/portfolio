
import { Component, Inject, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit, OnDestroy {
  currentLang: 'en' | 'de' = 'de';
  isMenuOpen = false;
  isOverlay = false;

  private routerSub: Subscription | null = null;

  constructor(private router: Router, @Inject(DOCUMENT) private document: Document) { }

  ngOnInit(): void {
    this.updateOverlayState();
    this.routerSub = this.router.events.subscribe((ev) => {
      if (ev instanceof NavigationEnd) {
        // small timeout to allow page components to render
        setTimeout(() => this.updateOverlayState(), 30);
      }
    });
  }

  ngOnDestroy(): void {
    this.routerSub?.unsubscribe();
  }

  private updateOverlayState() {
    const aot = this.document.querySelector('.aot');
    this.isOverlay = !!aot;
  }

  toggleLanguage() {
    this.currentLang = this.currentLang === 'en' ? 'de' : 'en';
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
}
