package com.constructora.web_constructora.controller;

import com.constructora.web_constructora.model.Contacto;
import com.constructora.web_constructora.repository.ContactoRepository;
import com.constructora.web_constructora.model.SerPrecio1;
import com.constructora.web_constructora.model.SerPrecio2;
import com.constructora.web_constructora.model.SerPrecio3;
import com.constructora.web_constructora.model.SerPrecio4;
import com.constructora.web_constructora.repository.SerPrecio1Repository; 
import org.springframework.beans.factory.annotation.Autowired;
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

    @Autowired
    private SerPrecio1Repository serPrecio1Repository; // Puente para propiedades

    // 1. ¡AQUÍ ESTABA EL DETALLE! Agregamos la inyección para los contactos:
    @Autowired
    private ContactoRepository contactoRepository; 

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
        System.out.println("¡Nueva solicitud de contacto recibida!");
        System.out.println("Cliente: " + contacto.getNombre());
        System.out.println("Correo: " + contacto.getCorreo());
        System.out.println("Teléfono: " + contacto.getTelefono());
        System.out.println("Detalles del Servicio: \n" + contacto.getMensaje());

        // Ahora que ya está inyectado arriba, esta línea funcionará perfectamente
        contactoRepository.save(contacto);

        return ResponseEntity.ok(
                "{\"status\": \"OK\", \"mensaje\": \"Su solicitud ha sido registrada correctamente. Pronto nos comunicaremos con usted.\"}");
    }
}