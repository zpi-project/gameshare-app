package com.zpi.backend.game_instance.dto;

import com.zpi.backend.game_instance.GameInstance;
import com.zpi.backend.user.dto.UserGameInstanceDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserWithGameInstancesDTO {
    private UserGameInstanceDTO owner;
    private List<UsersGameInstanceDTO> gameInstances;

    public UserWithGameInstancesDTO(GameInstance gameInstance) {
        owner = new UserGameInstanceDTO(gameInstance.getOwner());
        gameInstances = new ArrayList<>();
        gameInstances.add(new UsersGameInstanceDTO(gameInstance));
    }
    public void addGameInstance(GameInstance gameInstance){
        gameInstances.add(new UsersGameInstanceDTO(gameInstance));
    }
}
