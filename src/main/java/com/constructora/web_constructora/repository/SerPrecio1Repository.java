package com.constructora.web_constructora.repository;

import com.constructora.web_constructora.model.SerPrecio1;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SerPrecio1Repository extends JpaRepository<SerPrecio1, Long> {
    // Gracias a JpaRepository, ya tenemos métodos como findAll(), save(), delete(), etc.
}