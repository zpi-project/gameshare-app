package com.zpi.backend.exception_handlers;

import lombok.Data;

@Data
public class FileWriteException extends RuntimeException{

    private final String message;

    public FileWriteException(String message) {
        super(message);
        this.message = message;
    }
}
