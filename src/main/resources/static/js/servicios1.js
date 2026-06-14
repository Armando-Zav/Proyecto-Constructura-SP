// Memoria local del navegador para guardar la lista completa que viene de Java
let todasLasPropiedades = [];

document.addEventListener("DOMContentLoaded", function() {
    cargarPropiedadesDesdeJava();
});

// 1. LLAMADA AL RESTCONTROLLER (Se ejecuta una sola vez al abrir la página)
function cargarPropiedadesDesdeJava() {
    fetch('/api/propiedades') // Tu endpoint exacto del @GetMapping
        .then(function(respuesta) {
            return respuesta.json();
        })
        .then(function(datos) {
            todasLasPropiedades = datos;
            console.log("Propiedades cargadas con éxito desde Java:", todasLasPropiedades);
            
            // Inicializamos los eventos de escucha una vez que tenemos la data
            configurarFiltros();
        })
        .catch(function(error) {
            console.error("Error al traer las propiedades del RestController:", error);
        });
}

// 2. CONFIGURAR LOS FILTROS DE LA UI
function configurarFiltros() {
    const selectUbicacion = document.getElementById("selectUbicacion");
    const inputMetros = document.getElementById("inputMetros");

    // Cada vez que cambie el distrito o escriban m², filtramos y redibujamos la lista izquierda
    if (selectUbicacion) selectUbicacion.addEventListener("change", filtrarYMostrarPropiedades);
    if (inputMetros) inputMetros.addEventListener("input", filtrarYMostrarPropiedades);

    // Escuchador global de clics para atrapar el botón amarillo "Seleccionar"
    document.addEventListener("click", function(evento) {
        const botonSeleccionar = evento.target.closest(".btn-seleccionar-propiedad");
        if (!botonSeleccionar) return;

        // Recuperamos el índice del elemento guardado en el atributo data-index
        const indice = parseInt(botonSeleccionar.getAttribute("data-index"));
        const propiedadElegida = todasLasPropiedades[indice];

        if (propiedadElegida) {
            renderizarPanelDerecho(propiedadElegida);
        }
    });
}

// 3. FILTRAR EN VIVO LAS OPCIONES DE LA IZQUIERDA
function filtrarYMostrarPropiedades() {
    const ubicacionSeleccionada = document.getElementById("selectUbicacion").value;
    const metrosMaximos = parseInt(document.getElementById("inputMetros").value) || 0;
    const contenedorLista = document.getElementById("listaOpcionesContenedor");

    // Si aún no se selecciona ubicación, mantenemos el mensaje base
    if (!ubicacionSeleccionada) {
        contenedorLista.innerHTML = `<p class="text-center text-muted py-4 m-0">Elija la ubicación y m² para listar las opciones.</p>`;
        return;
    }

    // Filtramos el array local comparando con los campos de tu objeto Java
    // ubicacion -> getUbicacion(), metros_cuadrados -> getMetros_cuadrados()
    const propiedadesFiltradas = todasLasPropiedades.filter(function(propiedad) {
        const cumpleUbicacion = propiedad.ubicacion === ubicacionSeleccionada;
        let cumpleMetros = true;
        if (metrosMaximos > 0) {
            cumpleMetros = propiedad.metros_cuadrados <= metrosMaximos;
        }
        return cumpleUbicacion && cumpleMetros;
    });

    // Si no hay propiedades que coincidan con el filtro
    if (propiedadesFiltradas.length === 0) {
        contenedorLista.innerHTML = `<p class="text-center text-danger py-4 m-0">No se encontraron propiedades disponibles con esos criterios.</p>`;
        return;
    }

    // Dibujamos las tarjetas en el HTML usando los nombres de tus variables Java en minúsculas
    let htmlContenido = "";
    propiedadesFiltradas.forEach(function(propiedad) {
        // Buscamos el índice real en el array original para poder seleccionarlo luego
        const indiceOriginal = todasLasPropiedades.indexOf(propiedad);

        htmlContenido += `
            <div class="border rounded p-3 mb-2 bg-white shadow-sm d-flex justify-content-between align-items-center">
                <div>
                    <h6 class="fw-bold text-dark mb-1">${propiedad.nombre}</h6>
                    <small class="text-muted">Área: ${propiedad.metros_cuadrados} m² | Tipo: ${propiedad.tipo}</small>
                </div>
                <button type="button" class="btn btn-warning btn-sm fw-bold btn-seleccionar-propiedad" data-index="${indiceOriginal}">
                    Seleccionar
                </button>
            </div>
        `;
    });

    contenedorLista.innerHTML = htmlContenido;
}

