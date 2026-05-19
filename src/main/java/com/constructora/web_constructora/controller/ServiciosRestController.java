package com.constructora.web_constructora.controller;

import com.constructora.web_constructora.model.Contacto;
import com.constructora.web_constructora.model.SerPrecio1;
import com.constructora.web_constructora.model.SerPrecio2;
import com.constructora.web_constructora.model.SerPrecio3;
import com.constructora.web_constructora.model.SerPrecio4;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api") // Todas las rutas de este controlador empezarán con /api
public class ServiciosRestController {

    @GetMapping("/propiedades") // La URL completa será: /api/propiedades
    public List<SerPrecio1> obtenerPropiedades() {
        List<SerPrecio1> listaFicticia = new ArrayList<>();

        listaFicticia.add(new SerPrecio1("Depa Estreno San Borja", 4000, "Departamento", "San Borja", 45));
        listaFicticia.add(new SerPrecio1("Residencia Chacarilla", 4200, "Casa", "San Borja", 120));
        listaFicticia
                .add(new SerPrecio1("Depa Vista a Parque SJL", 1500, "Departamento", "San Juan de Lurigancho", 60));
        listaFicticia.add(new SerPrecio1("Mini Depa Las Flores", 1600, "Departamento", "San Juan de Lurigancho", 40));

        for (SerPrecio1 p : listaFicticia) {
            p.calcularPrecio();
        }

        // Al usar @RestController, Spring Boot convierte esta lista a JSON
        // automáticamente de forma segura
        return listaFicticia;
    }

    @PostMapping("/calcular-servicio")
    public SerPrecio2 calcularServicio(@RequestBody SerPrecio2 solicitud) {
        // Usamos directamente el precio que el usuario digitó en la caja de texto
        SerPrecio2 resultado = new SerPrecio2(
                solicitud.getServicio(),
                solicitud.getMetros_cuadrados(),
                solicitud.getPrecio_metro_cuadrado());

        // Ejecuta la multiplicación: precio_casa = precio_metro_cuadrado *
        // metros_cuadrados;
        resultado.calcularPrecio();

        return resultado;
    }

    @PostMapping("/calcular-inspeccion")
    public SerPrecio3 calcularInspeccion(@RequestBody SerPrecio3 solicitud) {
        solicitud.calcularPrecio();
        return solicitud;
    }

    @PostMapping("/calcular-mantenimiento")
    public SerPrecio4 calcularMantenimiento(@RequestBody SerPrecio4 solicitud) {
        solicitud.calcularMantenimiento();
        return solicitud;
    }

    @PostMapping("/enviar-contacto")
    public ResponseEntity<String> procesarContacto(@RequestBody Contacto contacto) {
        // Aquí recibes la data limpia desde el formulario
        System.out.println("¡Nueva solicitud de contacto recibida!");
        System.out.println("Cliente: " + contacto.getNombre());
        System.out.println("Correo: " + contacto.getCorreo());
        System.out.println("Teléfono: " + contacto.getTelefono());
        System.out.println("Detalles del Servicio: \n" + contacto.getMensaje());

        // NOTA: Aquí a futuro puedes meter tu lógica para guardar en MySQL/MariaDB

        // Respondemos un mensaje de éxito plano o un JSON de confirmación
        return ResponseEntity.ok(
                "{\"status\": \"OK\", \"mensaje\": \"Su solicitud ha sido registrada correctamente. Pronto nos comunicaremos con usted.\"}");
    }
}