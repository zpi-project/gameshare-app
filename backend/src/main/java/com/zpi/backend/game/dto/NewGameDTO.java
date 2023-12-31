package com.zpi.backend.game.dto;

import com.zpi.backend.category.Category;
import com.zpi.backend.exception_handlers.BadRequestException;
import com.zpi.backend.game.Game;
import com.zpi.backend.validators.ValueChecker;
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

    public Game toGame(List<Category> categories){
        return new Game(name, categories, minPlayers, maxPlayers, playingTime, age, shortDescription);
    }

    public boolean validate() throws BadRequestException {
        if(ValueChecker.isStringEmpty(name))
            throw new BadRequestException("Name cannot be empty");
        if(minPlayers < 1 || minPlayers > maxPlayers)
            throw new BadRequestException("Min players cannot be less than 1 or greater than max players");
        if(playingTime < 1)
            throw new BadRequestException("Playing time cannot be less than 1");
        if(age < 1)
            throw new BadRequestException("Age cannot be less than 1");
        if(ValueChecker.isStringEmpty(shortDescription))
            throw new BadRequestException("Short description cannot be empty");
        if(shortDescription.length() > 10000)
            throw new BadRequestException("Short description cannot have more than 10000 characters.");
        return true;
    }
}
