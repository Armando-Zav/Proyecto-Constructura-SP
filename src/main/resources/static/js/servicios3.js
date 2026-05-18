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