package com.constructora.web_constructora.controller;

import com.constructora.web_constructora.model.Contacto;
import com.constructora.web_constructora.repository.ContactoRepository;
import com.constructora.web_constructora.model.SerPrecio1;
import com.constructora.web_constructora.model.SerPrecio2;
import com.constructora.web_constructora.model.SerPrecio3;
import com.constructora.web_constructora.model.SerPrecio4;
import com.constructora.web_constructora.repository.SerPrecio1Repository; 

// 1. NUEVOS IMPORTS: Traemos los repositorios que creamos hace un momento
import com.constructora.web_constructora.repository.SerPrecio2Repository;
import com.constructora.web_constructora.repository.SerPrecio3Repository;
import com.constructora.web_constructora.repository.SerPrecio4Repository;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
@RequestMapping("/api") 
public class ServiciosRestController {

    // 2. ATRIBUTOS: Declaramos todos los repositorios como finales e inmutables
    private final SerPrecio1Repository serPrecio1Repository; 
    private final ContactoRepository contactoRepository;
    private final SerPrecio2Repository serPrecio2Repository;
    private final SerPrecio3Repository serPrecio3Repository;
    private final SerPrecio4Repository serPrecio4Repository;

    // 3. CONSTRUCTOR ÚNICO: Inyecta todos los componentes en paralelo de manera profesional
    public ServiciosRestController(
            SerPrecio1Repository serPrecio1Repository, 
            ContactoRepository contactoRepository,
            SerPrecio2Repository serPrecio2Repository,
            SerPrecio3Repository serPrecio3Repository,
            SerPrecio4Repository serPrecio4Repository) {
        this.serPrecio1Repository = serPrecio1Repository;
        this.contactoRepository = contactoRepository;
        this.serPrecio2Repository = serPrecio2Repository;
        this.serPrecio3Repository = serPrecio3Repository;
        this.serPrecio4Repository = serPrecio4Repository;
    } 

    @GetMapping("/propiedades")
    public List<SerPrecio1> obtenerPropiedades() {
        List<SerPrecio1> listaProperties = serPrecio1Repository.findAll();

        for (SerPrecio1 propiedad : listaProperties) {
            propiedad.calcularPrecio(); 
        }
        return listaProperties;
    }

    @PostMapping("/calcular-servicio")
    public SerPrecio2 calcularServicio(@RequestBody SerPrecio2 solicitud) {
        SerPrecio2 resultado = new SerPrecio2(
                solicitud.getServicio(),
                solicitud.getMetros_cuadrados(),
                solicitud.getPrecio_metro_cuadrado());

        resultado.calcularPrecio();

        // 4. PERSISTENCIA: Guardamos el cálculo del Servicio 2 en la base de datos antes de responder
        return serPrecio2Repository.save(resultado);
    }

    @PostMapping("/calcular-inspeccion")
    public SerPrecio3 calcularInspeccion(@RequestBody SerPrecio3 solicitud) {
        solicitud.calcularPrecio();

        // 5. PERSISTENCIA: Guardamos el cálculo del Servicio 3 (con sus evaluaciones)
        return serPrecio3Repository.save(solicitud);
    }

    @PostMapping("/calcular-mantenimiento")
    public SerPrecio4 calcularMantenimiento(@RequestBody SerPrecio4 solicitud) {
        solicitud.calcularMantenimiento();

        // 6. PERSISTENCIA: Guardamos el cálculo del Servicio 4 (con sus mantenimientos)
        return serPrecio4Repository.save(solicitud);
    }

    @PostMapping("/enviar-contacto")
    public ResponseEntity<String> procesarContacto(@RequestBody Contacto contacto) {
        System.out.println("¡Nueva solicitud de contacto recibida!");
        System.out.println("Cliente: " + contacto.getNombre());
        System.out.println("Correo: " + contacto.getCorreo());
        System.out.println("Teléfono: " + contacto.getTelefono());
        System.out.println("Detalles del Servicio: \n" + contacto.getMensaje());

        contactoRepository.save(contacto);

        return ResponseEntity.ok(
                "{\"status\": \"OK\", \"mensaje\": \"Su solicitud ha sido registrada correctamente. Pronto nos comunicaremos con usted.\"}");
    }
}