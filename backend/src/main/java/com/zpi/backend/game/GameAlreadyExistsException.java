package com.zpi.backend.game;

public class GameAlreadyExistsException extends Exception{
    public GameAlreadyExistsException(String message) {
        super(message);
    }
}
