import { Component } from '@angular/core';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-about-me',
  standalone: true,
  imports: [],
  templateUrl: './about-me.component.html',
  styleUrl: './about-me.component.scss'
})
export class AboutMeComponent {
  hovered: boolean = false;

  constructor(public languageService: LanguageService) { }

  onMouseEnter() {
    this.hovered = true;
  }
}
