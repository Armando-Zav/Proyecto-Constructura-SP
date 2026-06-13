package com.constructora.web_constructora.repository;

import com.constructora.web_constructora.model.Contacto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContactoRepository extends JpaRepository<Contacto, Long> {
}