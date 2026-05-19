// Arreglo global para almacenar múltiples selecciones de servicios
let evaluacionesSeleccionadas = [];

document.addEventListener("DOMContentLoaded", function() {
    inicializarCotizadorInspeccion();
});

function inicializarCotizadorInspeccion() {
    // Escucha de clicks usando delegación para el encendido/apagado de los botones azules
    document.addEventListener("click", function(evento) {
        const boton = evento.target.closest(".btn-inspeccion-opcion");
        if (!boton) return;

        const valorServicio = boton.getAttribute("data-evaluacion");

        // Si ya estaba seleccionado, lo quitamos; si no, lo agregamos (Manejo Múltiple)
        if (boton.classList.contains("active")) {
            boton.classList.remove("active", "bg-primary", "text-white");
            // Eliminar del arreglo global
            evaluacionesSeleccionadas = evaluacionesSeleccionadas.filter(item => item !== valorServicio);
        } else {
            boton.classList.add("active", "bg-primary", "text-white");
            // Añadir al arreglo global
            evaluacionesSeleccionadas.push(valorServicio);
        }
        console.log("Selección actual de inspecciones:", evaluacionesSeleccionadas);
    });

    // Escucha del botón Naranja "Aceptar" para lanzar el cálculo
    const btnAceptar = document.getElementById("btnInspeccionAceptar");
    if (btnAceptar) {
        btnAceptar.addEventListener("click", function() {
            procesarCalculoInspeccion();
        });
    }
}

function procesarCalculoInspeccion() {
    const metros = parseInt(document.getElementById("txtInspeccionMetros").value) || 0;
    const precioM2 = parseInt(document.getElementById("txtInspeccionPrecioM2").value) || 0;

    // Validación básica antes de mandar los datos a Spring Boot
    if (metros <= 0 || precioM2 <= 0 || evaluacionesSeleccionadas.length === 0) {
        alert("Por favor, ingrese los m², el precio base y seleccione al menos una evaluación.");
        return;
    }

    // Armamos el objeto JSON respetando los atributos exactos de SerPrecio3.java
    let datosFormulario = {
        metros_cuadrados: metros,
        precio_metro_cuadrado: precioM2,
        evaluaciones: evaluacionesSeleccionadas
    };

    // Envío POST asíncrono directo al nuevo endpoint
    fetch('/api/calcular-inspeccion', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datosFormulario)
    })
    .then(function(respuesta) {
        return respuesta.json();
    })
    .then(function(resultadoJava) {
        mostrarResultadosInspeccion(resultadoJava);
    })
    .catch(function(error) {
        console.error("Error al conectar con el backend de Inspecciones:", error);
    });
}

function mostrarResultadosInspeccion(datos) {
    // Intercambiamos visibilidad en el panel derecho (Amarillo)
    document.getElementById("inspeccionVacio").classList.add("d-none");
    document.getElementById("inspeccionContenido").classList.remove("d-none");

    // Inyectamos la información del objeto de retorno de Java
    document.getElementById("lblInspMetros").innerText = datos.metros_cuadrados + " m²";
    
    // Mostramos los servicios seleccionados uno debajo del otro
    document.getElementById("lblInspServicios").innerText = datos.evaluaciones.join("\n");
    
    // Pintamos el precio final de la auditoría técnica calculada
    document.getElementById("lblInspTotal").innerText = "S/ " + datos.precio_casa.toLocaleString('es-PE');
}

function redirigirAContactoServicio3() {
    // 1. Capturamos los elementos de la interfaz
    const txtMetros = document.getElementById("lblInspMetros").innerText;
    const txtServicios = document.getElementById("lblInspServicios").innerText.split('\n').join(', ');
    const txtTotal = document.getElementById("lblInspTotal").innerText;

    // 2. Extraemos los números ignorando letras y símbolos (S/, m², comas)
    const numeroMetros = parseFloat(txtMetros.replace(/[^0-9.]/g, '')) || 0;
    const numeroTotal = parseFloat(txtTotal.replace(/[^0-9.]/g, '')) || 0;

    // 3. Validación matemática real e infalible
    if (numeroTotal === 0 || numeroMetros === 0) {
        alert("Por favor, configure las opciones y haga clic en 'Aceptar' antes de solicitar el servicio.");
        return;
    }

    // Armamos la cadena con palabras clave exactas para tu nuevo formulario
    const mensajeFormateado = `Hola, deseo contratar el servicio de Auditoría e Inspección Técnica. \n- Área: ${txtMetros} \n- Evaluaciones selectas: ${txtServicios} \n- Presupuesto estimado: ${txtTotal}`;

    localStorage.setItem("servicio_pendiente", mensajeFormateado);
    window.location.href = "/contactanos"; 
}