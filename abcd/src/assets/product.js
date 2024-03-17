// Initialize VanillaTilt on cards
VanillaTilt.init(document.querySelectorAll(".card1"), {
    max: 25,
    speed: 1000,
    transition: true,
});

// Add event listeners for hover
document.querySelectorAll('.card').forEach(card => {
    // Save original and hover image sources on each card
    const originalSrc = card.querySelector('.product').getAttribute('src');
    const hoverSrc = card.querySelector('.product').getAttribute('data-hover-src');
  
    card.addEventListener('mouseenter', function () {
        // Change the main image source on hover
        const image = card.querySelector('.product');

        if (hoverSrc) {
            image.setAttribute('src', hoverSrc);
        }
    });

    card.addEventListener('mouseleave', function () {
        // Revert to the original main image source on mouse leave
        const image = card.querySelector('.product');

        if (originalSrc) {
            image.setAttribute('src', originalSrc);
        }
    });
});
