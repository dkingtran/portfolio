import { Component } from '@angular/core';
import { LanguageService } from '../../services/language.service';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  constructor(public languageService: LanguageService, private router: Router) { }

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
}
