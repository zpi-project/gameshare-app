package com.zpi.backend.game;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GameDTO {
    private long id;
    private String name;
    private String image;

    public GameDTO(Game game){
        id = game.getId();
        name = game.getName();
        image = game.getImage();
    }
}
