package com.zpi.backend.game;

import com.zpi.backend.category.Category;
import com.zpi.backend.category.CategoryDoesNotExistException;
import com.zpi.backend.category.CategoryService;
import com.zpi.backend.exceptionHandlers.BadRequestException;
import com.zpi.backend.role.RoleService;
import com.zpi.backend.user.UserDoesNotExistException;
import com.zpi.backend.validators.ValueChecker;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class GameService {
    @Autowired
    GameRepository gameRepository;
    @Autowired
    CategoryService categoryService;
    @Autowired
    RoleService roleService;
    public Game addGame(NewGameDTO newGameDTO) throws GameAlreadyExistsException, BadRequestException, CategoryDoesNotExistException {
        newGameDTO.validate();
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

    public void acceptGame(Authentication authentication, long id) throws GameDoesNotExistException,
            GameAlreadyAcceptedException, UserDoesNotExistException, IllegalAccessException {
        if (!roleService.getRole(authentication).equals(roleService.getRoleByName("admin")))
            throw new IllegalAccessException();
        Optional<Game> optionalGame = gameRepository.findById(id);
        if (optionalGame.isEmpty())
            throw new GameDoesNotExistException("Game (id = "+id+") does not exists");
        Game game = optionalGame.get();
        if (game.isAccepted())
            throw new GameAlreadyAcceptedException("Game (id = "+id+") has been already accepted.");
        else {
            game.setAccepted(true);
            gameRepository.save(game);
        }
    }
}
