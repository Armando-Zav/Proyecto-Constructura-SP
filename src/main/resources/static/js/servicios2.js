// Variable global para almacenar el servicio
let servicioSeleccionado = "";

document.addEventListener("DOMContentLoaded", function () {
    inicializarCotizadorObras();
});

function inicializarCotizadorObras() {
    const inputMetros = document.getElementById("txtObrasMetros");
    const inputPrecioM2 = document.getElementById("txtObrasPrecioM2");

    // Escucha de entradas de texto tradicionales
    inputMetros.addEventListener("input", ejecutarCalculoServicio);
    inputPrecioM2.addEventListener("input", ejecutarCalculoServicio);

    // DELEGACIÓN GLOBAL: Escuchamos el clic en todo el documento
    document.addEventListener("click", function (evento) {
        // Buscamos si el elemento clickeado (o su icono interno) tiene la clase del botón
        const boton = evento.target.closest(".btn-servicio-opcion");

        // Si el clic no fue en uno de tus botones azules, ignoramos el evento
        if (!boton) return;

        console.log("¡Clic detectado con éxito mediante delegación global!");

        // 1. Capturamos todos los botones para limpiar los estilos visuales
        const todosLosBotones = document.querySelectorAll(".btn-servicio-opcion");
        todosLosBotones.forEach(function (b) {
            b.classList.remove("active", "bg-primary", "text-white");
        });

        // 2. Activamos el diseño azul fuerte en el botón presionado
        boton.classList.add("active", "bg-primary", "text-white");

        // 3. Extraemos el atributo data-servicio
        servicioSeleccionado = boton.getAttribute("data-servicio");
        console.log("Servicio activo:", servicioSeleccionado);

        // 4. Forzamos el cálculo analítico
        ejecutarCalculoServicio();
    });
}

function ejecutarCalculoServicio() {
    const metros = parseInt(document.getElementById("txtObrasMetros").value) || 0;
    const precioM2 = parseInt(document.getElementById("txtObrasPrecioM2").value) || 0;

    // Si falta alguno de los 3 datos clave, el panel derecho se queda en espera
    if (metros <= 0 || precioM2 <= 0 || servicioSeleccionado === "") {
        document.getElementById("obrasVacio").classList.remove("d-none");
        document.getElementById("obrasContenido").classList.add("d-none");
        return;
    }

    // Objeto estructurado para enviar a Spring Boot
    let datosEnvio = {
        servicio: servicioSeleccionado,
        metros_cuadrados: metros,
        precio_metro_cuadrado: precioM2
    };

    fetch('/api/calcular-servicio', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datosEnvio)
    })
        .then(function (respuesta) {
            return respuesta.json();
        })
        .then(function (resultadoJava) {
            actualizarPanelResultados(resultadoJava);
        })
        .catch(function (error) {
            console.error("Error al conectar con el backend de Spring Boot:", error);
        });
}

function actualizarPanelResultados(datos) {
    document.getElementById("obrasVacio").classList.add("d-none");
    document.getElementById("obrasContenido").classList.remove("d-none");

    document.getElementById("lblResumenServicio").innerText = "Proyecto: " + datos.servicio;
    document.getElementById("lblResumenMetros").innerText = datos.metros_cuadrados + " m²";
    document.getElementById("lblResumenCostoM2").innerText = "S/ " + datos.precio_metro_cuadrado.toLocaleString('es-PE') + " por m²";
    document.getElementById("lblResumenTotal").innerText = "S/ " + datos.precio_casa.toLocaleString('es-PE');
}