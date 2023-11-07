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
import com.zpi.backend.user.UserGameGuestDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

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

    // TODO Getting popular games (considering reservations)
    public ResultsDTO<Game> getPopularGames(int page, int size){
        Pageable pageable = PageRequest.of(page, size);
        Page<Game> gamePage = gameRepository.getAllAccepted(pageable);
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

    public ResultsDTO<UserWithGameOpinionDTO> getUsersAndGameInstancesWithGame(long gameId, double latitude, double longitude,
                                                                               int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Object[]> objectsPage = gameRepository.getAllUsersWithGameAndRating(gameId, latitude, longitude, pageable);
        List<UserWithGameOpinionDTO> userWithGameDTOPage =
                objectsPage.stream()
                        .map(this::convertToDTO)
                        .toList();
        return new ResultsDTO<>(userWithGameDTOPage,
                new Pagination(objectsPage.getTotalElements(), objectsPage.getTotalPages()));
    }

    private UserWithGameOpinionDTO convertToDTO(Object[] columns) {
        UserWithGameOpinionDTO dto = new UserWithGameOpinionDTO();
        dto.setUser(new UserGameGuestDTO(
                (String) columns[0],
                (String) columns[1],
                (String) columns[2],
                (Double) columns[3],
                (Double) columns[4],
                (String) columns[5]
        ));
        dto.setUserRate(((BigDecimal) columns[6]).doubleValue());
        dto.setGameInstanceUUID((String) columns[7]);
        dto.setGameName((String) columns[8]);
        dto.setGameInstanceRate(((BigDecimal) columns[9]).doubleValue());
        return dto;
    }
}
