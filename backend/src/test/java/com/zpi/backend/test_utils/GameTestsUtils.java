package com.zpi.backend.test_utils;

import com.zpi.backend.category.Category;
import com.zpi.backend.game.Game;
import com.zpi.backend.game.dto.NewGameDTO;

import java.util.ArrayList;
import java.util.List;

public class GameTestsUtils {
    public static Game createGame(String gameStatus) {
        Game game = new Game();
        game.setAge(12);
        game.setId(1L);
        game.setMinPlayers(2);
        game.setMaxPlayers(4);
        game.setPlayingTime(30);
        game.setShortDescription("Short description");
        game.setName("Game name");
        game.setOriginalId(1L);
        game.setImage("Image");
        game.setCategories(CategoryTestUtils.createCategories());
        game.setGameStatus(GameStatusTestUtils.createGameStatus(gameStatus));
        return game;
    }

    public static NewGameDTO createNewGameDTO(ArrayList<Long> categoriesIDs) {
        NewGameDTO newGameDTO = new NewGameDTO();
        newGameDTO.setAge(12);
        newGameDTO.setMinPlayers(2);
        newGameDTO.setMaxPlayers(4);
        newGameDTO.setPlayingTime(30);
        newGameDTO.setShortDescription("Short description");
        newGameDTO.setName("Game name");
        newGameDTO.setCategoriesIDs(categoriesIDs);
        return newGameDTO;
    }

    public static Game createGame(NewGameDTO newGameDTO, List<Category> categories){

        Game game = newGameDTO.toGame(categories);
        game.setId(1L);
        game.setOriginalId(1L);
        game.setImage("Image");
        return game;
    }

    public static ArrayList<Game> createGames(String gameStatus) {
        ArrayList<Game> games = new ArrayList<>();
        games.add(createGame(gameStatus));
        return games;
    }
}
