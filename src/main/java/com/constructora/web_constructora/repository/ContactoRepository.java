package com.constructora.web_constructora.repository;

import com.constructora.web_constructora.model.Contacto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ContactoRepository extends JpaRepository<Contacto, Long> {
    // Al heredar de JpaRepository, ya tienes gratis los métodos .save(), .findAll(), .delete(), etc.
}