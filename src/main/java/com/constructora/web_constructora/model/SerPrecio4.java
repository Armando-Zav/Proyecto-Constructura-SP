package com.constructora.web_constructora.model;

public class SerPrecio4 {
    private int pisos;
    private int precio_piso;
    private int precio_total;
    private String[] mantenimientos;

    private double adicional = 1.0;
    private int costoBase;

    public SerPrecio4() {
    }

    public SerPrecio4(int pisos, int precio_piso, String[] mantenimientos) {
        this.pisos = pisos;
        this.precio_piso = precio_piso;
        this.mantenimientos = mantenimientos;
    }

    public void calcularMantenimiento(){
        costoBase = pisos * precio_piso;

        if (mantenimientos != null) {
            for (String mt : mantenimientos) {
                adicional += 0.25;
            }
        }
        precio_total = (int) (costoBase * adicional);
    }

    public int getPisos() {
        return pisos;
    }

    public void setPisos(int pisos) {
        this.pisos = pisos;
    }

    public int getPrecio_piso() {
        return precio_piso;
    }

    public void setPrecio_piso(int precio_piso) {
        this.precio_piso = precio_piso;
    }

    public int getPrecio_total() {
        return precio_total;
    }

    public void setPrecio_total(int precio_total) {
        this.precio_total = precio_total;
    }

    public String[] getMantenimientos() {
        return mantenimientos;
    }

    public void setMantenimientos(String[] mantenimientos) {
        this.mantenimientos = mantenimientos;
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