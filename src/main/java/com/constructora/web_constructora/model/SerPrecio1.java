package com.constructora.web_constructora.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "propiedades") // Así se llamará la tabla en MySQL Workbench
public class SerPrecio1 {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // Primary Key

    // Clases
    private String nombre;
    private int precio_metro_cuadrado;
    private String tipo;
    private String ubicacion;
    private int metros_cuadrados;
    
    // Atributo calculado
    private int precio_casa;

    // Constructor vacío (Obligatorio para JPA)
    public SerPrecio1() {
    }

    // Constructor con metodos
    public SerPrecio1(String nombre, int precio_metro_cuadrado, String tipo, String ubicacion, int metros_cuadrados) {
        this.nombre = nombre;
        this.precio_metro_cuadrado = precio_metro_cuadrado;
        this.tipo = tipo;
        this.ubicacion = ubicacion;
        this.metros_cuadrados = metros_cuadrados;
    }

    public void calcularPrecio() {
        precio_casa = precio_metro_cuadrado * metros_cuadrados; 
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

    public int getPrecio_metro_cuadrado() {
        return precio_metro_cuadrado;
    }

    public void setPrecio_metro_cuadrado(int precio_metro_cuadrado) {
        this.precio_metro_cuadrado = precio_metro_cuadrado;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public String getUbicacion() {
        return ubicacion;
    }

    public void setUbicacion(String ubicacion) {
        this.ubicacion = ubicacion;
    }

    public int getMetros_cuadrados() {
        return metros_cuadrados;
    }

    public void setMetros_cuadrados(int metros_cuadrados) {
        this.metros_cuadrados = metros_cuadrados;
    }

    public int getPrecio_casa() {
        return precio_casa;
    }

    public void setPrecio_casa(int precio_casa) {
        this.precio_casa = precio_casa;
    }
}