package com.constructora.web_constructora.controller;

import com.constructora.web_constructora.model.SecPrecios;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api") // Todas las rutas de este controlador empezarán con /api
public class ServiciosRestController {

    @GetMapping("/propiedades") // La URL completa será: /api/propiedades
    public List<SecPrecios> obtenerPropiedades() {
        List<SecPrecios> listaFicticia = new ArrayList<>();

        listaFicticia.add(new SecPrecios("Depa Estreno San Borja", 4000, "Departamento", "San Borja", 45));
        listaFicticia.add(new SecPrecios("Residencia Chacarilla", 4200, "Casa", "San Borja", 120));
        listaFicticia
                .add(new SecPrecios("Depa Vista a Parque SJL", 1500, "Departamento", "San Juan de Lurigancho", 60));
        listaFicticia.add(new SecPrecios("Mini Depa Las Flores", 1600, "Departamento", "San Juan de Lurigancho", 40));

        for (SecPrecios p : listaFicticia) {
            p.calcularPrecio();
        }

        // Al usar @RestController, Spring Boot convierte esta lista a JSON
        // automáticamente de forma segura
        return listaFicticia;
    }
}