package com.zpi.backend.game;

public class GameAlreadyRejectedException extends Exception{
    public GameAlreadyRejectedException(String message) {
        super(message);
    }
}
