package com.zpi.backend.game.dto;

import com.zpi.backend.game.Game;
import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class EnGameDTO extends GameDTO{
    private String name;
    private String shortDescription;
    public EnGameDTO(Game game){
        super(game);
        name = game.getName();
        shortDescription = game.getShortDescription();
    }
}
