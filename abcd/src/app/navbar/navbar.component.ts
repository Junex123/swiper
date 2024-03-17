import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  isNavActive: boolean = false;
  @ViewChild('navMenu') navMenu!: ElementRef;

  constructor() { }

  ngOnInit(): void {
    // Custom logic on component initialization
  }

  toggleNav(): void {
    console.log("Toggling navigation..."); // For debugging
    this.isNavActive = !this.isNavActive;
    if (this.isNavActive) {
      this.navMenu.nativeElement.classList.add('nav-active');
    } else {
      this.navMenu.nativeElement.classList.remove('nav-active');
    }
  }
}
