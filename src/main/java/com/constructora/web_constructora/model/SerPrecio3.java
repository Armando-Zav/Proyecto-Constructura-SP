package com.constructora.web_constructora.model;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Table;
import java.util.List;

@Entity
@Table(name = "ser_precio3") // Nombre de la tabla principal en MySQL
public class SerPrecio3 {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // Llave primaria requerida

    private int metros_cuadrados;
    private int precio_metro_cuadrado;
    private int precio_casa;

    // Crea automáticamente una tabla relacional 'ser_precio3_evaluaciones' en MySQL
    @ElementCollection
    @CollectionTable(name = "ser_precio3_evaluaciones", joinColumns = @JoinColumn(name = "ser_precio3_id"))
    @Column(name = "evaluacion")
    private List<String> evaluaciones;

    private double adicional = 1.0;
    private int costoBase;

    // Constructor vacío obligatorio para JPA
    public SerPrecio3() {
    }

    public SerPrecio3(int metros_cuadrados, int precio_metro_cuadrado, List<String> evaluaciones) {
        this.metros_cuadrados = metros_cuadrados;
        this.precio_metro_cuadrado = precio_metro_cuadrado;
        this.evaluaciones = evaluaciones;
    }

    public void calcularPrecio() {
        // 🔥 ¡CORRECCIÓN AQUÍ! Reiniciamos 'adicional' a 1.0 en cada ejecución. 
        // Si no lo haces, cada vez que llames al método, el valor anterior se quedará guardado 
        // en la instancia y el precio se inflará sumando 0.20 infinitamente.
        this.adicional = 1.0;
        
        this.costoBase = this.precio_metro_cuadrado * this.metros_cuadrados;

        if (this.evaluaciones != null) {
            for (String ev : this.evaluaciones) {
                this.adicional += 0.20;
            }
        }
        this.precio_casa = (int) (this.costoBase * this.adicional);
    }

    // --- GETTER Y SETTER PARA EL ID ---
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    // --- GETTERS Y SETTERS COMPATIBLES CON LIST ---
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

    public List<String> getEvaluaciones() {
        return evaluaciones;
    }

    public void setEvaluaciones(List<String> evaluaciones) {
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