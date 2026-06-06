package com.constructora.web_constructora.model;

// Import para la base de datos
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity // Le avisamos a Spring Boot que esto va para MySQL
@Table(name = "contactos") // Nombre de la tabla en Workbench
public class Contacto {

    @Id // Toda tabla necesita su llave primaria (Primary Key)
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Autoincrementable
    private Long id; // Primary key
    private String nombre;
    private String correo;
    private String telefono;
    private String mensaje;

    // Constructor vacío
    public Contacto() {
    }

    // Constructor con metodos 
    public Contacto(String nombre, String correo, String telefono, String mensaje) {
        this.nombre = nombre;
        this.correo = correo;
        this.telefono = telefono;
        this.mensaje = mensaje;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getCorreo() {
        return correo;
    }

    public void setCorreo(String correo) {
        this.correo = correo;
    }   

    public String getTelefono() {
        return telefono;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    public String getMensaje() {
        return mensaje;
    }

    public void setMensaje(String mensaje) {
        this.mensaje = mensaje;
    }
}