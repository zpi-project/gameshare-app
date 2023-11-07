package com.zpi.backend.user_opinion;

public class OpinionDoesNotExistException extends Exception{
    public OpinionDoesNotExistException(String message) {
        super(message);
    }
}
