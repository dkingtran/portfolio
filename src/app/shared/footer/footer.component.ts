import { Component } from '@angular/core';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  constructor(public languageService: LanguageService) { }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
