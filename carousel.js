window.onresize = function () {
    replaceNavItemWithIcon();
};

window.onload = function () {
    replaceNavItemWithIcon();

    let autoSlideTimer; // Variable to store the timer

    // Function to get the current image index from the src attribute
    function getCurrentIndex(carousel) {
        const currentSrc = carousel.getAttribute('src');
        return parseInt(currentSrc.match(/carousel(\d+)\.png/)[1]);
    }

    // Function to update the carousel image with the new index
    function updateCarouselImage(carousel, newIndex) {
        const currentSrc = carousel.getAttribute('src');
        const newSrc = currentSrc.replace(/carousel(\d+)\.png/, `carousel${newIndex}.png`);
        carousel.setAttribute('src', newSrc);
        updateActiveDot(newIndex); // Update the active dot
    }

    // Function to create dots dynamically
    function createDots() {
        const dotsContainer = document.querySelector('#carousel-dots');
        for (let i = 1; i <= numberOfImages; i++) {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (i === 1) {
                dot.classList.add('active'); // Set the first dot as active
            }
            dot.dataset.index = i; // Store the index in a data attribute
            dot.addEventListener('click', function () {
                const carousel = document.querySelector('#carousel');
                updateCarouselImage(carousel, parseInt(dot.dataset.index));
                stopAutoSlide(); // Stop the auto-slide timer on manual interaction
                startAutoSlide(); // Restart the auto-slide timer
            });
            dotsContainer.appendChild(dot);
        }
    }

    // Function to update the active dot
    function updateActiveDot(index) {
        const dots = document.querySelectorAll('#carousel-dots .dot');
        dots.forEach(dot => dot.classList.remove('active')); // Remove active class from all dots
        dots[index - 1].classList.add('active'); // Add active class to the current dot
    }

    // Function to start the auto-slide timer
    function startAutoSlide() {
        autoSlideTimer = setInterval(() => {
            const carousel = document.querySelector('#carousel');
            let currentIndex = getCurrentIndex(carousel);

            // Wrap around to the first image if at the last image
            const newIndex = currentIndex >= numberOfImages ? 1 : currentIndex + 1;
            updateCarouselImage(carousel, newIndex);
        }, speed * 1000); // Change image after a set amount of  seconds
    }

    // Function to stop the auto-slide timer
    function stopAutoSlide() {
        clearInterval(autoSlideTimer);
    }

    // Left button click handler
    const carousleftButton = document.querySelector('.left-svg');
    carousleftButton.addEventListener('click', function () {
        const carousel = document.querySelector('#carousel');
        let currentIndex = getCurrentIndex(carousel);

        // Wrap around to the last image if at the first image
        const newIndex = currentIndex <= 1 ? numberOfImages : currentIndex - 1;
        updateCarouselImage(carousel, newIndex);

        // Restart the auto-slide timer
        stopAutoSlide();
        startAutoSlide();
    });

    // Right button click handler
    const carousrightButton = document.querySelector('.right-svg');
    carousrightButton.addEventListener('click', function () {
        const carousel = document.querySelector('#carousel');
        let currentIndex = getCurrentIndex(carousel);

        // Wrap around to the first image if at the last image
        const newIndex = currentIndex >= numberOfImages ? 1 : currentIndex + 1;
        updateCarouselImage(carousel, newIndex);

        // Restart the auto-slide timer
        stopAutoSlide();
        startAutoSlide();
    });

    // Initialize the carousel
    createDots(); // Create dots dynamically
    startAutoSlide(); // Start the auto-slide timer
};

function replaceNavItemWithIcon() {
    const firstNavItem = document.querySelector('#main-nav li:first-of-type');

    if (window.innerWidth <= 750 && window.innerWidth > 650 &&firstNavItem ) {
        // Clear the existing content
        firstNavItem.textContent = '';

        // Create an <a> element for the link
        const homeLink = document.createElement('a');
        homeLink.href = 'index.html'; // Link to the homepage

        // Create an <img> element for the SVG
        const homeIcon = document.createElement('img');
        homeIcon.src = 'media/home-icon.svg'; // Path to the SVG file
        homeIcon.alt = 'Home'; // Add alt text for accessibility
        homeIcon.style.width = '24px'; // Adjust the size of the icon
        homeIcon.style.height = '24px';

        // Append the SVG to the <a> tag
        homeLink.appendChild(homeIcon);

        // Append the <a> tag to the <li>
        firstNavItem.appendChild(homeLink);
    } else if (window.innerWidth > 750 && firstNavItem || window.innerWidth <= 650 && firstNavItem ) {
        // Restore the original text content with a link if the screen is resized back
        firstNavItem.innerHTML = '<a href="index.html">Home</a>';
    }
}