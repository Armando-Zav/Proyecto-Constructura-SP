// Esperamos a que todo el HTML termine de cargar en el navegador
document.addEventListener("DOMContentLoaded", function () {
    verificarCotizacionPendiente();
    configurarEventosModales(); // Inicializamos los escuchadores de los botones de los modales
});

// Variables globales para controlar las instancias de los modales de Bootstrap
let bModalDecision;
let bModalPagoQR;

/**
 * INICIALIZA LOS EVENTOS DE LOS MODALES
 */
function configurarEventosModales() {
    // Vinculamos los elementos HTML a las instancias de Bootstrap
    bModalDecision = new bootstrap.Modal(document.getElementById('modalDecision'));
    bModalPagoQR = new bootstrap.Modal(document.getElementById('modalPagoQR'));

    // ACCIÓN 1: El usuario presiona "Solo Información"
    document.getElementById("btnSoloInformacion").addEventListener("click", function () {
        bModalDecision.hide(); // Cerramos el modal de decisión
        ejecutarEnvioBackend("SOLO INFORMACION"); // Enviamos los datos directamente
    });

    // ACCIÓN 2: El usuario presiona "Pasar a Pagar"
    document.getElementById("btnPagarServicio").addEventListener("click", function () {
        bModalDecision.hide(); // Cerramos el modal de decisión
        bModalPagoQR.show();   // Abrimos el modal con el código QR de inmediato
        ejecutarEnvioBackend("CLIENTE DESEA PAGAR"); // Enviamos los datos registrando su intención de pago
    });
}

/**
 * 1. AUTO-RELLENAR EL FORMULARIO
 * Detecta qué servicio viene del localStorage y lo mapea al select correcto
 */
function verificarCotizacionPendiente() {
    const cotizacionGuardada = localStorage.getItem("servicio_pendiente");

    if (cotizacionGuardada) {
        const textareaMensaje = document.getElementById("txtContactoMensaje");
        if (textareaMensaje) {
            textareaMensaje.value = cotizacionGuardada;

            const selectServicio = document.getElementById("selectContactoServicio");
            if (selectServicio) {
                const textoMinuscula = cotizacionGuardada.toLowerCase();

                console.log("Texto recuperado para filtrar:", textoMinuscula);

                if (textoMinuscula.includes("inmueble") || textoMinuscula.includes("proyecto") || textoMinuscula.includes("estimado") || textoMinuscula.includes("cotizado")) {
                    selectServicio.value = "servicio1";
                }
                else if (textoMinuscula.includes("construcción") || textoMinuscula.includes("remodelación") || textoMinuscula.includes("diseño")) {
                    selectServicio.value = "servicio2";
                }
                else if (textoMinuscula.includes("auditoría") || textoMinuscula.includes("inspección")) {
                    selectServicio.value = "servicio3";
                }
                else if (textoMinuscula.includes("gestión operativa") || textoMinuscula.includes("mantenimiento") || textoMinuscula.includes("pisos")) {
                    selectServicio.value = "servicio4";
                }
            }
            localStorage.removeItem("servicio_pendiente");
        }
    }
}

/**
 * 2. VALIDACIÓN INICIAL DEL FORMULARIO
 * Se ejecuta al presionar "Enviar Mensaje" en la interfaz principal.
 */
function enviarFormularioAJava() {
    const nombre = document.getElementById("txtContactoNombre").value.trim();
    const apellido = document.getElementById("txtContactoApellido").value.trim();
    const correo = document.getElementById("txtContactoCorreo").value.trim();
    const telefono = document.getElementById("txtContactoTelefono").value.trim();
    const servicio = document.getElementById("selectContactoServicio").value;
    const mensaje = document.getElementById("txtContactoMensaje").value.trim();
    const acuerdo = document.getElementById("acuerdo").checked;

    // Validamos campos obligatorios antes de mostrar modales
    if (!nombre || !apellido || !correo || !telefono || !servicio || !mensaje) {
        alert("Por favor, complete todos los campos obligatorios del formulario.");
        return;
    }

    if (!acuerdo) {
        alert("Debe aceptar los términos y condiciones de privacidad para poder enviar su mensaje.");
        return;
    }

    // INTERCEPCIÓN EXITOSA: Si todo es válido, abrimos el Modal de decisión en lugar de enviar directo
    bModalDecision.show();
}

/**
 * 3. TRANSMISIÓN DE DATOS HACIA SPRING BOOT
 * Se encarga del fetch definitivo agregando la etiqueta de intención elegida por el usuario
 */
function ejecutarEnvioBackend(intencionUsuario) {
    const nombre = document.getElementById("txtContactoNombre").value.trim();
    const apellido = document.getElementById("txtContactoApellido").value.trim();
    const correo = document.getElementById("txtContactoCorreo").value.trim();
    const telefono = document.getElementById("txtContactoTelefono").value.trim();
    const servicio = document.getElementById("selectContactoServicio").value;
    const mensaje = document.getElementById("txtContactoMensaje").value.trim();

    // Estructuramos el JSON limpio con el nuevo campo mapeado a Java
    const objetoContacto = {
        nombre: `${nombre} ${apellido}`,
        correo: correo,
        telefono: telefono,
        servicio: servicio, // <--- ¡Añade esta línea! (Debe llamarse igual que en tu clase Contacto.java)
        mensaje: mensaje,   // <--- Puedes quitar el [ID SERVICIO...] de aquí si quieres que el mensaje quede limpio
        intencion: intencionUsuario
    };

    console.log("Despachando JSON estructurado a Java:", objetoContacto);

    fetch('/api/enviar-contacto', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(objetoContacto)
    })
        .then(function (respuesta) {
            if (!respuesta.ok) {
                throw new Error("Error en el servidor (Código: " + respuesta.status + ")");
            }
            return respuesta.json();
        })
        .then(function (data) {
            // Si eligió solo información, notificamos el éxito clásico al limpiar
            if (intencionUsuario === "SOLO INFORMACION") {
                alert(data.mensaje || "¡Mensaje enviado con éxito! Un asesor se contactará contigo pronto.");
            } else {
                console.log("Datos de contacto guardados en paralelo al flujo de pago.");
            }

            // Reseteamos el formulario principal de contactos
            document.getElementById("formContacto").reset();
        })
        .catch(function (error) {
            console.error("Error crítico en proceso Fetch:", error);
            alert("Hubo un contratiempo al procesar el envío de datos de contacto.");
        });
}