package com.constructora.web_constructora.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "ser_precio2") // Nombre que tendrá la tabla en MySQL
public class SerPrecio2 {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // Llave primaria autoincremental requerida por JPA

    private String servicio;
    private int metros_cuadrados;
    private int precio_metro_cuadrado;
    private int precio_casa;

    // Constructor vacío obligatorio para JPA
    public SerPrecio2() {
    }

    public SerPrecio2(String servicio, int metros_cuadrados, int precio_metro_cuadrado) {
        this.servicio = servicio;
        this.metros_cuadrados = metros_cuadrados;
        this.precio_metro_cuadrado = precio_metro_cuadrado;
    }
    
    public void calcularPrecio() {
        this.precio_casa = this.precio_metro_cuadrado * this.metros_cuadrados; 
    }

    // --- NUEVOS GETTER Y SETTER PARA EL ID ---
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    // --- GETTERS Y SETTERS EXISTENTES ---
    public int getMetros_cuadrados() {
        return metros_cuadrados;
    }

    public void setMetros_cuadrados(int metros_cuadrados) {
        this.metros_cuadrados = metros_cuadrados;
    }

    public int getPrecio_metro_cuadrado() {
        return precio_metro_cuadrado;
    }

    public void setPrecio_metro_cuadrado(int precio_metro_cuadrado) {
        this.precio_metro_cuadrado = precio_metro_cuadrado;
    }

    public int getPrecio_casa() {
        return precio_casa;
    }

    public void setPrecio_casa(int precio_casa) {
        this.precio_casa = precio_casa;
    }

    public String getServicio() {
        return servicio;
    }

    public void setServicio(String servicio) {
        this.servicio = servicio;
    }
}