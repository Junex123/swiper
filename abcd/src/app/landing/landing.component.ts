import { Component, OnInit, OnDestroy, Renderer2, ElementRef } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit, OnDestroy {
  bannerTimer: any;

  constructor(private renderer: Renderer2, private elementRef: ElementRef) { }

  ngOnInit(): void {
    this.initBannerTimer();
    this.setupBannerControls();
  }

  ngOnDestroy(): void {
    clearInterval(this.bannerTimer);
  }

  private initBannerTimer(): void {
    this.bannerTimer = setInterval(() => this.bannerSwitcher(), 5000);
  }

  private bannerSwitcher(): void {
    const inputs = this.elementRef.nativeElement.querySelectorAll('.sec-1-input');
    const checkedInput = this.elementRef.nativeElement.querySelector('.sec-1-input:checked');
    let nextIndex = Array.from(inputs).indexOf(checkedInput) + 1;
    if (nextIndex >= inputs.length) {
      nextIndex = 0;
    }
    inputs[nextIndex].checked = true;

    // Increase timer to 8 seconds if the next slide is slide 2 (index 1)
    if (nextIndex === 1) {
      clearInterval(this.bannerTimer);
      this.bannerTimer = setInterval(() => this.bannerSwitcher(), 5000);
    } else {
      clearInterval(this.bannerTimer);
      this.bannerTimer = setInterval(() => this.bannerSwitcher(), 5000);
    }
  }

  private setupBannerControls(): void {
    const controlLabels = this.elementRef.nativeElement.querySelectorAll('nav .controls label');
    controlLabels.forEach((label: any) => {
      this.renderer.listen(label, 'click', () => {
        clearInterval(this.bannerTimer);
        this.initBannerTimer();
      });
    });
  }
}
