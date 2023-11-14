package com.zpi.backend.game_instance.exception;

public class GameInstanceDoesNotExistException extends Exception{
    public GameInstanceDoesNotExistException(String message) {
        super(message);
    }
}
