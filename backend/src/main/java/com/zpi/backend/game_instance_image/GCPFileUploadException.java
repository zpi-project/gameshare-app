package com.zpi.backend.game_instance_image;

import lombok.Data;

@Data
public class GCPFileUploadException extends RuntimeException{

    private final String message;

    public GCPFileUploadException(String message) {
        super(message);
        this.message = message;
    }
}