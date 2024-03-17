import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    // Add event listeners for hover
    document.querySelectorAll('.card').forEach(card => {
      const productElement = card.querySelector('.product') as HTMLImageElement | null;

      if (productElement) {
        const originalSrc = productElement.getAttribute('src');
        const hoverSrc = productElement.getAttribute('data-hover-src');
    
        card.addEventListener('mouseenter', () => {
          if (hoverSrc) {
            productElement.src = hoverSrc;
          }
        });
  
        card.addEventListener('mouseleave', () => {
          if (originalSrc) {
            productElement.src = originalSrc;
          }
        });
      }
    });
  }
}
