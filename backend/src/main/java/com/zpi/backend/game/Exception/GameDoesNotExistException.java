package com.zpi.backend.game.Exception;

public class GameDoesNotExistException extends Exception{
    public GameDoesNotExistException(String message) {
        super(message);
    }
}
