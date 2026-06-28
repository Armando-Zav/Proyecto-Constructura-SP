let dashboardData = {
    contactos: [],
    serviciosInmobiliarios: [],
    serviciosConstruccion: [],
    serviciosInspeccion: [],
    serviciosMantenimiento: []
};

document.addEventListener('DOMContentLoaded', () => {
    const tableBody = document.getElementById('tableBody');
    const inputBuscar = document.getElementById('inputBuscar');
    const inputFecha = document.getElementById('inputFecha');
    const selectEstado = document.getElementById('selectEstado');

    if (inputBuscar && inputFecha && selectEstado) {
        inputBuscar.addEventListener('input', renderTable);
        inputFecha.addEventListener('change', renderTable);
        selectEstado.addEventListener('change', renderTable);
    }

    function renderTable() {
        if (!tableBody) return;
        tableBody.innerHTML = '';

        const textoBusqueda = inputBuscar?.value?.toLowerCase().trim() || '';
        const fechaFiltro = inputFecha?.value || '';
        const estadoFiltro = selectEstado?.value || 'Todos';

        const registros = dashboardData.contactos.filter((contacto) => {
            const coincideTexto = textoBusqueda === '' ||
                (contacto.nombre && contacto.nombre.toLowerCase().includes(textoBusqueda)) ||
                (contacto.correo && contacto.correo.toLowerCase().includes(textoBusqueda)) ||
                (contacto.telefono && contacto.telefono.includes(textoBusqueda));
            const coincideFecha = fechaFiltro === '' || (contacto.fecha && contacto.fecha.startsWith(fechaFiltro));
            const coincideEstado = estadoFiltro === 'Todos' || !estadoFiltro || (contacto.intencion && contacto.intencion.toLowerCase() === estadoFiltro.toLowerCase());
            return coincideTexto && coincideFecha && coincideEstado;
        });

        let htmlAcumulado = '';
        registros.forEach((contacto) => {
            // Cambia contacto.fecha por contacto.fecha_contacto
            const fecha = contacto.fecha_contacto || 'Sin fecha';
            const estado = contacto.intencion || 'Sin intención';
            const nombre = contacto.nombre || 'Sin nombre';
            const telefono = contacto.telefono || 'Sin teléfono';
            const correo = contacto.correo || 'Sin correo';

            htmlAcumulado += `
                <tr class="align-middle">
                    <!-- 1. ID -->
                    <th scope="row" class="ps-3 small text-muted font-monospace">#${contacto.id}</th>
                    
                    <!-- 2. CLIENTE (Nombre y correo) -->
                    <td>
                        <div class="d-flex align-items-center fw-bold">${nombre}</div>
                        <div class="small text-muted">${correo}</div>
                    </td>
                    
                    <!-- 3. FECHA -->
                    <td class="text-nowrap fw-bold text-dark">${fecha}</td>
                    
                    <!-- 4. SERVICIO (Usando la función traductora) -->
                    <td><span class="badge bg-secondary">${traducirServicio(contacto.servicio)}</span></td>
                    
                    <!-- 5. TELÉFONO -->
                    <td class="text-nowrap small text-muted">${telefono}</td>
                    
                    <!-- 6. INTENCIÓN -->
                    <td><span class="badge bg-primary">${estado}</span></td>
                    
                    <!-- 7. ACCIÓN (Botón Ver detalle) -->
                    <td class="text-end pe-3">
                        <button class="action-btn text-primary me-1" onclick="verResumenContacto('${contacto.id}')" title="Ver detalle">
                            <i class="bi bi-eye-fill"></i>
                        </button>
                    </td>
                </tr>`;
        });

        tableBody.innerHTML = htmlAcumulado;
        const txtResultados = document.querySelector('.result-count');
        if (txtResultados) {
            txtResultados.textContent = `${registros.length} resultados`;
        }
    }

    function actualizarTarjetasMetricas() {
        const totalContactos = dashboardData.contactos.length;
        const totalInmobiliarios = dashboardData.serviciosInmobiliarios.length;
        const totalConstruccion = dashboardData.serviciosConstruccion.length;
        const totalInspeccion = dashboardData.serviciosInspeccion.length;
        const totalMantenimiento = dashboardData.serviciosMantenimiento.length;
        const valorEstimado = dashboardData.serviciosInmobiliarios.reduce((sum, item) => sum + (item.precio_casa || 0), 0);

        // CORRECCIÓN: Los IDs fueron actualizados al contexto de constructora
        document.getElementById('txtTotalSolicitudes').innerText = totalContactos;
        document.getElementById('txtPendientes').innerText = totalInmobiliarios;
        document.getElementById('txtConfirmadas').innerText = totalConstruccion + totalInspeccion + totalMantenimiento;
        document.getElementById('txtValorEstimado').innerText = valorEstimado.toLocaleString('es-PE');
    }

    function renderPricingSummary() {
        const container = document.getElementById('preciosResumen');
        if (!container) return;

        const grupos = [
            {
                titulo: 'Inmobiliarios',
                icono: 'bi-house-door-fill',
                items: dashboardData.serviciosInmobiliarios,
                valor: (item) => item.precio_casa || 0
            },
            {
                titulo: 'Construcción',
                icono: 'bi-building-fill',
                items: dashboardData.serviciosConstruccion,
                valor: (item) => item.precio_casa || 0
            },
            {
                titulo: 'Inspección',
                icono: 'bi-search',
                items: dashboardData.serviciosInspeccion,
                valor: (item) => item.precio_casa || 0
            },
            {
                titulo: 'Mantenimiento',
                icono: 'bi-tools',
                items: dashboardData.serviciosMantenimiento,
                valor: (item) => item.precio_total || 0
            }
        ];

        container.innerHTML = grupos.map((grupo) => {
            const total = grupo.items.reduce((sum, item) => sum + grupo.valor(item), 0);
            return `
                <div class="col-12 col-md-6 col-xl-3">
                    <div class="border rounded-3 p-3 h-100">
                        <div class="d-flex align-items-center justify-content-between mb-2">
                            <h6 class="fw-semibold mb-0">${grupo.titulo}</h6>
                            <i class="bi ${grupo.icono} text-primary"></i>
                        </div>
                        <div class="fs-4 fw-bold">S/ ${total.toLocaleString('es-PE')}</div>
                        <div class="small text-muted">${grupo.items.length} registros</div>
                    </div>
                </div>`;
        }).join('');
    }

    async function cargarDashboard() {
        try {
            const respuesta = await fetch('/api/dashboard');
            if (!respuesta.ok) throw new Error('No se pudo cargar el dashboard');
            const datos = await respuesta.json();

            dashboardData = {
                contactos: datos.contactos || [],
                serviciosInmobiliarios: datos.serviciosInmobiliarios || [],
                serviciosConstruccion: datos.serviciosConstruccion || [],
                serviciosInspeccion: datos.serviciosInspeccion || [],
                serviciosMantenimiento: datos.serviciosMantenimiento || []
            };

            renderTable();
            actualizarTarjetasMetricas();
            renderPricingSummary();
        } catch (error) {
            console.error('Error al cargar dashboard:', error);
        }
    }

    window.verResumenContacto = function (id) {
        const contacto = dashboardData.contactos.find((item) => String(item.id) === String(id));
        if (!contacto) return;

        const modalBody = document.getElementById('modalResumenBody');
        modalBody.innerHTML = `
            <div class="p-2">
                <div class="text-center mb-4">
                    <span class="fs-3 fw-bold text-primary">Solicitud #${contacto.id}</span>
                    <p class="text-muted mb-0">Intención: <strong>${contacto.intencion || 'Sin información'}</strong></p>
                    <p class="text-muted mb-0">Servicio: <strong>${traducirServicio(contacto.servicio)}</strong></p><
                </div>
                <div class="row mb-3 g-2">
                    <div class="col-4 text-muted">Nombre:</div><div class="col-8 fw-bold">${contacto.nombre || 'Sin nombre'}</div>
                    <div class="col-4 text-muted">Correo:</div><div class="col-8">${contacto.correo || 'Sin correo'}</div>
                    <div class="col-4 text-muted">Teléfono:</div><div class="col-8">${contacto.telefono || 'Sin teléfono'}</div>
                </div>
                <div class="row g-2">
                    <div class="col-4 text-muted">Mensaje:</div><div class="col-8">${contacto.mensaje || 'Sin mensaje'}</div>
                </div>
            </div>`;

        const miModal = new bootstrap.Modal(document.getElementById('modalResumen'));
        miModal.show();
    };

    cargarDashboard();
});

function traducirServicio(codigo) {
    const mapaServicios = {
        "servicio1": "Inmobiliarios",
        "servicio2": "Construcción",
        "servicio3": "Inspección",
        "servicio4": "Mantenimiento"
    };
    return mapaServicios[codigo] || "N/A";
}