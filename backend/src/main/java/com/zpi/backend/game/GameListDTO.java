package com.zpi.backend.game;

import com.zpi.backend.category.Category;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GameListDTO {
    private long id;
    private String name;
    private String image;
    private int minPlayers;
    private int maxPlayers;
    private int playingTime;
    private int age;
    private String shortDescription;
    private List<Category> categories;

    public GameListDTO(Game game){
        id = game.getId();
        name = game.getName();
        image = game.getImage();
        minPlayers = game.getMinPlayers();
        maxPlayers = game.getMaxPlayers();
        age = game.getAge();
        playingTime = game.getPlayingTime();
        shortDescription = game.getShortDescription();
        categories = game.getCategories();
    }

}
