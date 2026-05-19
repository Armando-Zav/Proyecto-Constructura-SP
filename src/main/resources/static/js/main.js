document.addEventListener('DOMContentLoaded', () => {

    /* Menu burger  */
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const icon = navToggle?.querySelector('i');

    navToggle?.addEventListener('click', () => {
        navMenu.classList.toggle('show');

        if (navMenu.classList.contains('show')) {
            icon?.classList.remove('fa-bars');
            icon?.classList.add('fa-times');
        } else {
            icon?.classList.remove('fa-times');
            icon?.classList.add('fa-bars');
        }
    });

    /* Scroll-up */
    const scrollBtn = document.getElementById('scrollUp');

    if (scrollBtn) {
        window.addEventListener('scroll', () => {
            scrollBtn.style.display = window.scrollY > 300 ? 'flex' : 'none';
        });

        scrollBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    const contactForm = document.getElementById('contactFormModal');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Evita que la página se recargue

            const nombre = document.getElementById('modal-name').value;
            const email = document.getElementById('modal-email').value;
            const asunto = document.getElementById('modal-subject').value;
            const mensaje = document.getElementById('modal-message').value;

            console.log('Datos capturados:', { nombre, email, asunto, mensaje });

            const modalElement = document.getElementById('modalContacto');
            const modalInstance = bootstrap.Modal.getInstance(modalElement);
            if (modalInstance) {
                modalInstance.hide();
            }

            this.reset();
            alert('Gracias ' + nombre + ', hemos recibido tu mensaje. Nos contactaremos pronto.');
        });
    }
});

// ==========================================================
// SCRIPT DE REDIRECCIÓN Y APERTURA AUTOMÁTICA DE MODALES
// ==========================================================

/**
 * Función 1: Se ejecuta en el index.html al darle clic al botón verde.
 * Guarda la directiva en memoria y redirige.
 */
function irACotizarServicio(idModalServicio) {
    // Guardamos qué modal queremos abrir
    localStorage.setItem("abrir_modal_pendiente", idModalServicio);
    
    // Redirigimos a la página de servicios (usa "servicios.html" si trabajas con archivos planos)
    window.location.href = "servicios.html"; 
}

/**
 * Función 2: Se ejecuta automáticamente al cargar cualquier página.
 * Su única chamba es verificar si estamos en servicios y si hay un modal pendiente.
 */
// ==========================================================
// SCRIPT DE REDIRECCIÓN Y APERTURA AUTOMÁTICA DE MODALES
// ==========================================================

/**
 * Función 1: Se ejecuta en el index al hacer clic en "Cotizar Servicio"
 * Guarda la directiva en el navegador y redirige mediante el controlador de Spring Boot.
 */
function irACotizarServicio(idModalServicio) {
    // Guardamos qué modal queremos abrir
    localStorage.setItem("abrir_modal_pendiente", idModalServicio);
    
    // CORRECCIÓN SPRING BOOT: Apuntamos al request mapping del Controller, NO al archivo físico
    window.location.href = "/servicios"; 
}

/**
 * Función 2: Verifica si el usuario llegó con una orden de apertura
 */
function verificarYMostrarModalPendiente() {
    const modalPendiente = localStorage.getItem("abrir_modal_pendiente");
    
    if (modalPendiente) {
        let idModalReal = "";

        // =========================================================================
        // MAPEO DE IDS REALES EN TU PÁGINA DE SERVICIOS (Ajustado según tus consolas)
        // =========================================================================
        if (modalPendiente === "modal1") {
            idModalReal = "#modalCasaMultisegura"; 
        } 
        else if (modalPendiente === "modal2") {
            idModalReal = "#modalObrasEspeciales"; 
        } 
        else if (modalPendiente === "modal3") {
            // ID Real extraído de tu captura del modal de Inspección (image_053dcb.jpg)
            idModalReal = "#modalInspeccionCalidad"; 
        } 
        else if (modalPendiente === "modal4") {
            // ID Real extraído de tu captura del modal de Gestión Operativa (image_05452c.png)
            idModalReal = "#modalAdministrativoMantenimiento"; 
        }       

        // Esperamos los 300ms obligatorios para que Spring Boot y Bootstrap se asienten en el cliente
        setTimeout(function () {
            if (idModalReal) {
                const miModalElemento = document.querySelector(idModalReal);
                if (miModalElemento) {
                    // Instanciamos y abrimos el modal de Bootstrap de manera segura
                    const modalBootstrap = new bootstrap.Modal(miModalElemento);
                    modalBootstrap.show();
                    console.log("🚀 Modal abierto con éxito:", idModalReal);
                } else {
                    console.error("⚠️ Error: No se encontró en el HTML el modal con ID:", idModalReal);
                }
            }
            // Limpieza inmediata de memoria para evitar que se vuelva a abrir al recargar la página
            localStorage.removeItem("abrir_modal_pendiente");
        }, 300);
    }
}

// 🚀 DISPARADOR AUTOMÁTICO DE CARGA
// Cada vez que cambies de vista, main.js revisará si hay tareas pendientes en memoria
document.addEventListener("DOMContentLoaded", function () {
    verificarYMostrarModalPendiente();
});