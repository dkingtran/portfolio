import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { HeaderComponent } from '../../shared/header/header.component';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-legal-notice',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  templateUrl: './legal-notice.component.html',
  styleUrl: './legal-notice.component.scss'
})
export class LegalNoticeComponent implements OnInit, OnDestroy {
  private bodyClass = 'imprint-bg-full';

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private router: Router,
    public languageService: LanguageService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.document.body.classList.add(this.bodyClass);
  }

  ngOnDestroy(): void {
    this.document.body.classList.remove(this.bodyClass);
  }

  goHome(): void {
    this.router.navigate(['/']);
  }

  safeTranslate(key: string): SafeHtml {
    const raw = this.languageService.translate(key);
    return this.sanitizer.bypassSecurityTrustHtml(raw);
  }
}
