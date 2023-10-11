package com.zpi.backend.exceptionHandlers;

public class BadRequestException extends Exception{
    public BadRequestException(String message){ super(message); }
}
