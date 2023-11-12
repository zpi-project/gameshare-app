package com.zpi.backend.game_instance.Dto;

import com.zpi.backend.game_instance.GameInstance;
import com.zpi.backend.game_instance_image.GameInstanceImage;
import com.zpi.backend.game_instance_image.Dto.LinkDTO;
import com.zpi.backend.user.Dto.UserDTO;
import com.zpi.backend.user.Dto.UserGuestDTO;
import lombok.Data;

import java.util.List;

@Data
public class GameInstanceDetailsDTO extends GameInstanceDTO {
    private List<LinkDTO> gameInstanceImage;
    private UserGuestDTO owner;

    public GameInstanceDetailsDTO(GameInstance gameInstance, boolean isGuest){
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
