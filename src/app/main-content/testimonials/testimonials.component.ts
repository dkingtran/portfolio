import { Component, AfterViewInit, HostListener, ViewChild, ElementRef, OnInit, OnDestroy, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../services/language.service';

interface Testimonial {
  name: string;
  position: string;
  messageKey: string;
}

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './testimonials.component.html',
  styleUrl: './testimonials.component.scss'
})
export class TestimonialsComponent implements OnInit, AfterViewInit, OnDestroy {
  constructor(public languageService: LanguageService, private renderer: Renderer2) { }

  testimonials: Testimonial[] = [
    {
      name: 'Olivia Harper',
      position: 'Product Manager',
      messageKey: 'testimonials.t1.message'
    },
    {
      name: 'Marcus Lee',
      position: 'Senior Frontend Engineer',
      messageKey: 'testimonials.t2.message'
    },
    {
      name: 'Sofia Alvarez',
      position: 'UX Designer',
      messageKey: 'testimonials.t3.message'
    },
    {
      name: 'Ethan Brown',
      position: 'CTO',
      messageKey: 'testimonials.t4.message'
    }
  ];

  readonly cardWidth = 358;
  readonly gap = 24;
  viewportWidth = 0;
  carouselItems: Testimonial[] = [];
  readonly visibleSlides = 3;
  private cloneCount = this.visibleSlides;
  trackIndex = this.cloneCount;
  isAnimating = false;

  @ViewChild('viewport', { static: false }) viewportEl!: ElementRef<HTMLDivElement>;
  private startX = 0;
  private dragOffset = 0;
  private isDragging = false;
  private pointerMoveBound = this.onPointerMove.bind(this);
  private pointerUpBound = this.onPointerUp.bind(this);
  private pointerDownBound = this.onPointerDown.bind(this);
  private swipeThreshold = this.cardWidth * 0.25;

  @ViewChild('track', { static: false }) trackEl!: ElementRef<HTMLDivElement>;

  private resizeObserver?: ResizeObserver;

  private onTransitionEndBound = this.onTransitionEnd.bind(this);


  ngOnInit(): void {
    const n = this.testimonials.length;
    if (n > 0) {
      const leftClones = this.createLeftClones(n);
      const rightClones = this.createRightClones(n);
      this.carouselItems = [...leftClones, ...this.testimonials, ...rightClones];
      this.trackIndex = this.cloneCount;
    }
  }

  private createLeftClones(n: number): Testimonial[] {
    const clones: Testimonial[] = [];
    for (let i = 0; i < this.cloneCount; i++) {
      clones.unshift(this.testimonials[(n - 1 - (i % n))]);
    }
    return clones;
  }

  private createRightClones(n: number): Testimonial[] {
    const clones: Testimonial[] = [];
    for (let i = 0; i < this.cloneCount; i++) {
      clones.push(this.testimonials[i % n]);
    }
    return clones;
  }

  prev() {
    if (this.isAnimating) return;
    this.isAnimating = true;
    this.dragOffset = 0;
    this.trackIndex -= 1;
    if (this.trackEl && this.trackEl.nativeElement) {
      this.renderer.removeStyle(this.trackEl.nativeElement, 'transition');
      this.applyTransform();
    }
  }

  next() {
    if (this.isAnimating) return;
    this.isAnimating = true;
    this.dragOffset = 0;
    this.trackIndex += 1;
    if (this.trackEl && this.trackEl.nativeElement) {
      this.renderer.removeStyle(this.trackEl.nativeElement, 'transition');
      this.applyTransform();
    }
  }

  goTo(index: number) {
    if (this.isAnimating) return;
    this.isAnimating = true;
    this.dragOffset = 0;
    this.trackIndex = index + this.cloneCount;
    if (this.trackEl && this.trackEl.nativeElement) {
      this.renderer.removeStyle(this.trackEl.nativeElement, 'transition');
      this.applyTransform();
    }
  }
  ngAfterViewInit(): void {
    this.updateViewportWidth();
    this.setupTrackListeners();
    this.setupViewportListeners();
  }

  private setupTrackListeners() {
    if (this.trackEl && this.trackEl.nativeElement) {
      this.trackEl.nativeElement.addEventListener('transitionend', this.onTransitionEndBound);
      this.applyTransform();
    }
  }

