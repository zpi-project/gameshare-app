package com.zpi.backend.image.exception;

public class ImageDoesNotExistException extends Exception{
    public ImageDoesNotExistException(String message) {
        super(message);
    }
}
