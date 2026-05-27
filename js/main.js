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