  private setupViewportListeners() {
    if (this.viewportEl && this.viewportEl.nativeElement) {
      this.viewportEl.nativeElement.addEventListener('pointerdown', this.pointerDownBound);
      this.viewportEl.nativeElement.style.touchAction = 'pan-y';
      this.setupResizeObserver();
    }
  }

  private setupResizeObserver() {
    if (typeof ResizeObserver !== 'undefined' && this.viewportEl) {
      this.resizeObserver = new ResizeObserver(() => this.updateViewportWidth());
      this.resizeObserver.observe(this.viewportEl.nativeElement);
    }
  }

  @HostListener('window:resize')
  onResize() {
    this.updateViewportWidth();
  }

  private updateViewportWidth() {
    const el = (document.querySelector('.viewport') as HTMLElement | null);
    this.viewportWidth = el ? el.clientWidth : window.innerWidth;
    this.applyTransform();
  }

  ngOnDestroy(): void {
    this.cleanupTrackListeners();
    this.cleanupViewportListeners();
    this.cleanupResizeObserver();
  }

  private cleanupTrackListeners() {
    if (this.trackEl && this.trackEl.nativeElement) {
      this.trackEl.nativeElement.removeEventListener('transitionend', this.onTransitionEndBound);
    }
  }

  private cleanupViewportListeners() {
    if (this.viewportEl && this.viewportEl.nativeElement) {
      this.viewportEl.nativeElement.removeEventListener('pointerdown', this.pointerDownBound);
    }
  }

  private cleanupResizeObserver() {
    if (this.resizeObserver && this.viewportEl && this.viewportEl.nativeElement) {
      this.resizeObserver.unobserve(this.viewportEl.nativeElement);
      this.resizeObserver.disconnect();
    }
  }
  trackTransform(): string {
    const step = this.cardWidth + this.gap;
    const centerOffset = (this.viewportWidth - this.cardWidth) / 2;
    const x = -(this.trackIndex * step) + centerOffset + this.dragOffset;
    return `translate3d(${x}px, 0, 0)`;
  }
  private onPointerDown(ev: PointerEvent) {
    if (this.isAnimating) return;
    this.isDragging = true;
    this.startX = ev.clientX;
    this.dragOffset = 0;
    if (this.trackEl && this.trackEl.nativeElement) {
      this.renderer.setStyle(this.trackEl.nativeElement, 'transition', 'none');
    }
    window.addEventListener('pointermove', this.pointerMoveBound);
    window.addEventListener('pointerup', this.pointerUpBound);
    ev.preventDefault();
  }

  private onPointerMove(ev: PointerEvent) {
    if (!this.isDragging) return;
    this.dragOffset = ev.clientX - this.startX;
    if (this.trackEl && this.trackEl.nativeElement) {
      this.renderer.setStyle(this.trackEl.nativeElement, 'transform', this.trackTransform());
    }
  }

  private onPointerUp(ev: PointerEvent) {
    if (!this.isDragging) return;
    this.isDragging = false;
    window.removeEventListener('pointermove', this.pointerMoveBound);
    window.removeEventListener('pointerup', this.pointerUpBound);
    const delta = ev.clientX - this.startX;
    this.centerCurrentCard();
    this.handleSwipeOrSnap(delta);
  }

  private centerCurrentCard() {
    const track = this.trackEl.nativeElement as HTMLElement;
    const viewport = this.viewportEl?.nativeElement as HTMLElement | undefined;
    const child = track.children[this.trackIndex] as HTMLElement | undefined;
    if (child && viewport) {
      this.centerCardByPosition(child, viewport, track);
    } else {
      this.centerCardByCalculation(track);
    }
  }

  private centerCardByPosition(child: HTMLElement, viewport: HTMLElement, track: HTMLElement) {
    const cardCenter = child.offsetLeft + child.offsetWidth / 2;
    const viewportCenter = viewport.clientWidth / 2;
    const translate = viewportCenter - cardCenter + this.dragOffset;
    track.style.transform = `translate3d(${translate}px, 0, 0)`;
  }

