import { Component, AfterViewInit, HostListener, ViewChild, ElementRef, OnInit, OnDestroy, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Testimonial {
  name: string;
  position: string;
  message: string;
}

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './testimonials.component.html',
  styleUrl: './testimonials.component.scss'
})
export class TestimonialsComponent implements OnInit, AfterViewInit, OnDestroy {
  testimonials: Testimonial[] = [
    {
      name: 'Olivia Harper',
      position: 'Product Manager',
      message: 'Working with Dennis was a delight — his attention to accessibility and detail lifted our product quality significantly.'
    },
    {
      name: 'Marcus Lee',
      position: 'Senior Frontend Engineer',
      message: 'Dennis brings thoughtful design and pragmatic engineering together; he ships reliable UI that feels polished.'
    },
    {
      name: 'Sofia Alvarez',
      position: 'UX Designer',
      message: 'He iterates quickly, listens closely to feedback and consistently delivers delightful micro-interactions.'
    },
    {
      name: 'Ethan Brown',
      position: 'CTO',
      message: 'A dependable teammate — Dennis turns ambiguous tasks into clear, production-ready features with care.'
    }
  ];

  readonly cardWidth = 358;
  readonly gap = 24;
  viewportWidth = 0;
  carouselItems: Testimonial[] = [];
  // how many visible slides (desktop); clone this many items to each end to avoid flicker
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

  private onTransitionEndBound = this.onTransitionEnd.bind(this);

  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {
    // build carouselItems with multiple clones at each end to make wrap seamless
    const n = this.testimonials.length;
    if (n > 0) {
      const leftClones: Testimonial[] = [];
      const rightClones: Testimonial[] = [];
      // number of clones is cloneCount (visibleSlides). If there are fewer testimonials than cloneCount, wrap accordingly
      for (let i = 0; i < this.cloneCount; i++) {
        // left clones: take from end
        leftClones.unshift(this.testimonials[(n - 1 - (i % n))]);
        // right clones: take from start
        rightClones.push(this.testimonials[i % n]);
      }
      this.carouselItems = [...leftClones, ...this.testimonials, ...rightClones];
      this.trackIndex = this.cloneCount; // start at first real
    }
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
    // map real index (0..n-1) to carousel index offset by cloneCount
    this.trackIndex = index + this.cloneCount;
    if (this.trackEl && this.trackEl.nativeElement) {
      this.renderer.removeStyle(this.trackEl.nativeElement, 'transition');
      this.applyTransform();
    }
  }

  // compute translateX for the track
  ngAfterViewInit(): void {
    this.updateViewportWidth();
    // attach transitionend to track to handle clone-jump
    if (this.trackEl && this.trackEl.nativeElement) {
      this.trackEl.nativeElement.addEventListener('transitionend', this.onTransitionEndBound);
      // initialize transform from TS to avoid simultaneous template binding
      this.applyTransform();
    }
    // attach pointerdown to viewport for swipe
    if (this.viewportEl && this.viewportEl.nativeElement) {
      this.viewportEl.nativeElement.addEventListener('pointerdown', this.pointerDownBound);
      // ensure touch-action none for panning
      this.viewportEl.nativeElement.style.touchAction = 'pan-y';
    }
  }

  @HostListener('window:resize')
  onResize() {
    this.updateViewportWidth();
  }

  private updateViewportWidth() {
    const el = (document.querySelector('.viewport') as HTMLElement | null);
    if (el) {
      this.viewportWidth = el.clientWidth;
    } else {
      this.viewportWidth = window.innerWidth;
    }
  }

  ngOnDestroy(): void {
    if (this.trackEl && this.trackEl.nativeElement) {
      this.trackEl.nativeElement.removeEventListener('transitionend', this.onTransitionEndBound);
    }
    if (this.viewportEl && this.viewportEl.nativeElement) {
      this.viewportEl.nativeElement.removeEventListener('pointerdown', this.pointerDownBound);
    }
  }

