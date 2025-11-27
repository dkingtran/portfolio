import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import AOS from 'aos';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './shared/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,
    RouterOutlet,
    FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'portfolio';

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      try {
        const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (!prefersReduced) {
          // once: false -> allow animations to replay when element re-enters
          // mirror: true -> animate elements out when scrolling past them
          AOS.init({ once: false, mirror: true, duration: 600, anchorPlacement: 'top-bottom' });
        }
      } catch (e) {
        // ignore AOS init errors in dev/SSR environments
      }
    }
  }
}
