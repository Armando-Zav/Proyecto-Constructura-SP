package com.constructora.web_constructora.model;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

// Import para la base de datos
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;

@Entity // Le avisamos a Spring Boot que esto va para MySQL
@Table(name = "contactos") // Nombre de la tabla en Workbench
public class Contacto {

    @Id // Toda tabla necesita su llave primaria (Primary Key)
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Autoincrementable
    private Long id; // Primary key
    private String nombre;
    private String fecha_contacto;
    private String correo;
    private String telefono;
    private String servicio;
    private String mensaje;
    private String intencion;

    // Constructor vacío
    public Contacto() {
    }

    // Constructor con metodos
    public Contacto(String nombre, String fecha_contacto, String correo, String telefono, String servicio,
            String mensaje, String intencion) {
        this.nombre = nombre;
        this.fecha_contacto = fecha_contacto;
        this.correo = correo;
        this.telefono = telefono;
        this.servicio = servicio;
        this.mensaje = mensaje;
        this.intencion = intencion;
    }

    @PrePersist
    public void asignarFechaAntesDeGuardar() {
        if (this.fecha_contacto == null || this.fecha_contacto.isEmpty()) {
            // Captura la fecha actual de tu sistema y la formatea (Ej: 27/06/2026)
            this.fecha_contacto = LocalDate.now().format(DateTimeFormatter.ofPattern("dd/MM/yyyy"));
        }
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

    public String getIntencion() {
        return intencion;
    }

    public void setIntencion(String intencion) {
        this.intencion = intencion;
    }

    public String getServicio() {
        return servicio;
    }

    public void setServicio(String servicio) {
        this.servicio = servicio;
    }

    public String getFecha_contacto() {
        return fecha_contacto;
    }

    public void setFecha_contacto(String fecha_contacto) {
        this.fecha_contacto = fecha_contacto;
    }
}