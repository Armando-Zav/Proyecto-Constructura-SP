document.addEventListener('DOMContentLoaded', () => {
    const errorMessage = document.getElementById('errorMessage');

    // Leemos los parámetros de la URL actual
    const urlParams = new URLSearchParams(window.location.search);

    // Spring Security, cuando falla el login, redirige por defecto a "?error"
    if (urlParams.has('error')) {
        // Si detectamos el error en la URL, mostramos la alerta quitando el 'd-none' de Bootstrap
        errorMessage.classList.remove('d-none');
    }
    
    // Si el usuario vuelve a escribir, podemos ocultar el error para que quede más limpio
    const inputs = document.querySelectorAll('.login-input');
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            errorMessage.classList.add('d-none');
        });
    });
});