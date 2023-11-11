package com.zpi.backend.game_instance;

import com.zpi.backend.game.GameDTO;
import com.zpi.backend.game_instance_image.GameInstanceImage;
import com.zpi.backend.user.UserDTO;
import com.zpi.backend.user.UserGuestDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GameInstanceDTO {
    private String uuid;
    private String shortDescription;
    private double pricePerDay;
    private List<GameInstanceImage> images;
    private GameDTO game;
    private UserGuestDTO owner;
    private double avgRating;
    private boolean isActive;

    public GameInstanceDTO(GameInstance gameInstance, boolean isGuest){
        uuid = gameInstance.getUuid();
        shortDescription = gameInstance.getDescription();
        pricePerDay = gameInstance.getPricePerDay();
        images = gameInstance.getImages();
        isActive = gameInstance.isActive();
        if (isGuest)
            owner = new UserGuestDTO(gameInstance.getOwner());
        else
            owner = new UserDTO(gameInstance.getOwner());
        game = new GameDTO(gameInstance.getGame());
        avgRating = (double) Math.round(gameInstance.getAvgRating() * 100) /100;
    }

}
