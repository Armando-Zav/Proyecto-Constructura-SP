package com.constructora.web_constructora.model;

public class SerPrecio1 {
    // Clases
    private String nombre;
    private int precio_metro_cuadrado;
    private String tipo;
    private String ubicacion;
    private int metros_cuadrados;
    // Metodos
    private int precio_casa;

    // Constructor
    public SerPrecio1(String nombre, int precio_metro_cuadrado, String tipo, String ubicacion, int metros_cuadrados) {
        this.nombre = nombre;
        this.precio_metro_cuadrado = precio_metro_cuadrado;
        this.tipo = tipo;
        this.ubicacion = ubicacion;
        this.metros_cuadrados = metros_cuadrados;
    }

    // Metodo para calcular el precio final
    public void calcularPrecio() {
        precio_casa = precio_metro_cuadrado * metros_cuadrados; 
    }

    // Getters y Setters
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

    // Getter y Setter para el precio final
    public int getPrecioCasa() {
        return precio_casa;
    }

    public void setPrecioCasa(int precio_casa) {
        this.precio_casa = precio_casa;
    }
}
