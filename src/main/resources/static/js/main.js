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