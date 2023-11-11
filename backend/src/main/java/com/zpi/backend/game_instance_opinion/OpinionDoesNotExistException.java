package com.zpi.backend.game_instance_opinion;

public class OpinionDoesNotExistException extends Exception {
    public OpinionDoesNotExistException(String message) {
        super(message);
    }
}
