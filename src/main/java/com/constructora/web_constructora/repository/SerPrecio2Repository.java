package com.constructora.web_constructora.repository;

import com.constructora.web_constructora.model.SerPrecio2;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SerPrecio2Repository extends JpaRepository<SerPrecio2, Long> {
    // Listo, hereda todos los métodos CRUD básicos (save, findAll, etc.)
}