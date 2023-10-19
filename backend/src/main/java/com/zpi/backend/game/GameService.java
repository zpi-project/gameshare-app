package com.zpi.backend.game;

import com.zpi.backend.category.Category;
import com.zpi.backend.category.CategoryDoesNotExistException;
import com.zpi.backend.category.CategoryService;
import com.zpi.backend.exceptionHandlers.BadRequestException;
import com.zpi.backend.validators.ValueChecker;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class GameService {
    @Autowired
    GameRepository gameRepository;
    @Autowired
    CategoryService categoryService;
    ValueChecker valueChecker = new ValueChecker();
    public Game addGame(NewGameDTO newGameDTO) throws GameAlreadyExistsException, BadRequestException, CategoryDoesNotExistException {
        if (valueChecker.isStringNotCorrect(newGameDTO.getName()))
            throw new BadRequestException("Name field is empty or null");
        if (valueChecker.isStringNotCorrect(newGameDTO.getShortDescription()))
            throw new BadRequestException("Short description field is empty or null");
        if (gameRepository.existsGameByNameAndAcceptedIsTrue(newGameDTO.getName()))
            throw new GameAlreadyExistsException("Game "+newGameDTO.getName()+" already exists");
        List<Category> categories = categoryService.getCategoriesByIDs(newGameDTO.getCategoriesIDs());
        Game newGame = newGameDTO.toGame(categories);
        gameRepository.save(newGame);
        return newGame;
    }

    public Game getGame(long id) throws GameDoesNotExistException{
        Optional<Game> gameOptional = gameRepository.findByIdAndAcceptedIsTrue(id);
        if (gameOptional.isEmpty())
            throw new GameDoesNotExistException("Game (id = "+id+") does not exists");
        return gameOptional.get();
    }

    public List<Game> getGames(int page, int size, Optional<String> search, Optional<List<Integer>> categoriesIds){
        Pageable pageable = PageRequest.of(page, size);
        if (search.isEmpty())
            if (categoriesIds.isEmpty())
                return gameRepository.getAllByAcceptedIsTrue(pageable);
            else
                return gameRepository.getAllByAcceptedAndCategoriesIn(pageable, categoriesIds.get());
        else
            if (categoriesIds.isEmpty())
                return gameRepository.searchAllByNameContainsIgnoreCaseAndAcceptedIsTrue(search.get(), pageable);
            else
                return gameRepository.searchAllByNameContainsAndAcceptedAndCategoriesIn(search.get(), categoriesIds.get(), pageable);
    }
}