  // compute transform based on trackIndex inside carouselItems
  trackTransform(): string {
    const step = this.cardWidth + this.gap;
    // centerOffset when viewport shows 3 cards: center card is the 2nd visible item
    const centerOffset = (this.viewportWidth - this.cardWidth) / 2;
    const x = -(this.trackIndex * step) + centerOffset + this.dragOffset;
    return `translate3d(${x}px, 0, 0)`;
  }

  // pointer handlers for swipe
  private onPointerDown(ev: PointerEvent) {
    if (this.isAnimating) return;
    this.isDragging = true;
    this.startX = ev.clientX;
    this.dragOffset = 0;
    // disable transition while dragging
    if (this.trackEl && this.trackEl.nativeElement) {
      this.renderer.setStyle(this.trackEl.nativeElement, 'transition', 'none');
    }
    window.addEventListener('pointermove', this.pointerMoveBound);
    window.addEventListener('pointerup', this.pointerUpBound);
    // prevent default to avoid scrolling on touch
    ev.preventDefault();
  }

  private onPointerMove(ev: PointerEvent) {
    if (!this.isDragging) return;
    const delta = ev.clientX - this.startX;
    this.dragOffset = delta;
    // apply transform immediately
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
    const step = this.cardWidth + this.gap;
    const centerOffset = (this.viewportWidth - this.cardWidth) / 2;
    const x = -(this.trackIndex * step) + centerOffset + this.dragOffset;
    this.trackEl.nativeElement.style.transform = `translate3d(${x}px, 0, 0)`;
    if (Math.abs(delta) > this.swipeThreshold) {
      this.dragOffset = 0;
      // perform navigation
      if (delta < 0) {
        this.next();
      } else {
        this.prev();
      }
    } else {
      // snap back
      this.dragOffset = 0;
      if (this.trackEl && this.trackEl.nativeElement) {
        this.applyTransform();
      }
    }
  }

  private onTransitionEnd(): void {
    const realCount = this.testimonials.length;
    const total = this.carouselItems.length;
    if (!this.isAnimating) return;
    // if we've moved past the right clones, jump back to the corresponding real index
    if (this.trackIndex >= total - this.cloneCount) {
      const target = this.trackIndex - realCount;
      this.jumpWithoutAnimation(target);
    } else if (this.trackIndex < this.cloneCount) {
      // moved into left clones, jump forward by realCount
      const target = this.trackIndex + realCount;
      this.jumpWithoutAnimation(target);
    }

    this.isAnimating = false;
  }

  private computeTransformForIndex(index: number): string {
    const step = this.cardWidth + this.gap;
    const centerOffset = (this.viewportWidth - this.cardWidth) / 2;
    const x = -(index * step) + centerOffset;
    return `translate3d(${x}px, 0, 0)`;
  }

  private jumpWithoutAnimation(targetIndex: number) {
    const el = this.trackEl?.nativeElement;
    if (!el) {
      this.dragOffset = 0;
      this.trackIndex = targetIndex;
      return;
    }
    // remove transition
    this.renderer.setStyle(el, 'transition', 'none');
    this.dragOffset = 0;
    // set transform directly to the target position
    const step = this.cardWidth + this.gap;
    const centerOffset = (this.viewportWidth - this.cardWidth) / 2;
    const x = -(targetIndex * step) + centerOffset;
    el.style.transform = `translate3d(${x}px, 0, 0)`;
    // update index in next macrotask to avoid ExpressionChangedAfterItHasBeenChecked
    setTimeout(() => {
      this.trackIndex = targetIndex;
      // restore inline transition so future moves animate
      this.renderer.setStyle(el, 'transition', 'transform 420ms cubic-bezier(.22, .9, .36, 1)');
    }, 0);
  }

  // apply computed transform using current trackIndex and dragOffset
  private applyTransform() {
    const el = this.trackEl?.nativeElement;
    if (!el) return;
    const step = this.cardWidth + this.gap;
    const centerOffset = (this.viewportWidth - this.cardWidth) / 2;
    const x = -(this.trackIndex * step) + centerOffset + this.dragOffset;
    el.style.transform = `translate3d(${x}px, 0, 0)`;
  }
}
