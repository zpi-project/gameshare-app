package com.zpi.backend.validators;

public class ValueChecker {

    public boolean isStringNotCorrect(String value){
        return value == null || value.isEmpty() || value.isBlank();
    }

}
