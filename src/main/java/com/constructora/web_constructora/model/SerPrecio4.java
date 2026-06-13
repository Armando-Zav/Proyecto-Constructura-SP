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
@Table(name = "ser_precio4") // Nombre de la tabla principal en MySQL
public class SerPrecio4 {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // Llave primaria autoincremental para JPA

    private int pisos;
    private int precio_piso;
    private int precio_total;

    // Crea automáticamente la tabla relacional 'ser_precio4_mantenimientos'
    @ElementCollection
    @CollectionTable(name = "ser_precio4_mantenimientos", joinColumns = @JoinColumn(name = "ser_precio4_id"))
    @Column(name = "mantenimiento")
    private List<String> mantenimientos;

    private double adicional = 1.0;
    private int costoBase;

    // Constructor vacío obligatorio para JPA
    public SerPrecio4() {
    }

    public SerPrecio4(int pisos, int precio_piso, List<String> mantenimientos) {
        this.pisos = pisos;
        this.precio_piso = precio_piso;
        this.mantenimientos = mantenimientos;
    }

    public void calcularMantenimiento(){
        // Reiniciamos 'adicional' a 1.0 en cada cálculo para evitar errores lógicos acumulativos
        this.adicional = 1.0;
        
        this.costoBase = this.pisos * this.precio_piso;

        if (this.mantenimientos != null) {
            for (String mt : this.mantenimientos) {
                this.adicional += 0.25;
            }
        }
        this.precio_total = (int) (this.costoBase * this.adicional);
    }

    // --- GETTER Y SETTER PARA EL ID ---
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    // --- GETTERS Y SETTERS COMPATIBLES CON LIST ---
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

    public List<String> getMantenimientos() {
        return mantenimientos;
    }

    public void setMantenimientos(List<String> mantenimientos) {
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