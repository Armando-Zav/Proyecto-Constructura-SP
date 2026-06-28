package com.constructora.web_constructora.controller;

import com.constructora.web_constructora.model.Contacto;
import com.constructora.web_constructora.model.SerPrecio1;
import com.constructora.web_constructora.model.SerPrecio2;
import com.constructora.web_constructora.model.SerPrecio3;
import com.constructora.web_constructora.model.SerPrecio4;
import com.constructora.web_constructora.repository.ContactoRepository;
import com.constructora.web_constructora.repository.SerPrecio1Repository;
import com.constructora.web_constructora.repository.SerPrecio2Repository;
import com.constructora.web_constructora.repository.SerPrecio3Repository;
import com.constructora.web_constructora.repository.SerPrecio4Repository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    private final ContactoRepository contactoRepository;
    private final SerPrecio1Repository serPrecio1Repository;
    private final SerPrecio2Repository serPrecio2Repository;
    private final SerPrecio3Repository serPrecio3Repository;
    private final SerPrecio4Repository serPrecio4Repository;

    public DashboardController(
            ContactoRepository contactoRepository,
            SerPrecio1Repository serPrecio1Repository,
            SerPrecio2Repository serPrecio2Repository,
            SerPrecio3Repository serPrecio3Repository,
            SerPrecio4Repository serPrecio4Repository) {
        this.contactoRepository = contactoRepository;
        this.serPrecio1Repository = serPrecio1Repository;
        this.serPrecio2Repository = serPrecio2Repository;
        this.serPrecio3Repository = serPrecio3Repository;
        this.serPrecio4Repository = serPrecio4Repository;
    }

    @GetMapping
    public Map<String, Object> obtenerDashboard() {
        Map<String, Object> dashboard = new HashMap<>();

        List<Contacto> contactos = contactoRepository.findAll();

        // 🔥 NUEVO: Filtro de limpieza para registros antiguos
        // Recorremos los contactos y si el servicio es nulo o está vacío, le ponemos un valor por defecto.
        for (Contacto contacto : contactos) {
            if (contacto.getServicio() == null || contacto.getServicio().trim().isEmpty()) {
                // Le asignamos un código que nuestro JavaScript entienda, o un texto directo
                contacto.setServicio("No especificado"); 
            }
        }

        List<SerPrecio1> precios1 = serPrecio1Repository.findAll();
        List<SerPrecio2> precios2 = serPrecio2Repository.findAll();
        List<SerPrecio3> precios3 = serPrecio3Repository.findAll();
        List<SerPrecio4> precios4 = serPrecio4Repository.findAll();

        dashboard.put("contactos", contactos);
        dashboard.put("serviciosInmobiliarios", precios1);
        dashboard.put("serviciosConstruccion", precios2);
        dashboard.put("serviciosInspeccion", precios3);
        dashboard.put("serviciosMantenimiento", precios4);

        return dashboard;
    }
}