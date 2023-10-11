package com.zpi.backend.category;

public class CategoryDoesNotExistException extends Exception{
    public CategoryDoesNotExistException(String message) {
        super(message);
    }
}
