import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../services/language.service';
import AOS from 'aos';

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
    const el = document.getElementById(section);
    if (!el) return;
    if (!el.hasAttribute('tabindex')) el.setAttribute('tabindex', '-1');
    try { (el as HTMLElement).focus({ preventScroll: true }); } catch { }
    const headerVar = getComputedStyle(document.documentElement).getPropertyValue('--header-height') || '';
    const m = headerVar.match(/(\d+)/);
    const offset = m ? parseInt(m[1], 10) : 98;
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
    setTimeout(() => typeof AOS !== 'undefined' && AOS.refresh && AOS.refresh(), 400);
  }
}
