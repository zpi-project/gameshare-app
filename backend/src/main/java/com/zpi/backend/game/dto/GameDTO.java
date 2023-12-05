package com.zpi.backend.game.dto;

import com.zpi.backend.category.DTO.CategoryDTO;
import com.zpi.backend.game.Game;
import com.zpi.backend.languages.LanguageCodes;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GameDTO {
    private long id;
    private String image;
    private String name;
    private String shortDescription;
    private int minPlayers;
    private int maxPlayers;
    private int playingTime;
    private int age;
    private List<CategoryDTO> categories;

    public GameDTO(Game game,String language){
        id = game.getId();
        image = game.getImage();
        minPlayers = game.getMinPlayers();
        maxPlayers = game.getMaxPlayers();
        age = game.getAge();
        playingTime = game.getPlayingTime();
        categories = getCategoriesDTO(game,language);
        if(language.equals(LanguageCodes.ENGLISH) || language.equals(LanguageCodes.POLISH) && game.getName_pl() == null){
            name = game.getName();
            shortDescription = game.getShortDescription();
        }
        else if(language.equals(LanguageCodes.POLISH)){
            name = game.getName_pl();
            shortDescription = game.getShort_description_pl();
        }

    }

    public GameDTO(Game game) {
        id = game.getId();
        image = game.getImage();
        minPlayers = game.getMinPlayers();
        maxPlayers = game.getMaxPlayers();
        age = game.getAge();
        playingTime = game.getPlayingTime();
        categories = getCategoriesDTO(game,LanguageCodes.ENGLISH);
        name = game.getName();
        shortDescription = game.getShortDescription();
    }

    public List<CategoryDTO> getCategoriesDTO(Game game,String language) {
        return CategoryDTO.convertToDTO(game.getCategories(),language);
    }


}
