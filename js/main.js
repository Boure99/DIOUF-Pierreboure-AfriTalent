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

/* Filtage Dynamique des freelances */
function initFreelanceFiltering () {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const freelanceCards = document.querySelectorAll('.freelance-card');

    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');

                const category = this.getAttribute('data-category');

                freelanceCards.forEach(card => {
                    if (category === 'all' || card.getAttribute('data-category') === category) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'scale(1)';}, 10);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                        card.style.display = 'none';}, 300);
                    }
                 });
            });
        });
    }  
}

/*Validation du Formulaire*/

function initFormValidation () {
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            let isValid = true;

            const nom = document.getElementById('nom');
            const nomError = document.getElementById('nomError');
            if (!nom.value.trim()) {
                nom.classList.add('error');
                nomError.classList.add('show');
                isValid = false;
            } else {
                nom.classList.remove('error');
                nomError.classList.remove('show');
            }

            const prenom = document.getElementById('prenom');
            const prenomError = document.getElementById('prenomError'); 
            if (!prenom.value.trim()) {
                prenom.classList.add('error');
                prenomError.classList.add('show');
                isValid = false;
            } else {
                prenom.classList.remove('error');
                prenomError.classList.remove('show');
            }

            /*validation Email*/

            const email = document.getElementById('email');
            const emailError = document.getElementById('emailError');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!email.value.trim() || !emailRegex.test(email.value)) {
                email.classList.add('error');
                emailError.classList.add('show');
                isValid = false;
            } else {
                email.classList.remove('error');
                emailError.classList.remove('show');
            }

            const sujet = document.getElementById('sujet');
            const sujetError = document.getElementById('sujetError');
            if (!sujet.value.trim()) {
                sujet.classList.add('error');
                sujetError.classList.add('show');
                isValid = false;
            } else {
                sujet.classList.remove('error');
                sujetError.classList.remove('show');
            }

            const message = document.getElementById('message');
            const messageError = document.getElementById('messageError');
            if (!message.value.trim() || message.value.trim().length < 20) {
                message.classList.add('error');
                messageError.classList.add('show');
                isValid = false;
            } else {
                message.classList.remove('error');
                messageError.classList.remove('show');
            }

            const successMessage = document.getElementById('successMessage');
            if (isValid) {
                successMessage.classList.add('show');
                form.reset();
                setTimeout(() => {successMessage.classList.remove('show');
                }, 5000);
            }
        });

        const inputs = [nom, prenom, email, sujet, message];
        inputs.forEach(id => {
            const input = document.getElementById(id);
            if (input) {
                input.addEventListener('input', function() {
                    this.classList.remove('error');
                    const errorElement = document.getElementById(id + 'Error');
                    if (errorElement) {
                        errorElement.classList.remove('show');
                    }
                });
            }
        }); 
    }
}

/*Année Dynamique dans le Footer*/

function initDynamicYear () {
    const yearSpan = document.getElementById('currentYear');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
}