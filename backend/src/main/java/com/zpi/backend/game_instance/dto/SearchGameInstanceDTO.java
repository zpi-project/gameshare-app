package com.zpi.backend.game_instance.dto;

import com.zpi.backend.game_instance.GameInstance;
import com.zpi.backend.user.dto.UserDTO;
import com.zpi.backend.user.dto.UserGuestDTO;
import lombok.Data;


@Data
public class SearchGameInstanceDTO extends GameInstanceDTO {
    private UserGuestDTO owner;

    public SearchGameInstanceDTO(GameInstance gameInstance, boolean isGuest){
        super(gameInstance);
        if (isGuest)
            owner = new UserGuestDTO(gameInstance.getOwner());
        else
            owner = new UserDTO(gameInstance.getOwner());
    }
}
