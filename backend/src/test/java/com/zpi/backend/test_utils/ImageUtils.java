package com.zpi.backend.test_utils;

import com.zpi.backend.game_instance.GameInstance;
import com.zpi.backend.image.game_instance_image.GameInstanceImage;

import java.util.List;

public class ImageUtils {

    public static List<GameInstanceImage> createGameInstanceImage(GameInstance gameInstance) {
        GameInstanceImage image = new GameInstanceImage();
        image.setId(1L);
        image.setImageLink("link");
        image.setImageName("name");
        image.setGameInstance(gameInstance);

        return List.of(image);
    }
}
