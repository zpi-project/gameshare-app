package com.zpi.backend.game_instance;

import com.zpi.backend.user.UserDTO;
import com.zpi.backend.user.UserGuestDTO;
import lombok.Data;


@Data
public class SearchGameInstanceDTO extends GameInstanceDTO{
    private UserGuestDTO owner;

    public SearchGameInstanceDTO(GameInstance gameInstance, boolean isGuest){
        if (isGuest)
            owner = new UserGuestDTO(gameInstance.getOwner());
        else
            owner = new UserDTO(gameInstance.getOwner());
    }
}
