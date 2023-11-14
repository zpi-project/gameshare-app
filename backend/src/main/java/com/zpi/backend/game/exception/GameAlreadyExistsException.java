package com.zpi.backend.game.exception;

public class GameAlreadyExistsException extends Exception{
    public GameAlreadyExistsException(String message) {
        super(message);
    }
}
