package com.constructora.web_constructora.controller;

import com.constructora.web_constructora.model.Contacto;
import com.constructora.web_constructora.model.SerPrecio1;
import com.constructora.web_constructora.model.SerPrecio2;
import com.constructora.web_constructora.model.SerPrecio3;
import com.constructora.web_constructora.model.SerPrecio4;
import com.constructora.web_constructora.repository.ContactoRepository;
import com.constructora.web_constructora.repository.SerPrecio1Repository;
import com.constructora.web_constructora.repository.SerPrecio2Repository;
import com.constructora.web_constructora.repository.SerPrecio3Repository;
import com.constructora.web_constructora.repository.SerPrecio4Repository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(DashboardController.class)
@AutoConfigureMockMvc(addFilters = false)
class DashboardControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ContactoRepository contactoRepository;

    @MockBean
    private SerPrecio1Repository serPrecio1Repository;

    @MockBean
    private SerPrecio2Repository serPrecio2Repository;

    @MockBean
    private SerPrecio3Repository serPrecio3Repository;

    @MockBean
    private SerPrecio4Repository serPrecio4Repository;

    @Test
    void deberiaRetornarContactosYPreciosEnElDashboard() throws Exception {
        Contacto contacto = new Contacto();
        contacto.setId(1L);
        contacto.setNombre("Ana");
        contacto.setCorreo("ana@email.com");
        contacto.setTelefono("999999999");
        contacto.setMensaje("Quiero cotizar");
        contacto.setIntencion("Construcción");

        SerPrecio1 precio1 = new SerPrecio1();
        precio1.setId(10L);
        precio1.setNombre("Casa de playa");
        precio1.setPrecio_casa(250000);

        SerPrecio2 precio2 = new SerPrecio2();
        precio2.setId(20L);
        precio2.setServicio("Construcción");
        precio2.setPrecio_casa(180000);

        SerPrecio3 precio3 = new SerPrecio3();
        precio3.setId(30L);
        precio3.setPrecio_casa(120000);

        SerPrecio4 precio4 = new SerPrecio4();
        precio4.setId(40L);
        precio4.setPrecio_total(90000);

        when(contactoRepository.findAll()).thenReturn(List.of(contacto));
        when(serPrecio1Repository.findAll()).thenReturn(List.of(precio1));
        when(serPrecio2Repository.findAll()).thenReturn(List.of(precio2));
        when(serPrecio3Repository.findAll()).thenReturn(List.of(precio3));
        when(serPrecio4Repository.findAll()).thenReturn(List.of(precio4));

        mockMvc.perform(get("/api/dashboard"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.contactos[0].nombre").value("Ana"))
                .andExpect(jsonPath("$.serviciosInmobiliarios[0].nombre").value("Casa de playa"))
                .andExpect(jsonPath("$.serviciosConstruccion[0].servicio").value("Construcción"))
                .andExpect(jsonPath("$.serviciosInspeccion[0].precio_casa").value(120000))
                .andExpect(jsonPath("$.serviciosMantenimiento[0].precio_total").value(90000));
    }
}
