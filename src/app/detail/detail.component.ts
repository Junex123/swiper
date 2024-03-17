import { Component, AfterViewInit, ElementRef, Renderer2, ViewEncapsulation } from '@angular/core';
import { Swiper } from 'swiper';


@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements AfterViewInit {
  public swiper!: Swiper | null; // Change from private to public

  constructor(private elementRef: ElementRef, private renderer: Renderer2) { }

  ngAfterViewInit() {
    setTimeout(() => {
      this.initSwiper();
    });
  }

  private initSwiper() {
    // Check if Swiper is loaded
    if (typeof Swiper === 'undefined') {
      console.error('Swiper is not properly loaded.');
      return;
    }

    this.swiper = new Swiper(this.elementRef.nativeElement.querySelector('.product-slider'), {
      slidesPerView: 1, // Show only one slide at a time
      spaceBetween: 0, // Adjust as needed
      effect: 'fade', // Change to fade or any other suitable effect
      loop: true,
      navigation: {
        nextEl: this.elementRef.nativeElement.querySelector('.next'),
        prevEl: this.elementRef.nativeElement.querySelector('.prev')
      },
      on: {
        init: () => {
          this.handleSlideChange();
        },
        slideChange: () => {
          this.handleSlideChange();
        }
      }
    });
    
    // Update navigation buttons after Swiper initialization
    this.updateNavigationButtons();
  }

  private handleSlideChange() {
    if (this.swiper) {
      this.updateNavigationButtons();

      const index = this.swiper.activeIndex;
      const target = this.elementRef.nativeElement.querySelector(`.product-img__item[data-target='${index}']`);
      document.querySelectorAll('.product-img__item').forEach((item: Element) => {
        this.renderer.removeClass(item, 'active');
      });
      if (target) {
        this.renderer.addClass(target, 'active');
      }
    }
  }

  private updateNavigationButtons() {
    const prevButton = this.elementRef.nativeElement.querySelector('.prev');
    const nextButton = this.elementRef.nativeElement.querySelector('.next');
  
    if (prevButton && nextButton) {
      this.renderer.removeClass(prevButton, 'disabled');
      this.renderer.removeClass(nextButton, 'disabled');
    }
  }
  
  prevSlide() {
    if (this.swiper && !this.swiper.isBeginning) {
      this.swiper.slidePrev();
    }
  }

  nextSlide() {
    if (this.swiper && !this.swiper.isEnd) {
      this.swiper.slideNext();
    }
  }

  toggleFavorite() {
    const heart = this.elementRef.nativeElement.querySelector('.heart');
    if (heart) {
      heart.classList.toggle('is-active');
    }
  }
}
