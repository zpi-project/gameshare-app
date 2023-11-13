package com.zpi.backend.category.exception;

public class CategoryDoesNotExistException extends Exception{
    public CategoryDoesNotExistException(String message) {
        super(message);
    }
}
