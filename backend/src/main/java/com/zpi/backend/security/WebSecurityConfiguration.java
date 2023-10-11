package com.zpi.backend.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import static org.springframework.http.HttpMethod.*;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class WebSecurityConfiguration {
    private final GoogleAuthService googleAuthService;
    public WebSecurityConfiguration(GoogleAuthService googleAuthService) {
        this.googleAuthService = googleAuthService;
    }
    @Bean
    protected SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        GoogleTokenFilter googleTokenFilter = new GoogleTokenFilter(googleAuthService);
        http
                .csrf(AbstractHttpConfigurer::disable)
                .addFilterBefore(googleTokenFilter, UsernamePasswordAuthenticationFilter.class)
                .authorizeHttpRequests(requests -> requests
                        .requestMatchers(GET, "/auth").authenticated()
                        .requestMatchers(GET,"/user").authenticated()
                        .anyRequest().permitAll());

        return http.build();

    }

}