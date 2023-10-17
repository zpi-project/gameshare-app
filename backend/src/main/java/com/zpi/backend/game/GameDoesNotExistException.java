package com.zpi.backend.game;

public class GameDoesNotExistException extends Exception{
    public GameDoesNotExistException(String message) {
        super(message);
    }
}
