package com.zpi.backend.game;

import com.zpi.backend.category.Category;
import com.zpi.backend.category.CategoryDoesNotExistException;
import com.zpi.backend.category.CategoryService;
import com.zpi.backend.dto.Pagination;
import com.zpi.backend.dto.ResultsDTO;
import com.zpi.backend.exception_handlers.BadRequestException;
import com.zpi.backend.game_status.GameStatusService;
import com.zpi.backend.role.RoleService;
import com.zpi.backend.user.UserDoesNotExistException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
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
    @Autowired
    GameStatusService gameStatusService;
    public Game addGame(NewGameDTO newGameDTO) throws GameAlreadyExistsException, BadRequestException, CategoryDoesNotExistException {
        newGameDTO.validate();
        if (gameRepository.existsGameByName(newGameDTO.getName()))
            throw new GameAlreadyExistsException("Game "+newGameDTO.getName()+" already exists");
        List<Category> categories = categoryService.getCategoriesByIDs(newGameDTO.getCategoriesIDs());
        Game newGame = newGameDTO.toGame(categories);
        newGame.setGameStatus(gameStatusService.getGameStatus("Pending"));
        gameRepository.save(newGame);
        return newGame;
    }

    public Game getGame(long id) throws GameDoesNotExistException{
        Optional<Game> gameOptional = gameRepository.findByIdAndAccepted(id);
        if (gameOptional.isEmpty() || !gameOptional.get().getGameStatus().getStatus().equals("Accepted"))
            throw new GameDoesNotExistException("Game (id = "+id+") does not exists");
        return gameOptional.get();
    }

    public ResultsDTO<Game> getGames(int page, int size, Optional<String> search, Optional<List<Integer>> categoriesIds) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Game> gamePage;
        if (search.isEmpty()) {
            if (categoriesIds.isEmpty()) {
                gamePage = gameRepository.getAllAccepted(pageable);
            } else {
                gamePage = gameRepository.getAllByAcceptedAndCategoriesIn(pageable, categoriesIds.get());
            }
        } else {
            if (categoriesIds.isEmpty()) {
                gamePage = gameRepository.searchAllByNameContains(search.get().toLowerCase(), pageable);
            } else {
                gamePage = gameRepository.searchAllByNameContainsAndAcceptedAndCategoriesIn(search.get().toLowerCase(), categoriesIds.get(), pageable);
            }
        }
        return new ResultsDTO<>(gamePage.stream().toList(), new Pagination(gamePage.getTotalElements(), gamePage.getTotalPages()));
    }

    public void rejectGame(Authentication authentication, long id) throws GameAlreadyRejectedException, GameDoesNotExistException, IllegalAccessException, UserDoesNotExistException {
        if (!roleService.checkIfAdmin(authentication))
            throw new IllegalAccessException();
        Optional<Game> optionalGame = gameRepository.findGameById(id);
        if (optionalGame.isEmpty())
            throw new GameDoesNotExistException("Game (id = "+id+") does not exists");
        Game game = optionalGame.get();
        if (game.getGameStatus().getStatus().equals("Rejected"))
            throw new GameAlreadyRejectedException("Game (id = "+id+") has been already rejected.");
        else {
            game.setGameStatus(gameStatusService.getGameStatus("Rejected"));
            gameRepository.save(game);
        }
    }

    public void acceptGame(Authentication authentication, long id) throws GameDoesNotExistException,
            GameAlreadyAcceptedException, UserDoesNotExistException, IllegalAccessException, GameAlreadyRejectedException {
        if (!roleService.checkIfAdmin(authentication))
            throw new IllegalAccessException();
        Optional<Game> optionalGame = gameRepository.findGameById(id);
        if (optionalGame.isEmpty())
            throw new GameDoesNotExistException("Game (id = "+id+") does not exists");
        Game game = optionalGame.get();
        if (game.getGameStatus().getStatus().equals("Accepted"))
            throw new GameAlreadyAcceptedException("Game (id = "+id+") has been already accepted.");
        else {
            game.setGameStatus(gameStatusService.getGameStatus("Accepted"));
            gameRepository.save(game);
        }
    }

    public long getAmount(){
        return gameRepository.count();
    }
}