// 🌟 DELEGACIÓN DE EVENTOS (Escucha clics en elementos creados dinámicamente)
document.addEventListener('click', function (e) {
    // Verificamos si el elemento clickeado tiene la clase de tu botón
    if (e.target && e.target.classList.contains('btn-seleccionar-propiedad')) {
        
        // 1. Capturamos el índice que guardaste en data-index="${indiceOriginal}"
        const index = e.target.getAttribute('data-index');
        const propiedad = todasLasPropiedades[index]; // Tu array global de propiedades

        if (propiedad) {
            // 2. Intercambiamos la visibilidad de los paneles del modal
            document.getElementById("panelDerechoVacio").classList.add("d-none");
            document.getElementById("panelDerechoContenido").classList.remove("d-none");

            // 3. Rellenamos los datos usando exactamente los IDs de tu HTML
            document.getElementById("txtNombre").innerText = propiedad.nombre;
            document.getElementById("txtUbicacion").innerText = propiedad.ubicacion;
            
            // Convertimos a mayúsculas el tipo para que resalte con el badge de Bootstrap
            document.getElementById("txtTipo").innerText = propiedad.tipo.toUpperCase();
            
            // Mostramos los precios y áreas (usando los mismos nombres exactos de tu .java)
            document.getElementById("txtPrecioBase").innerText = "S/ " + propiedad.precio_metro_cuadrado + ".00";
            document.getElementById("txtMetros").innerText = propiedad.metros_cuadrados + " m²";
            document.getElementById("txtPrecioCasa").innerText = "S/ " + propiedad.precio_casa + ".00";

            // 4. Si añadiste la etiqueta <img> que armamos antes, la actualizamos aquí:
            const imgElement = document.getElementById("imgPropiedad");
            if (imgElement) {
                imgElement.src = "/img/" + (propiedad.imagen ? propiedad.imagen : "default.jpg");
                imgElement.alt = propiedad.nombre;
            }
        }
    }
});

// 4. PINTAR LOS DATOS EN EL PANEL DERECHO AMARILLO
function renderizarPanelDerecho(propiedad) {
    // Intercambiamos estados de los contenedores invisibles/visibles
    document.getElementById("panelDerechoVacio").classList.add("d-none");
    document.getElementById("panelDerechoContenido").classList.remove("d-none");

    // Inyectamos las respuestas usando tus IDs exactos del HTML
    document.getElementById("txtNombre").innerText = propiedad.nombre;
    document.getElementById("txtUbicacion").innerText = propiedad.ubicacion;
    document.getElementById("txtTipo").innerText = propiedad.tipo;
    
    // getPrecio_metro_cuadrado() y getPrecio_casa() calculados por Java
    const precioM2 = propiedad.precio_metro_cuadrado || 0;
    const precioTotal = propiedad.precio_casa || 0;

    document.getElementById("txtPrecioBase").innerText = "S/ " + precioM2.toLocaleString('es-PE') + ".00";
    document.getElementById("txtMetros").innerText = propiedad.metros_cuadrados + " m²";
    
    // El total final de la alerta verde
    document.getElementById("txtPrecioCasa").innerText = "S/ " + precioTotal.toLocaleString('es-PE') + ".00";
}

// 5. FUNCIÓN DEL BOTÓN VERDE "SOLICITAR SERVICIO"
function redirigirAContactoDptos() {
    const panelContenido = document.getElementById("panelDerechoContenido");
    if (panelContenido.classList.contains("d-none")) {
        alert("Por favor, seleccione primero una propiedad de la lista izquierda.");
        return;
    }

    const titulo = document.getElementById("txtNombre").innerText;
    const zona = document.getElementById("txtUbicacion").innerText;
    const dpto = document.getElementById("txtTipo").innerText;
    const total = document.getElementById("txtPrecioCasa").innerText;

    const mensajeFormateado = `Hola, deseo solicitar informes sobre el inmueble cotizado en la web. \n- Proyecto: ${titulo} \n- Ubicación: ${zona} \n- Tipo de propiedad: ${dpto} \n- Precio Estimado: ${total}`;

    localStorage.setItem("servicio_pendiente", mensajeFormateado);
    window.location.href = "/contactanos"; // Salta a tu página de contacto
}