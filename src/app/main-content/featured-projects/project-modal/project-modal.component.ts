import { Component, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../../services/language.service';

export interface Project {
  id?: string;
  title?: string;
  tech?: string[];
  image?: string;
  background?: string;
  descriptionKey?: string;
  github?: string;
  live?: string;
  techIcons?: { src: string; label: string }[];
}

@Component({
  selector: 'app-project-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project-modal.component.html',
  styleUrls: ['./project-modal.component.scss']
})
export class ProjectModalComponent {
  @Input() project: Project | null = null;
  constructor(public languageService: LanguageService) { }
  private _isOpen = false;

  private setBodyOverflow(hidden: boolean): void {
    try {
      const html = document.documentElement;
      const body = document.body;
      html.style.overflow = hidden ? 'hidden' : '';
      body.style.overflow = hidden ? 'hidden' : '';
    } catch (e) { }
  }

  @Input()
  set isOpen(value: boolean) {
    this._isOpen = !!value;
    this.setBodyOverflow(this._isOpen);
  }

  get isOpen(): boolean {
    return this._isOpen;
  }

  @Input() index = 0;

  @Output() close = new EventEmitter<void>();
  @Output() next = new EventEmitter<void>();

  onClose() {
    this.close.emit();
  }

  onNext() {
    this.next.emit();
  }

  ngOnDestroy(): void {
    try {
      document.body.style.overflow = '';
    } catch (e) {
    }
  }
}
