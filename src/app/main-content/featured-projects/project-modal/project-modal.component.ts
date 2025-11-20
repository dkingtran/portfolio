import { Component, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Project {
  id?: string;
  title?: string;
  tech?: string[];
  image?: string;
  background?: string;
  description?: string;
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
  private _isOpen = false;
  private _prevBodyOverflow: string | null = null;

  @Input()
  set isOpen(value: boolean) {
    this._isOpen = !!value;
    if (this._isOpen) {
      try {
        this._prevBodyOverflow = document.body.style.overflow || null;
        document.body.style.overflow = 'hidden';
      } catch (e) {
      }
    } else {
      try {
        if (this._prevBodyOverflow !== null) {
          document.body.style.overflow = this._prevBodyOverflow;
        } else {
          document.body.style.overflow = '';
        }
        this._prevBodyOverflow = null;
      } catch (e) {
      }
    }
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
