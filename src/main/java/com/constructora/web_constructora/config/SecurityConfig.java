package com.constructora.web_constructora.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {
        @Bean
        public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
                http
                                .authorizeHttpRequests(authorize -> authorize
                                                // 1. Dejamos públicas las páginas de la constructora y recursos
                                                // estáticos
                                                .requestMatchers(
                                                                "/",
                                                                "/index",
                                                                "/nosotros",
                                                                "/servicios",
                                                                "/especialistas",
                                                                "/contactanos",
                                                                "/css/**",
                                                                "/js/**",
                                                                "/img/**",
                                                                "/assets/**", // Asegúrate de incluir assets si ahí
                                                                              // tienes el logo
                                                                "/video/**",
                                                                "/favicon.ico",
                                                                "/api/**")
                                                .permitAll()
                                                // 2. Protegemos el dashboard (y cualquier otra ruta que no esté arriba)
                                                .requestMatchers("/dashboard").authenticated()
                                                .anyRequest().authenticated())
                                // 3. Configuramos nuestro propio formulario de Login
                                .formLogin(form -> form
                                                .loginPage("/login") // La ruta URL para ver la página de login
                                                .loginProcessingUrl("/login") // La ruta a la que el HTML hace el POST
                                                .defaultSuccessUrl("/dashboard", true) // A dónde redirige si el login
                                                                                       // es correcto
                                                .failureUrl("/login?error=true") // A dónde redirige si la contraseña
                                                                                 // está mal
                                                .permitAll() // Permitimos que todos puedan ver la página de login
                                )
                                // 4. Configuramos el cierre de sesión (opcional pero recomendado)
                                .logout(logout -> logout
                                                .logoutUrl("/logout")
                                                .logoutSuccessUrl("/login?logout")
                                                .permitAll())
                                .csrf(csrf -> csrf.disable()); // Lo dejamos deshabilitado por ahora para que tu HTML
                                                               // puro funcione sin problemas
                return http.build();
        }

        // 5. Creamos un usuario "en memoria" para que puedas probar el sistema
        @Bean
        public UserDetailsService userDetailsService() {
                UserDetails admin = User.builder()
                                .username("admin")
                                .password(passwordEncoder().encode("elpez2024")) // Tu contraseña original encriptada
                                .roles("ADMIN")
                                .build();
                return new InMemoryUserDetailsManager(admin);
        }

        // 6. Spring Security exige un encriptador de contraseñas
        @Bean
        public PasswordEncoder passwordEncoder() {
                return new BCryptPasswordEncoder();
        }
}