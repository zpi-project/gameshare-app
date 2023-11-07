package com.zpi.backend.game_instance;

public class GameInstanceDoesNotExistException extends Exception{
    public GameInstanceDoesNotExistException(String message) {
        super(message);
    }
}
