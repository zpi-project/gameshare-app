package com.zpi.backend.game.dto;

import com.zpi.backend.game.Game;
import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class PlGameDTO extends GameDTO{
    private String name_pl;
    private String shortDescription_pl;
    public PlGameDTO(Game game){
        super(game);
        name_pl = game.getName_pl();
        shortDescription_pl = game.getShort_description_pl();
    }
}
