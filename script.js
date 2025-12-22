// JavaScript Personalizado para la Landing Page de Academia Navegatel


document.addEventListener('DOMContentLoaded', () => {
    // ===============================
    // REFERENCIAS
    // ===============================

    const header = document.getElementById('site-header');
    if (!header) return;

    let lastScrollY = window.scrollY;
    let downScrollAccumulated = 0;

    // ===============================
    // VALORES AJUSTABLES (SAFE)
    // ===============================

    /*
      HIDE_DISTANCE
      ----------------
      Cuántos píxeles de scroll HACIA ABAJO consecutivos
      necesita el usuario para que el header se oculte.

      RANGOS RECOMENDADOS:
      - 0   → se oculta inmediatamente (más agresivo)
      - 40  → rápido
      - 80  → equilibrado (recomendado)
      - 120 → conservador

      Nota:
      Aunque sea 0, seguimos usando acumulación para
      evitar micro-scrolls.
    */
    const HIDE_DISTANCE = 0;

    /*
      HIDE_TRANSLATE_CLASS
      --------------------
      Cuánto se desplaza el header hacia arriba al ocultarse.

    */
    const HIDE_TRANSLATE_CLASS = '-translate-y-full';

    /*
      TOP_THRESHOLD
      -------------
      Zona superior donde el header sigue siendo "base"
      (transparente, integrado en el hero).

      RANGOS RECOMENDADOS:
      - 0   → cambio inmediato
      - 10  → muy sensible
      - 20  → equilibrado (recomendado)
      - 40  → transición más larga
    */
    const TOP_THRESHOLD = 20;

    // ===============================
    // ESTADOS VISUALES
    // ===============================

    // Header visible en modo lectura (blanco + sombra)
    const showHeader = () => {
        header.classList.remove(HIDE_TRANSLATE_CLASS);
        header.classList.remove('opacity-0');
        header.classList.add('bg-white', 'shadow-md');
    };

    // Header ocultándose hacia arriba (SIN opacity)
    const hideHeader = () => {
        header.classList.add(HIDE_TRANSLATE_CLASS);
    };

    // Header base (solo permitido en top)
    const resetHeader = () => {
        header.classList.remove(
            HIDE_TRANSLATE_CLASS,
            'opacity-0',
            'bg-white',
            'shadow-md'
        );
    };

    // ===============================
    // ESTADO INICIAL
    // ===============================

    // Si recargas la página NO arriba del todo,
    // arrancamos directamente en modo lectura
    if (window.scrollY > TOP_THRESHOLD) {
        showHeader();
    }

    // ===============================
    // SCROLL
    // ===============================

    window.addEventListener('scroll', () => {
        const currentY = window.scrollY;
        const delta = currentY - lastScrollY;

        // -------------------------------
        // ZONA SUPERIOR (estado base)
        // -------------------------------
        if (currentY <= TOP_THRESHOLD) {
            resetHeader();
            downScrollAccumulated = 0;
            lastScrollY = currentY;
            return;
        }

        // -------------------------------
        // SCROLL HACIA ABAJO
        // -------------------------------
        if (delta > 0) {
            downScrollAccumulated += delta;

            /*
              PROTECCIÓN CLAVE:
              En cuanto salimos del top,
              FORZAMOS modo lectura antes de ocultar,
              para que nunca se oculte transparente.
            */
            showHeader();

            if (downScrollAccumulated >= HIDE_DISTANCE) {
                hideHeader();
            }
        }

        // -------------------------------
        // SCROLL HACIA ARRIBA
        // -------------------------------
        if (delta < 0) {
            downScrollAccumulated = 0;
            showHeader();
        }

        lastScrollY = currentY;
    }, { passive: true });
});

  
  
  
  
  
  
  




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