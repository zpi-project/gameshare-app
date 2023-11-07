package com.zpi.backend.gameInstance;

public class GameInstanceDoesNotExistException extends Exception{
    public GameInstanceDoesNotExistException(String message) {
        super(message);
    }
}
