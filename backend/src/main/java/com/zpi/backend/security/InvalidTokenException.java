package com.zpi.backend.security;

public class InvalidTokenException extends Exception {
    public InvalidTokenException(String message) {
        super(message);
    }

}
