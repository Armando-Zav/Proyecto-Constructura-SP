// Esperamos a que todo el HTML termine de cargar en el navegador
document.addEventListener("DOMContentLoaded", function() {
    verificarCotizacionPendiente();
});

/**
 * 1. AUTO-RELLENAR EL FORMULARIO
 * Detecta qué servicio viene del localStorage y lo mapea al select correcto
 */
function verificarCotizacionPendiente() {
    const cotizacionGuardada = localStorage.getItem("servicio_pendiente");
    
    if (cotizacionGuardada) {
        const textareaMensaje = document.getElementById("txtContactoMensaje");
        if (textareaMensaje) {
            // 1. Insertamos el texto en el textarea
            textareaMensaje.value = cotizacionGuardada;
            
            const selectServicio = document.getElementById("selectContactoServicio");
            if (selectServicio) {
                // Pasamos todo a minúsculas para evitar problemas con tildes o mayúsculas
                const textoMinuscula = cotizacionGuardada.toLowerCase();
                
                console.log("Texto recuperado para filtrar:", textoMinuscula);

                // 2. Filtro estricto de coincidencia por servicio
                if (textoMinuscula.includes("inmueble") || textoMinuscula.includes("proyecto") || textoMinuscula.includes("estimado") || textoMinuscula.includes("cotizado")) {
                    console.log("Coincidencia encontrada: Activando servicio1");
                    selectServicio.value = "servicio1"; 
                } 
                else if (textoMinuscula.includes("construcción") || textoMinuscula.includes("remodelación") || textoMinuscula.includes("diseño")) {
                    console.log("Coincidencia encontrada: Activando servicio2");
                    selectServicio.value = "servicio2";
                } 
                else if (textoMinuscula.includes("auditoría") || textoMinuscula.includes("inspección")) {
                    console.log("Coincidencia encontrada: Activando servicio3");
                    selectServicio.value = "servicio3"; 
                } 
                else if (textoMinuscula.includes("gestión operativa") || textoMinuscula.includes("mantenimiento") || textoMinuscula.includes("pisos")) {
                    console.log("Coincidencia encontrada: Activando servicio4");
                    selectServicio.value = "servicio4"; 
                }
            }
            
            // 3. Borramos el localStorage para que quede limpio
            localStorage.removeItem("servicio_pendiente");
        }
    }
}

/**
 * 2. ENVIAR LOS DATOS A SPRING BOOT (POST JSON)
 * Lee los campos actuales del nuevo formulario
 */
function enviarFormularioAJava() {
    // Capturamos los campos disponibles en tu nuevo HTML
    const nombre = document.getElementById("txtContactoNombre").value.trim();
    const apellido = document.getElementById("txtContactoApellido").value.trim();
    const correo = document.getElementById("txtContactoCorreo").value.trim();
    const telefono = document.getElementById("txtContactoTelefono").value.trim();
    const servicio = document.getElementById("selectContactoServicio").value;
    const mensaje = document.getElementById("txtContactoMensaje").value.trim();
    const acuerdo = document.getElementById("acuerdo").checked;

    // Validamos que ningún campo esté vacío
    if (!nombre || !apellido || !correo || !telefono || !servicio || !mensaje) {
        alert("Por favor, complete todos los campos obligatorios del formulario.");
        return;
    }

    if (!acuerdo) {
        alert("Debe aceptar los términos y condiciones de privacidad para poder enviar su mensaje.");
        return;
    }

    // Estructuramos el objeto JSON tal cual lo espera tu controlador de Java
    const objetoContacto = {
        nombre: `${nombre} ${apellido}`, // Concatenamos Nombre + Apellido
        correo: correo,
        telefono: telefono,
        mensaje: `[ID SERVICIO SELECCIONADO: ${servicio}]\n\n${mensaje}`
    };

    console.log("Enviando JSON a Spring Boot:", objetoContacto);

    // Petición Fetch hacia tu backend
    fetch('/api/enviar-contacto', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(objetoContacto)
    })
    .then(function(respuesta) {
        if (!respuesta.ok) {
            throw new Error("Error en el servidor (Código: " + respuesta.status + ")");
        }
        return respuesta.json();
    })
    .then(function(data) {
        alert(data.mensaje || "¡Mensaje enviado con éxito!");
        // Limpiamos el formulario usando el ID correcto
        document.getElementById("formContacto").reset();
    })
    .catch(function(error) {
        console.error("Error en Fetch:", error);
        alert("Hubo un problema al procesar el envío. Por favor, inténtelo de nuevo.");
    });
}