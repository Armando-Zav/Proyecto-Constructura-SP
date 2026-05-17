// 1. VARIABLE GLOBAL (Aquí se guardarán las casas que vengan de Spring Boot)
let listaPropiedades = [];

// 2. INCIO: Lo primero que hacemos al cargar la página es pedir los datos
document.addEventListener("DOMContentLoaded", function() {
    pedirPropiedadesAlServidor();
});

// 3. CONEXIÓN CON JAVA RESTCONTROLLER
function pedirPropiedadesAlServidor() {
    fetch('/api/propiedades')
        .then(function(respuesta) {
            return respuesta.json();
        })
        .then(function(datosRecibidos) {
            // Mapeamos asegurando que coincida con las variables exactas de tu clase SecPrecios
            listaPropiedades = datosRecibidos.map(function(item) {
                return {
                    nombre: item.nombre,
                    precio: parseInt(item.precio),
                    tipo: item.tipo,
                    ubicacion: item.ubicacion,
                    metrosCuadrados: parseInt(item.metros_cuadrados), // Con guion bajo como en Java
                    precioCasa: parseInt(item.precio_casa)           // Con guion bajo como en Java
                };
            });
            console.log("Casas cargadas con éxito desde la API:", listaPropiedades);
            
            // ¡REGLA DE ORO! Recién cuando los datos están en el navegador, activamos los filtros
            activarEscuchadoresDeFiltros();
            
            // Ejecutamos una primera búsqueda automática por si ya hay datos seleccionados
            filtrarOpciones();
        })
        .catch(function(error) {
            console.error("Hubo un problema al conectar con ServiciosRestController:", error);
        });
}

// 4. ESCUCHADORES DE EVENTOS
function activarEscuchadoresDeFiltros() {
    const selectUbicacion = document.getElementById("selectUbicacion");
    const inputMetros = document.getElementById("inputMetros");

    // Detectar cuando el usuario cambia de distrito (San Borja / SJL)
    selectUbicacion.addEventListener("change", function() {
        filtrarOpciones();
    });

    // Detectar cuando el usuario escribe o borra en los metros cuadrados
    inputMetros.addEventListener("input", function() {
        filtrarOpciones();
    });
}

// 5. FUNCIÓN DE FILTRADO (Tu regla de negocio: m² menores o iguales)
function filtrarOpciones() {
    const ubicacionSeleccionada = document.getElementById("selectUbicacion").value;
    const metrosMaximos = parseInt(document.getElementById("inputMetros").value) || 0;
    const contenedorLista = document.getElementById("listaOpcionesContenedor");

    // Si el usuario todavía no elige una ubicación, dejamos el mensaje de espera de tu diseño
    if (!ubicacionSeleccionada || ubicacionSeleccionada === "") {
        contenedorLista.innerHTML = `<p class="text-center text-muted py-4 m-0">Elija la ubicación y m² para listar las opciones.</p>`;
        return;
    }

    // Filtramos el array basándonos en lo que ingresó el usuario
    let filtrados = listaPropiedades.filter(function(casa) {
        // Comparamos ignorando mayúsculas/minúsculas para evitar errores de escritura
        const coincideUbicacion = casa.ubicacion.toLowerCase() === ubicacionSeleccionada.toLowerCase();
        
        // Aplicamos tu regla estricta: metros reales de la casa <= metros indicados por el usuario
        if (metrosMaximos > 0) {
            return coincideUbicacion && (casa.metrosCuadrados <= metrosMaximos);
        }
        
        return coincideUbicacion; // Si dejó el cuadro de m² vacío, muestra todas las de esa zona
    });

    // Pasamos el resultado al dibujador visual
    renderizarListaIzquierda(filtrados);
}

// 6. DIBUJAR LA LISTA EN EL PANEL IZQUIERDO
function renderizarListaIzquierda(lista) {
    const contenedorLista = document.getElementById("listaOpcionesContenedor");
    contenedorLista.innerHTML = ""; // Limpiamos los mensajes anteriores

    // Si los filtros descartaron todas las casas de prueba
    if (lista.length === 0) {
        const m2Ingresados = document.getElementById("inputMetros").value || 0;
        contenedorLista.innerHTML = `<p class="text-center text-muted py-3 m-0">No hay opciones de ${m2Ingresados}m² o menos en esta zona.</p>`;
        return;
    }

    // Si encontramos coincidencias, creamos las cajitas interactivas de Bootstrap
    lista.forEach(function(casa) {
        const item = document.createElement("div");
        item.className = "p-3 mb-2 border rounded d-flex justify-content-between align-items-center opcion-predio";
        item.style.cursor = "pointer";
        item.style.transition = "background-color 0.2s";
        item.innerHTML = `
            <div>
                <h6 class="mb-0 fw-bold text-dark">${casa.nombre}</h6>
                <small class="text-muted">Área: ${casa.metrosCuadrados} m² | Tipo: ${casa.tipo}</small>
            </div>
            <span class="badge bg-warning text-dark fw-bold">Seleccionar</span>
        `;

        // Efecto visual hover manual
        item.addEventListener("mouseenter", function() { item.classList.add("bg-light"); });
        item.addEventListener("mouseleave", function() { if(!item.classList.contains("border-warning")) item.classList.remove("bg-light"); });

        // Evento clic: Muestra el detalle completo a la derecha al presionarlo
        item.addEventListener("click", function() {
            document.querySelectorAll('.opcion-predio').forEach(function(el) {
                el.classList.remove('bg-light', 'border-warning');
            });
            item.classList.add('bg-light', 'border-warning');
            
            mostrarDatosDerecha(casa);
        });

        contenedorLista.appendChild(item);
    });
}

// 7. MOSTRAR DATOS EN EL PANEL DERECHO
function mostrarDatosDerecha(casa) {
    document.getElementById("panelDerechoVacio").classList.add("d-none");
    document.getElementById("panelDerechoContenido").classList.remove("d-none");

    // 1. Aseguramos que el precio de la casa sea un número válido
    // Intentamos leer 'precioCasa' o 'precio_casa' por si viene con guion bajo desde la API
    let precioFinalCalculado = casa.precioCasa || casa.precio_casa;

    // Si por alguna razón da undefined o no existe, lo calculamos manualmente al instante como respaldo
    if (!precioFinalCalculado) {
        precioFinalCalculado = parseInt(casa.precio) * parseInt(casa.metrosCuadrados);
    }

    // 2. Inyectamos los textos en las etiquetas correspondientes
    document.getElementById("txtNombre").innerText = casa.nombre;
    document.getElementById("txtUbicacion").innerText = casa.ubicacion;
    document.getElementById("txtTipo").innerText = casa.tipo;
    document.getElementById("txtPrecioBase").innerText = "S/ " + parseInt(casa.precio).toLocaleString('es-PE');
    document.getElementById("txtMetros").innerText = casa.metrosCuadrados + " m²";
    
    // 3. Pintamos el Precio Final formateado correctamente sin errores de NaN
    document.getElementById("txtPrecioCasa").innerText = "S/ " + precioFinalCalculado.toLocaleString('es-PE');
}