// JavaScript Personalizado para la Landing Page de Academia Navegatel

document.addEventListener('DOMContentLoaded', function () {
    // Desplazamiento suave para los enlaces de navegación
    const navLinks = document.querySelectorAll('nav a');
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
});