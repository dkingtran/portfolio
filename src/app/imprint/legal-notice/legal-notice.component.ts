import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';
import { HeaderComponent } from '../../shared/header/header.component';

@Component({
  selector: 'app-legal-notice',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  templateUrl: './legal-notice.component.html',
  styleUrl: './legal-notice.component.scss'
})
export class LegalNoticeComponent implements OnInit, OnDestroy {
  private bodyClass = 'imprint-bg-full';

  constructor(@Inject(DOCUMENT) private document: Document, private router: Router) { }

  ngOnInit(): void {
    this.document.body.classList.add(this.bodyClass);
  }

  ngOnDestroy(): void {
    this.document.body.classList.remove(this.bodyClass);
  }

  goHome(): void {
    this.router.navigate(['/']);
  }
}
