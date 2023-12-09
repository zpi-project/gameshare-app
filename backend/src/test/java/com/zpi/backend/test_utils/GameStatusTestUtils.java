package com.zpi.backend.test_utils;

import com.zpi.backend.game_status.GameStatus;

public class GameStatusTestUtils {
    public static GameStatus createGameStatus(String status) {
        GameStatus gameStatus = new GameStatus();
        gameStatus.setStatus(status);
        return gameStatus;
    }
}
