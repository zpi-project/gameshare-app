package com.zpi.backend.validators;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class AdminChecker {

    @Value("${ADMIN1_EMAIL}")
    private String admin1email;

    @Value("${ADMIN2_EMAIL}")
    private String admin2email;

    @Value("${ADMIN3_EMAIL}")
    private String admin3email;

    @Value("${ADMIN4_EMAIL}")
    private String admin4email;

    public boolean isAdmin(String email){
        return email.equals(admin1email) || email.equals(admin2email) || email.equals(admin3email) || email.equals(admin4email);
    }
}
