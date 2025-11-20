import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectModalComponent } from './project-modal/project-modal.component';

@Component({
  selector: 'app-featured-projects',
  standalone: true,
  imports: [CommonModule, ProjectModalComponent],
  templateUrl: './featured-projects.component.html',
  styleUrl: './featured-projects.component.scss'
})
export class FeaturedProjectsComponent {

  hoveredImage: string | null = null;
  hoveredBackground: string | null = null;
  displayedImage: string | null = null;
  displayedBackground: string | null = null;
  // vertical offset in px for the current preview (staggering)
  hoveredOffset: number = 0;
  displayedOffset: number = 0;
  private _clearTimer: any = null;

  // canonical, index-prefixed filenames for images (recommended pattern)
  projects = [
    {
      id: 'proj-1',
      title: 'Join',
      tech: ['HTML', 'CSS', 'JavaScript', 'Firebase'],
      image: '/assets/img/icons/featured-projects/project-images/01_join.png',
      background: '/assets/img/icons/featured-projects/base/01_capa_1.png',
      description: 'Join is a small collaborative app demonstrating real-time updates and Firebase integration.',
      github: 'https://github.com/yourname/join',
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
      image: '/assets/img/icons/featured-projects/project-images/02_el_pollo_loco.png',
      background: '/assets/img/icons/featured-projects/base/01_capa_1.png',
      description: 'El Pollo Loco is a restaurant landing project focusing on responsive design and animations.',
      github: 'https://github.com/yourname/el-pollo-loco',
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
      image: '/assets/img/icons/featured-projects/project-images/03_pokedex.png',
      background: '/assets/img/icons/featured-projects/base/01_capa_1.png',
      description: 'Pokédex demonstrates REST API consumption and dynamic UI rendering with animations.',
      github: 'https://github.com/yourname/pokedex',
      live: 'https://yourdomain.com/pokedex',
      techIcons: [
        { src: '/assets/img/icons/featured-projects/modal/html.png', label: 'HTML' },
        { src: '/assets/img/icons/featured-projects/modal/css.png', label: 'CSS' },
        { src: '/assets/img/icons/featured-projects/modal/javascript.png', label: 'JavaScript' },
        { src: '/assets/img/icons/featured-projects/modal/api.png', label: 'REST-API' }
      ]
    }
  ];

  // Modal state
  isModalOpen = false;
  modalIndex = 0; // index into projects array

  openModal(index: number) {
    this.modalIndex = index;
    // ensure preview state corresponds
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
    // cancel any pending clear
    if (this._clearTimer) {
      clearTimeout(this._clearTimer);
      this._clearTimer = null;
    }

    this.hoveredImage = imagePath;
    this.hoveredBackground = backgroundPath;
    // determine offset (80px per item index)
    this.hoveredOffset = index * 100;

    // ensure the image srcs are present so they can fade in
    this.displayedImage = imagePath;
    this.displayedBackground = backgroundPath;

    // set displayedOffset immediately so transform updates
    this.displayedOffset = this.hoveredOffset;
  }

  clearPreview() {
    // start fade-out by removing the "visible" flag
    this.hoveredImage = null;
    this.hoveredBackground = null;

    // after transition (125ms) remove the srcs to avoid broken/empty img
    if (this._clearTimer) {
      clearTimeout(this._clearTimer);
    }
    this._clearTimer = setTimeout(() => {
      this.displayedImage = null;
      this.displayedBackground = null;
      // reset displayed offset too
      this.displayedOffset = 0;
      this._clearTimer = null;
    }, 150);
  }
}
