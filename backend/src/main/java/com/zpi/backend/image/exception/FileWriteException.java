package com.zpi.backend.image.exception;

import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class FileWriteException extends RuntimeException{

    private final String message;

    public FileWriteException(String message) {
        super(message);
        this.message = message;
    }
}
