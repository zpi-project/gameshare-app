package com.zpi.backend.gameInstance;

import com.zpi.backend.game.GameDTO;
import com.zpi.backend.gameInstanceImage.GameInstanceImage;
import com.zpi.backend.user.UserGameGuestDTO;
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
    private List<GameInstanceImage> gameInstanceImages;
    private GameDTO game;
    private UserGameGuestDTO user;
    private boolean isActive;

}
