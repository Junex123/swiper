document.addEventListener('DOMContentLoaded', function () {
    var body = document.body;
    var menuIcon = document.querySelector('.menu-icon');
    var navContent = document.querySelector('.nav__content');

    function isBackgroundLight() {
        // Get the background color of the body
        var backgroundColor = window.getComputedStyle(body).backgroundColor;

        // Convert the color to a brightness value
        var brightness = getBrightness(backgroundColor);

        // Return true if the background is light, false if it's dark
        return brightness > 128;
    }

    function getBrightness(color) {
        var rgb = color.match(/\d+/g);
        var brightness = (rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000;
        return brightness;
    }

    function updateMenuIconColor() {
        var isLight = isBackgroundLight();
        menuIcon.style.color = isLight ? 'black' : 'white';
    }

    function toggleNav() {
        body.classList.toggle('nav-active');
        navContent.style.visibility = body.classList.contains('nav-active') ? 'visible' : 'hidden';
    }

    // Initial update
    updateMenuIconColor();

    // Update on window resize
    window.addEventListener('resize', updateMenuIconColor);

    // Toggle navigation on menu icon click
    menuIcon.addEventListener('click', toggleNav);

    // Close navigation on overlay click
    navContent.addEventListener('click', function (event) {
        if (event.target === navContent) {
            toggleNav();
        }
    });
});