  private centerCardByCalculation(track: HTMLElement) {
    const step = this.cardWidth + this.gap;
    const centerOffset = (this.viewportWidth - this.cardWidth) / 2;
    const x = -(this.trackIndex * step) + centerOffset + this.dragOffset;
    track.style.transform = `translate3d(${x}px, 0, 0)`;
  }

  private handleSwipeOrSnap(delta: number) {
    if (Math.abs(delta) > this.swipeThreshold) {
      this.dragOffset = 0;
      delta < 0 ? this.next() : this.prev();
    } else {
      this.dragOffset = 0;
      if (this.trackEl && this.trackEl.nativeElement) {
        this.applyTransform();
      }
    }
  }

  private onTransitionEnd(): void {
    if (!this.isAnimating) return;
    const realCount = this.testimonials.length;
    const total = this.carouselItems.length;
    this.handleCloneJump(realCount, total);
    this.isAnimating = false;
  }

  private handleCloneJump(realCount: number, total: number) {
    if (this.trackIndex >= total - this.cloneCount) {
      this.jumpWithoutAnimation(this.trackIndex - realCount);
    } else if (this.trackIndex < this.cloneCount) {
      this.jumpWithoutAnimation(this.trackIndex + realCount);
    }
  }

  private jumpWithoutAnimation(targetIndex: number) {
    const el = this.trackEl?.nativeElement;
    if (!el) {
      this.resetToTarget(targetIndex);
      return;
    }
    this.renderer.setStyle(el, 'transition', 'none');
    this.dragOffset = 0;
    this.applyJumpTransform(el, targetIndex);
    this.scheduleTransitionRestore(el, targetIndex);
  }

  private resetToTarget(targetIndex: number) {
    this.dragOffset = 0;
    this.trackIndex = targetIndex;
  }

  private applyJumpTransform(el: HTMLElement, targetIndex: number) {
    const viewport = this.viewportEl?.nativeElement as HTMLElement | undefined;
    const child = el.children[targetIndex] as HTMLElement | undefined;
    if (child && viewport) {
      const cardCenter = child.offsetLeft + child.offsetWidth / 2;
      const viewportCenter = viewport.clientWidth / 2;
      const translate = viewportCenter - cardCenter;
      el.style.transform = `translate3d(${translate}px, 0, 0)`;
    } else {
      this.applyCalculatedTransform(el, targetIndex);
    }
  }

  private applyCalculatedTransform(el: HTMLElement, targetIndex: number) {
    const step = this.cardWidth + this.gap;
    const centerOffset = (this.viewportWidth - this.cardWidth) / 2;
    const x = -(targetIndex * step) + centerOffset;
    el.style.transform = `translate3d(${x}px, 0, 0)`;
  }

  private scheduleTransitionRestore(el: HTMLElement, targetIndex: number) {
    setTimeout(() => {
      this.trackIndex = targetIndex;
      this.renderer.setStyle(el, 'transition', 'transform 420ms cubic-bezier(.22, .9, .36, 1)');
    }, 0);
  }

  private applyTransform() {
    const track = this.trackEl?.nativeElement as HTMLElement | undefined;
    const viewport = this.viewportEl?.nativeElement as HTMLElement | undefined;
    if (!track || !viewport) return;
    const child = track.children[this.trackIndex] as HTMLElement | undefined;
    if (child) {
      this.applyTransformByChild(child, viewport, track);
    } else {
      this.applyTransformByCalculation(track);
    }
  }

  private applyTransformByChild(child: HTMLElement, viewport: HTMLElement, track: HTMLElement) {
    const cardCenter = child.offsetLeft + child.offsetWidth / 2;
    const viewportCenter = viewport.clientWidth / 2;
    const translate = viewportCenter - cardCenter + this.dragOffset;
    track.style.transform = `translate3d(${translate}px, 0, 0)`;
  }

  private applyTransformByCalculation(track: HTMLElement) {
    const step = this.cardWidth + this.gap;
    const centerOffset = (this.viewportWidth - this.cardWidth) / 2;
    const x = -(this.trackIndex * step) + centerOffset + this.dragOffset;
    track.style.transform = `translate3d(${x}px, 0, 0)`;
  }
}
