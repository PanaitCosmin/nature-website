const menuBtn = document.querySelector('#menu-btn');
const navLinks = document.querySelector('.nav-links');
const overlay = document.querySelector('#overlay');
const mainContent = document.querySelector('#main-content');
const navbar = document.querySelector('.navbar');

let lastScrollY = window.scrollY;
let scrollUpDistance = 0;
const scrollUpThreshold = 30; // Optional: Set how much to scroll up before showing navbar

// Function to toggle navbar (existing functionality)
function toggleNavbar() {

    if (window.innerWidth < 768) {
        const isExpanded = menuBtn.getAttribute('aria-expanded') === 'true';
        menuBtn.setAttribute('aria-expanded', !isExpanded);
        
        navLinks.classList.toggle('active');
        menuBtn.classList.toggle('open');
        mainContent.classList.toggle('blur');
        navbar.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
        overlay.classList.toggle('visible')
    } 
}

// Event Listener for Hamburger Menu
menuBtn.addEventListener('click', toggleNavbar);

// Event Listener for Overlay Click
overlay.addEventListener('click', toggleNavbar);


// Function to handle navbar visibility on scroll
function handleNavbarVisibility() {
    const currentScrollY = window.scrollY;
    const scrollThreshold = 20; // Decreased from 50 to 20

    if (currentScrollY < scrollThreshold) {
        // If near the top, show the navbar
        navbar.style.top = '0';
        scrollUpDistance = 0;
    } else if (currentScrollY > lastScrollY) {
        // Scrolling down - hide navbar
        navbar.style.top = '-80px'; // Adjust based on navbar height
        scrollUpDistance = 0;
    } else {
        // Scrolling up
        scrollUpDistance += lastScrollY - currentScrollY;
        if (scrollUpDistance > scrollUpThreshold) {
            navbar.style.top = '0';
            scrollUpDistance = 0; // Reset after showing navbar
        }
    }

    lastScrollY = currentScrollY;
}

// Throttle function to improve performance
function throttle(fn, wait) {
    let time = Date.now();
    return function() {
        if ((time + wait - Date.now()) < 0) {
            fn();
            time = Date.now();
        }
    }
}

// Add scroll event listener with throttling
window.addEventListener('scroll', throttle(handleNavbarVisibility, 100)); // Reduced wait time to 100ms

// Close navbar when a link is clicked (Mobile)
const navLinksItems = document.querySelectorAll('.nav-links a');

navLinksItems.forEach(link => {
        link.addEventListener('click', toggleNavbar);
});


// Clone logos
const logosSlideCopy = document.querySelector('.logos-slide').cloneNode(true)
const logosContainer = document.querySelector('.logos')
logosContainer.appendChild(logosSlideCopy)