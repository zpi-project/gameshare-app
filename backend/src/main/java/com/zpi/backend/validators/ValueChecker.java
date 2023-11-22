package com.zpi.backend.validators;

public class ValueChecker {
    public static boolean isStringEmpty(String value){
        return value == null || value.isEmpty() || value.isBlank();
    }
    public static boolean isPhoneIncorrect(String value){
        return value == null || value.isBlank() || value.length() > 15 || value.length() < 8;
    }
    public static boolean isCoordinateIncorrect(double value){
        return value < -180 || value > 180;
    }


}
