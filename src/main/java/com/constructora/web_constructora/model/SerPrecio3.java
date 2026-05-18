package com.constructora.web_constructora.model;

public class SerPrecio3 {
    private int metros_cuadrados;
    private int precio_metro_cuadrado;
    private int precio_casa;
    private String[] evaluaciones;

    private double adicional = 1.0;
    private int costoBase;

    public SerPrecio3() {
    }

    public SerPrecio3(int metros_cuadrados, int precio_metro_cuadrado, String[] evaluaciones) {
        this.metros_cuadrados = metros_cuadrados;
        this.precio_metro_cuadrado = precio_metro_cuadrado;
        this.evaluaciones = evaluaciones;
    }

    public void calcularPrecio() {
        costoBase = precio_metro_cuadrado * metros_cuadrados;

        if (evaluaciones != null) {
            for (String ev : evaluaciones) {
                adicional += 0.20;
            }
        }
        precio_casa = (int) (costoBase * adicional);
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

    public String[] getEvaluaciones() {
        return evaluaciones;
    }

    public void setEvaluaciones(String[] evaluaciones) {
        this.evaluaciones = evaluaciones;
    }

    public double getAdicional() {
        return adicional;
    }

    public void setAdicional(double adicional) {
        this.adicional = adicional;
    }

    public int getCostoBase() {
        return costoBase;
    }

    public void setCostoBase(int costoBase) {
        this.costoBase = costoBase;
    }
}