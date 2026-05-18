package com.constructora.web_constructora.model;

public class SerPrecio2 {
    private String servicio;
    private int metros_cuadrados;
    private int precio_metro_cuadrado;

    private int precio_casa;

    public SerPrecio2() {

    }

    public SerPrecio2(String servicio, int metros_cuadrados, int precio_metro_cuadrado) {
        this.servicio = servicio;
        this.metros_cuadrados = metros_cuadrados;
        this.precio_metro_cuadrado = precio_metro_cuadrado;
    }
    
    public void calcularPrecio() {
        precio_casa = precio_metro_cuadrado * metros_cuadrados; 
    }

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
