import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { HeaderComponent } from '../../shared/header/header.component';
import { LanguageService } from '../../services/language.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-legal-notice',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  templateUrl: './legal-notice.component.html',
  styleUrls: ['./legal-notice.component.scss']
})
export class LegalNoticeComponent implements OnInit, OnDestroy {
  private bodyClass = 'imprint-bg-full';
  public translations: { [key: string]: SafeHtml } = {};
  private langSub: Subscription | null = null;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private router: Router,
    public languageService: LanguageService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.document.body.classList.add(this.bodyClass);
    this.buildTranslations();
    this.langSub = this.languageService.currentLang$.subscribe(() => this.buildTranslations());
  }

  ngOnDestroy(): void {
    this.document.body.classList.remove(this.bodyClass);
    this.langSub?.unsubscribe();
  }

  goHome(): void {
    this.router.navigate(['/']);
  }

  safeTranslate(key: string): SafeHtml {
    const raw = this.languageService.translate(key);
    return this.sanitizer.bypassSecurityTrustHtml(raw);
  }

  private buildTranslations() {
    const keys = [
      'legal.title', 'legal.subtitle',
      'legal.exploring.title', 'legal.exploring.text',
      'legal.acceptance.title', 'legal.acceptance.text',
      'legal.scope.title', 'legal.scope.text',
      'legal.proprietary.title', 'legal.proprietary.text',
      'legal.use.title', 'legal.use.text',
      'legal.disclaimer.title', 'legal.disclaimer.text',
      'legal.indemnity.title', 'legal.indemnity.text',
      'legal.contact.title', 'legal.contact.text'
    ];
    keys.forEach(k => {
      const raw = this.languageService.translate(k);
      this.translations[k] = this.sanitizer.bypassSecurityTrustHtml(raw);
    });
  }
}
