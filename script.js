// JavaScript Personalizado para la Landing Page de Academia Navegatel

document.addEventListener('DOMContentLoaded', () => {
    const header = document.getElementById('site-header');
    if (!header) return;

    let lastScrollY = window.scrollY;

    const TRANSPARENT_ZONE = 60;
    const HIDE_CLASS = '-translate-y-full';

    // ===============================
    // ESTADOS VISUALES
    // ===============================

    // Header base (top)
    const showBase = () => {
        header.classList.remove(
            HIDE_CLASS,
            'bg-white/70',
            'backdrop-blur-md',
            'shadow-sm'
        );
    };

    // Header visible en scroll (glass)
    const showGlass = () => {
        header.classList.remove(HIDE_CLASS);
        header.classList.add(
            'bg-white/70',
            'backdrop-blur-md',
            'shadow-sm'
        );
    };

    // Header oculto
    const hideHeader = () => {
        header.classList.add(HIDE_CLASS);
    };

    // ===============================
    // ESTADO INICIAL
    // ===============================

    if (window.scrollY <= TRANSPARENT_ZONE) {
        showBase();
    } else {
        showGlass();
    }

    // ===============================
    // SCROLL
    // ===============================

    window.addEventListener('scroll', () => {
        const currentY = window.scrollY;
        const delta = currentY - lastScrollY;

        // Zona transparente (top)
        if (currentY <= TRANSPARENT_ZONE) {
            showBase();
            lastScrollY = currentY;
            return;
        }

        // Scroll hacia abajo → ocultar
        if (delta > 0) {
            hideHeader();
        }

        // Scroll hacia arriba → mostrar glass
        if (delta < 0) {
            showGlass();
        }

        lastScrollY = currentY;
    }, { passive: true });
});



document.addEventListener('DOMContentLoaded', function () {
    // Desplazamiento suave para los enlaces de navegación
    const navLinks = document.querySelectorAll('nav a, .scroll-to-top');
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Manejador del envío del formulario
    const contactForm = document.querySelector('form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            alert('Gracias por tu mensaje. Te contactaremos pronto.');
            contactForm.reset();
        });
    }

    // Añadir animación al hacer scroll
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animar');
            }
        });
    }, observerOptions);

    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });

    // Lógica del Toggle de Precios
    const togglePrecios = document.getElementById('toggle-precios');
    const precios = document.querySelectorAll('.precio-valor');
    const periodos = document.querySelectorAll('.precio-periodo');
    const textoMensual = document.getElementById('texto-mensual');
    const textoAnual = document.getElementById('texto-anual');

    if (togglePrecios) {
        togglePrecios.addEventListener('change', function () {
            const esAnual = this.checked;

            // Actualizar opacidad de textos
            if (esAnual) {
                textoMensual.classList.add('opacity-50');
                textoAnual.classList.remove('opacity-50');
            } else {
                textoMensual.classList.remove('opacity-50');
                textoAnual.classList.add('opacity-50');
            }

            // Actualizar precios
            precios.forEach(precio => {
                // Animación simple de desvanecimiento
                precio.style.opacity = '0';
                setTimeout(() => {
                    precio.textContent = esAnual ? precio.dataset.anual : precio.dataset.mensual;
                    precio.style.opacity = '1';
                }, 200);
            });

            // Actualizar periodo (mes/año)
            periodos.forEach(periodo => {
                periodo.style.opacity = '0';
                setTimeout(() => {
                    periodo.textContent = esAnual ? 'año' : 'mes';
                    periodo.style.opacity = '1';
                }, 200);
            });
        });

        // Asegurar estado inicial correcto (por si el navegador recuerda el estado del checkbox)
        if (togglePrecios.checked) {
            textoMensual.classList.add('opacity-50');
            textoAnual.classList.remove('opacity-50');
        }
    }

    // Lógica del FAQ (Acordeón)
    // Lógica del FAQ (Acordeón)
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        // Selector actualizado para coincidir con el nuevo nombre de clase CSS
        const question = item.querySelector('.faq-pregunta-contenedor');
        const answer = item.querySelector('.faq-answer');

        // Establecer estado inicial
        if (answer) {
            answer.style.marginBottom = '3.5rem'; // mb-14 aprox (56px)
        }

        if (question && answer) {
            question.addEventListener('click', () => {
                const isOpen = answer.style.maxHeight && answer.style.maxHeight !== '0px';

                // Cerrar otros items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        const otherAnswer = otherItem.querySelector('.faq-answer');
                        if (otherAnswer) {
                            otherAnswer.style.maxHeight = '0px';
                            otherAnswer.style.marginBottom = '3.5rem'; // mb-14
                        }
                    }
                });

                // Toggle item actual
                if (isOpen) {
                    answer.style.maxHeight = '0px';
                    answer.style.marginBottom = '3.5rem'; // mb-14
                } else {
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                    answer.style.marginBottom = '0px';
                }
            });
        }
    });
});