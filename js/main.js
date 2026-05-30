/* AfriTalent - JavaScript */

document.addEventListener('DOMContentLoaded', function() {

    /*dark Mode*/
    function initDarkMode() {
        const darkModeToggle = document.getElementById('darkModeToggle');
        const savedTheme = localStorage.getItem('theme');

        if (savedTheme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
            updateDarkModeIcon(true);
        }

        if (darkModeToggle) {
            darkModeToggle.addEventListener('click', function() {
                const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
                if (isDark) {
                    document.documentElement.removeAttribute('data-theme');
                    localStorage.setItem('theme', 'light');
                    updateDarkModeIcon(false);
                } else {
                    document.documentElement.setAttribute('data-theme', 'dark');
                    localStorage.setItem('theme', 'dark');
                    updateDarkModeIcon(true);
                }
            });
        }
    }

    function updateDarkModeIcon(isDark) {
    const icon = document.querySelector('#darkModeToggle i');
    if (icon) {
        icon.className = isDark ? 'bi bi-sun-fill' : 'bi bi-moon-fill';
    }
}

/*Navbar Dynamique au Scroll*/

function initNavbarScroll () {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            }
        });
    }
}

/*Bouton Retour en Haut*/

function initBackToTopButton () {
    const backButton = document.getElementById('backToTop');
    if (backButton) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backButton.classList.add('show');
            } else {
                backButton.classList.remove('show');
            }
        });

        backButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                 behavior: 'smooth'
                });
        });
    }
}

});

/*Compteur Animes*/

function initAnimatedCounters () {
    const counters = document.querySelectorAll('.counter');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                const duration = 2000;
                const step = target / (duration / 16);
                let current = 0;

                const updateCounter = () => {
                    current += step;
                    if (current < target) {
                        counter.textContent = Math.floor(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }
                };

                updateCounter();
                observer.unobserve(counter);
            }
        });
    }, {threshold: 0.5});

    counters.forEach(counter => observer.observe(counter));
}

/*Animation au Scroll */

function initScrollAnimations () {
    const fadeElements = document.querySelectorAll('.fade-in');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {threshold: 0.1});

    fadeElements.forEach(el => observer.observe(el));

}