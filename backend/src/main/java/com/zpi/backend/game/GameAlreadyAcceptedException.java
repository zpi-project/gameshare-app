package com.zpi.backend.game;

public class GameAlreadyAcceptedException extends Exception{
    public GameAlreadyAcceptedException(String message) {
        super(message);
    }
}
