// Arreglo temporal para guardar los planes seleccionados
let listaMantenimientos = [];

document.addEventListener("DOMContentLoaded", function() {
    inicializarCotizadorMantenimiento();
});

function inicializarCotizadorMantenimiento() {
    // 1. Manejo de clicks en los botones azules (Interruptor)
    document.addEventListener("click", function(evento) {
        const boton = evento.target.closest(".btn-mantenimiento-opcion");
        if (!boton) return;

        const servicio = boton.getAttribute("data-mantenimiento");

        if (boton.classList.contains("active")) {
            boton.classList.remove("active", "bg-primary", "text-white");
            listaMantenimientos = listaMantenimientos.filter(item => item !== servicio);
        } else {
            boton.classList.add("active", "bg-primary", "text-white");
            listaMantenimientos.push(servicio);
        }
    });

    // 2. Acción al dar clic en ACEPTAR
    const btnAceptar = document.getElementById("btnMantenimientoAceptar");
    if (btnAceptar) {
        btnAceptar.addEventListener("click", function() {
            ejecutarEnvioMantenimiento();
        });
    }
}

function ejecutarEnvioMantenimiento() {
    const totalPisos = parseInt(document.getElementById("txtMntPisos").value) || 0;
    const costoPiso = parseInt(document.getElementById("txtMntCostoPiso").value) || 0;

    if (totalPisos <= 0 || costoPiso <= 0 || listaMantenimientos.length === 0) {
        alert("Por favor, complete la cantidad de pisos, el costo base y elija al menos un plan operativo.");
        return;
    }

    // CORRECCIÓN AQUÍ: Usamos "precio_piso" idéntico a tu Java class
    let objetoEnvio = {
        pisos: totalPisos,
        precio_piso: costoPiso,
        mantenimientos: listaMantenimientos
    };

    fetch('/api/calcular-mantenimiento', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(objetoEnvio)
    })
    .then(function(respuesta) {
        return respuesta.json();
    })
    .then(function(resultadoJava) {
        renderizarCalculosMantenimiento(resultadoJava);
    })
    .catch(function(error) {
        console.error("Error al procesar el mantenimiento en el servidor:", error);
    });
}

function renderizarCalculosMantenimiento(datos) {
    document.getElementById("mantenimientoVacio").classList.add("d-none");
    document.getElementById("mantenimientoContenido").classList.remove("d-none");

    // Rellenamos usando las propiedades que tu Java devuelve
    document.getElementById("lblMntPisosTotales").innerText = datos.pisos + " pisos";
    document.getElementById("lblMntLista").innerText = datos.mantenimientos.join("\n");
    document.getElementById("lblMntTotal").innerText = "S/ " + datos.precio_total.toLocaleString('es-PE') + ".00";
}