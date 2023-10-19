package com.zpi.backend.GameInstance;

public class GameInstanceDoesNotExistException extends Exception{
    public GameInstanceDoesNotExistException(String message) {
        super(message);
    }
}
