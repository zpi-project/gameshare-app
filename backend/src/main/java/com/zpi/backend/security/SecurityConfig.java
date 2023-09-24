package com.zpi.backend.security;

import org.springframework.context.annotation.Bean;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity httpSecurity) throws Exception{


        httpSecurity.authorizeRequests(authorizeRequests ->
                authorizeRequests
                        .requestMatchers("/").permitAll()
                        .anyRequest().authenticated()
        );
        return httpSecurity.oauth2Login(Customizer.withDefaults()).build();
    }
}
