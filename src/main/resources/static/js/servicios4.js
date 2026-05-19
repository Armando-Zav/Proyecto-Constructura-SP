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

function redirigirAContactoServicio4() {
    // 1. Capturamos los datos usando los IDs reales de tu HTML
    const elPisos = document.getElementById("lblMntPisosTotales");
    const elServicios = document.getElementById("lblMntLista");
    const elTotal = document.getElementById("lblMntTotal");

    // Control de seguridad por si algún ID se escribe mal
    if (!elPisos || !elServicios || !elTotal) {
        console.error("Error: No se encontraron los elementos en el HTML del Modal 4.");
        return;
    }

    const txtPisos = elPisos.innerText;
    const txtServicios = elServicios.innerText.split('\n').join(', ');
    const txtTotal = elTotal.innerText;

    // 2. Extraemos los números limpios para validar matemáticamente (así evitamos fallos con el "0")
    const numeroPisos = parseFloat(txtPisos.replace(/[^0-9.]/g, '')) || 0;
    const numeroTotal = parseFloat(txtTotal.replace(/[^0-9.]/g, '')) || 0;

    // 3. Validación de seguridad para asegurar que el cálculo ya se realizó
    if (numeroTotal === 0 || numeroPisos === 0 || txtPisos.includes("undefined")) {
        alert("Por favor, calcule primero el presupuesto operativo antes de solicitar el servicio.");
        return;
    }

    // 4. Armamos la cadena con el formato ideal para tu nuevo formulario de contacto
    const mensajeFormateado = `Hola, deseo contratar el servicio de Gestión Operativa y Mantenimiento. \n- Dimensión: ${txtPisos} \n- Planes incluidos: ${txtServicios} \n- Total Mensual Estimado: ${txtTotal}`;

    // 5. Guardamos en el almacenamiento local y mandamos a la página de contacto
    localStorage.setItem("servicio_pendiente", mensajeFormateado);
    window.location.href = "/contactanos";
}