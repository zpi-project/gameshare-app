package com.zpi.backend.test_utils;

import com.zpi.backend.game_instance.GameInstance;
import com.zpi.backend.game_status.GameStatus;
import com.zpi.backend.role.Role;

public class GameInstanceTestUtils {

    public static GameInstance createGameInstance() {
        GameInstance gameInstance = new GameInstance();
        gameInstance.setId(1L);
        gameInstance.setPricePerDay(10.0);
        gameInstance.setDescription("description");
        gameInstance.setGame(GameTestsUtils.createGame(GameStatus.ACCEPTED));
        gameInstance.setOwner(UserTestUtils.createUserOwner(Role.USER));
        gameInstance.setImages(ImageUtils.createGameInstanceImage(gameInstance));
        return gameInstance;
    }
}
