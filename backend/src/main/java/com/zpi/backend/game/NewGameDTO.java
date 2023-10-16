package com.zpi.backend.game;

import com.zpi.backend.category.Category;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class NewGameDTO {
    private String name;
    private ArrayList<Long> categoriesIDs;
    private int minPlayers;
    private int maxPlayers;
    private int playingTime;
    private int age;
    private String shortDescription;
    private String image;

    public Game toGame(List<Category> categories){
        return new Game(name, categories, minPlayers, maxPlayers, playingTime, age, shortDescription, image);
    }
}
