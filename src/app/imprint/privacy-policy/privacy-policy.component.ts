import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';
import { HeaderComponent } from '../../shared/header/header.component';
import { LanguageService } from '../../services/language.service';

@Component({
    selector: 'app-privacy-policy',
    standalone: true,
    imports: [CommonModule, HeaderComponent],
    templateUrl: './privacy-policy.component.html',
    styleUrl: './privacy-policy.component.scss'
})
export class PrivacyPolicyComponent implements OnInit, OnDestroy {
    private bodyClass = 'imprint-bg-full';

    constructor(
        @Inject(DOCUMENT) private document: Document,
        private router: Router,
        public languageService: LanguageService
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
}
