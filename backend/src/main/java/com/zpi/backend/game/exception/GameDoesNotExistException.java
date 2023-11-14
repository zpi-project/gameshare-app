package com.zpi.backend.game.exception;

public class GameDoesNotExistException extends Exception{
    public GameDoesNotExistException(String message) {
        super(message);
    }
}
