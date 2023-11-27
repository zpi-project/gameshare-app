package com.zpi.backend.image.exception;

import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class GCPFileUploadException extends RuntimeException{

    private final String message;

    public GCPFileUploadException(String message) {
        super(message);
        this.message = message;
    }
}