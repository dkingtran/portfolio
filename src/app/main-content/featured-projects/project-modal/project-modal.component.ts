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
  private _prevBodyOverflow: string | null = null;

  private setBodyOverflow(hidden: boolean): void {
    try {
      if (hidden) {
        this._prevBodyOverflow = document.body.style.overflow || null;
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = this._prevBodyOverflow || '';
        this._prevBodyOverflow = null;
      }
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
      if (this._prevBodyOverflow !== null) {
        document.body.style.overflow = this._prevBodyOverflow;
        this._prevBodyOverflow = null;
      }
    } catch (e) {
    }
  }
}
