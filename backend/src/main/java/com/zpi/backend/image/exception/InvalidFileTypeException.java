package com.zpi.backend.image.exception;

import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class InvalidFileTypeException extends RuntimeException{

    private final String message;

    public InvalidFileTypeException(String message) {
        super(message);
        this.message = message;
    }
}