package com.constructora.web_constructora;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class PaginasController {

    // Llama la pagina index.html
    @GetMapping("/")
    public String inicio() {
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

    // Llama la pagina especialistas.html
    @GetMapping("/especialistas")
    public String especialistas() {
        return "especialistas";
    }

    // Llama la pagina servicios.html
    @GetMapping("/servicios")
    public String servicios() {
        return "servicios";
    }
}
