import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-skillset',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skillset.component.html',
  styleUrl: './skillset.component.scss'
})
export class SkillsetComponent {
  constructor(public languageService: LanguageService) { }

  skills = [
    { icon: 'assets/img/icons/skill-set/img_1.png', text: 'HTML' },
    { icon: 'assets/img/icons/skill-set/img_2.png', text: 'CSS' },
    { icon: 'assets/img/icons/skill-set/img_3.png', text: 'JavaScript' },
    { icon: 'assets/img/icons/skill-set/img_4.png', text: 'Material Design' },
    { icon: 'assets/img/icons/skill-set/img_5.png', text: 'TypeScript' },
    { icon: 'assets/img/icons/skill-set/img_6.png', text: 'Angular' },
    { icon: 'assets/img/icons/skill-set/img_7.png', text: 'Firebase' },
    { icon: 'assets/img/icons/skill-set/img_8.png', text: 'Git' },
    { icon: 'assets/img/icons/skill-set/img_9.png', text: 'REST-API' },
    { icon: 'assets/img/icons/skill-set/img_10.png', text: 'SCRUM' },
    { icon: 'assets/img/icons/skill-set/img_11.png', text: 'Growth Mindset' }
  ];

  scrollTo(section: string) {
    document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
  }
}
