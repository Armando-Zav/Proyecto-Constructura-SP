package com.constructora.web_constructora;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class PaginasController {

    // Llama la pagina index.html
    @GetMapping("/")
    public String index() {
        return "index";
    }
    
    // Llama la pagina nosotros.html
    @GetMapping("/nosotros")
    public String nosotros() {
        return "nosotros";
    }

    // Llama la pagina contactanos.html
    @GetMapping("/contactanos")
    public String contactanos() {
        return "contactanos";
    }

    // Llama la pagina especialidades.html
    @GetMapping("/especialidades")
    public String especialidades() {
        return "especialidades";
    }

    // Llama la pagina servicios.html
    @GetMapping("/servicios")
    public String servicios() {
        return "servicios";
    }
}
