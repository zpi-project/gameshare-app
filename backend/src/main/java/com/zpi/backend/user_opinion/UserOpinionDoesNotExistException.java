package com.zpi.backend.user_opinion;

public class UserOpinionDoesNotExistException extends Exception{
    public UserOpinionDoesNotExistException(String message) {
        super(message);
    }
}
