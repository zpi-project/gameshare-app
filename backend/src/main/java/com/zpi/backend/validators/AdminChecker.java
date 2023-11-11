package com.zpi.backend.validators;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class AdminChecker {

    @Value("${JAKUB_EMAIL}")
    private String jakubEmail;

    @Value("${ALEKSANDRA_EMAIL}")
    private String aleksandraEmail;

    @Value("${MARIA_EMAIL}")
    private String mariaEmail;

    @Value("${PAULINA_EMAIL}")
    private String paulinaEmail;


    public boolean isAdmin(String email){
        return email.equals(jakubEmail) || email.equals(aleksandraEmail) || email.equals(mariaEmail) || email.equals(paulinaEmail);
    }
}
