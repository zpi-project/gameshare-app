package com.zpi.backend.category.Exception;

public class CategoryDoesNotExistException extends Exception{
    public CategoryDoesNotExistException(String message) {
        super(message);
    }
}
