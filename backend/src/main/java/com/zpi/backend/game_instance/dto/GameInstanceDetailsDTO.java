package com.zpi.backend.game_instance.dto;

import com.zpi.backend.game_instance.GameInstance;
import com.zpi.backend.game_instance_image.GameInstanceImage;
import com.zpi.backend.game_instance_image.dto.LinkDTO;
import com.zpi.backend.user.dto.UserDTO;
import com.zpi.backend.user.dto.UserGuestDTO;
import lombok.Data;

import java.util.List;

@Data
public class GameInstanceDetailsDTO extends GameInstanceDTO {
    private List<LinkDTO> gameInstanceImage;
    private UserGuestDTO owner;

    public GameInstanceDetailsDTO(GameInstance gameInstance, boolean isGuest){
        super(gameInstance);
        gameInstanceImage = gameInstance.getImages()
                .stream().map(this::convertToLinkDTO)
                .toList();
        if (isGuest)
            owner = new UserGuestDTO(gameInstance.getOwner());
        else
            owner = new UserDTO(gameInstance.getOwner());
    }

    private LinkDTO convertToLinkDTO(GameInstanceImage gameInstanceImage){
        return new LinkDTO(gameInstanceImage);
    }
}
