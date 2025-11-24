import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectModalComponent } from './project-modal/project-modal.component';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-featured-projects',
  standalone: true,
  imports: [CommonModule, ProjectModalComponent],
  templateUrl: './featured-projects.component.html',
  styleUrl: './featured-projects.component.scss'
})
export class FeaturedProjectsComponent {
  constructor(public languageService: LanguageService) { }

  hoveredImage: string | null = null;
  hoveredBackground: string | null = null;
  displayedImage: string | null = null;
  displayedBackground: string | null = null;
  hoveredOffset: number = 0;
  displayedOffset: number = 0;
  private _clearTimer: any = null;

  projects = [
    {
      id: 'proj-1',
      title: 'Join',
      tech: ['HTML', 'CSS', 'JavaScript', 'Firebase'],
      image: '/assets/img/icons/featured-projects/project-images/01_join_img.png',
      background: '/assets/img/icons/featured-projects/base/01_capa_1.png',
      descriptionKey: 'projects.proj1.description',
      github: 'https://github.com/dkingtran/Join',
      live: 'https://yourdomain.com/join',
      techIcons: [
        { src: '/assets/img/icons/featured-projects/modal/html.png', label: 'HTML' },
        { src: '/assets/img/icons/featured-projects/modal/css.png', label: 'CSS' },
        { src: '/assets/img/icons/featured-projects/modal/javascript.png', label: 'JavaScript' },
        { src: '/assets/img/icons/featured-projects/modal/firebase.png', label: 'Firebase' }
      ]
    },
    {
      id: 'proj-2',
      title: 'El Pollo Loco',
      tech: ['HTML', 'CSS', 'JavaScript'],
      image: '/assets/img/icons/featured-projects/project-images/02_el_pollo_loco_img.jpg',
      background: '/assets/img/icons/featured-projects/base/01_capa_1.png',
      descriptionKey: 'projects.proj2.description',
      github: 'https://github.com/dkingtran/EL-Pollo-Loco',
      live: 'https://yourdomain.com/el-pollo-loco',
      techIcons: [
        { src: '/assets/img/icons/featured-projects/modal/html.png', label: 'HTML' },
        { src: '/assets/img/icons/featured-projects/modal/css.png', label: 'CSS' },
        { src: '/assets/img/icons/featured-projects/modal/javascript.png', label: 'JavaScript' }
      ]
    },
    {
      id: 'proj-3',
      title: 'Pokédex',
      tech: ['HTML', 'CSS', 'JavaScript', 'REST-API'],
      image: '/assets/img/icons/featured-projects/project-images/03_pokedex_img.png',
      background: '/assets/img/icons/featured-projects/base/01_capa_1.png',
      descriptionKey: 'projects.proj3.description',
      github: 'https://github.com/dkingtran/pokedex',
      live: 'https://yourdomain.com/pokedex',
      techIcons: [
        { src: '/assets/img/icons/featured-projects/modal/html.png', label: 'HTML' },
        { src: '/assets/img/icons/featured-projects/modal/css.png', label: 'CSS' },
        { src: '/assets/img/icons/featured-projects/modal/javascript.png', label: 'JavaScript' },
        { src: '/assets/img/icons/featured-projects/modal/rest-api.png', label: 'REST-API' }
      ]
    }
  ];

  isModalOpen = false;
  modalIndex = 0;

  openModal(index: number) {
    this.modalIndex = index;
    const proj = this.projects[index];
    this.displayedImage = proj.image;
    this.displayedBackground = proj.background;
    this.displayedOffset = index * 60;
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  nextModal() {
    const next = (this.modalIndex + 1) % this.projects.length;
    this.openModal(next);
  }

  showPreview(imagePath: string | null, backgroundPath: string | null, index: number = 0) {
    if (this._clearTimer) {
      clearTimeout(this._clearTimer);
      this._clearTimer = null;
    }

    this.hoveredImage = imagePath;
    this.hoveredBackground = backgroundPath;
    this.hoveredOffset = index * 100;

    this.displayedImage = imagePath;
    this.displayedBackground = backgroundPath;

    this.displayedOffset = this.hoveredOffset;
  }

  clearPreview() {
    this.hoveredImage = null;
    this.hoveredBackground = null;

    if (this._clearTimer) {
      clearTimeout(this._clearTimer);
    }
    this._clearTimer = setTimeout(() => {
      this.displayedImage = null;
      this.displayedBackground = null;
      this.displayedOffset = 0;
      this._clearTimer = null;
    }, 150);
  }
}
