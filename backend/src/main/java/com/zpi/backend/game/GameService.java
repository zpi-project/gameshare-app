package com.zpi.backend.game;

import com.zpi.backend.category.Category;
import com.zpi.backend.category.exception.CategoryDoesNotExistException;
import com.zpi.backend.category.CategoryService;
import com.zpi.backend.dto.Pagination;
import com.zpi.backend.dto.ResultsDTO;
import com.zpi.backend.email.EmailService;
import com.zpi.backend.email_type.EmailTypeService;
import com.zpi.backend.email_type.exceptions.EmailTypeDoesNotExists;
import com.zpi.backend.exception_handlers.BadRequestException;
import com.zpi.backend.game.dto.GameDTO;
import com.zpi.backend.game.dto.NewGameDTO;
import com.zpi.backend.game.exception.GameAlreadyAcceptedException;
import com.zpi.backend.game.exception.GameAlreadyExistsException;
import com.zpi.backend.game.exception.GameAlreadyRejectedException;
import com.zpi.backend.game.exception.GameDoesNotExistException;
import com.zpi.backend.game_status.GameStatusService;
import com.zpi.backend.role.RoleService;
import com.zpi.backend.role.Roles;
import com.zpi.backend.user.User;
import com.zpi.backend.user.UserService;
import com.zpi.backend.user.exception.UserDoesNotExistException;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class GameService {
    private final GameRepository gameRepository;
    private final CategoryService categoryService;
    private final RoleService roleService;
    private final GameStatusService gameStatusService;
    private final EmailService emailService;
    private final EmailTypeService emailTypeService;
    private final UserService userService;

    public GameDTO addGame(NewGameDTO newGameDTO,Authentication authentication) throws GameAlreadyExistsException, BadRequestException, CategoryDoesNotExistException, IOException, EmailTypeDoesNotExists, UserDoesNotExistException {
        newGameDTO.validate();
        User user = userService.getUser(authentication);
        if (gameRepository.existsGameByName(newGameDTO.getName()))
            throw new GameAlreadyExistsException("Game "+newGameDTO.getName()+" already exists");
        List<Category> categories = categoryService.getCategoriesByIDs(newGameDTO.getCategoriesIDs());
        Game newGame = newGameDTO.toGame(categories);

        if(Roles.valueOf(user.getRole().getName()).equals(Roles.user)){
            newGame.setGameStatus(gameStatusService.getGameStatus("Pending"));
            Context context = emailService.getNewGameEmailContext(newGame.getName());
            emailService.sendEmailToAdminsWithHtmlTemplate(
                    context.getVariable("pl_title").toString(),
                    EmailService.EMAIL_TEMPLATE,
                    context,
                    emailTypeService.findEmailTypeByStatus("NEW_GAME")
            );
        } else if (Roles.valueOf(user.getRole().getName()).equals(Roles.admin)){
            newGame.setGameStatus(gameStatusService.getGameStatus("Accepted"));
        } else {
            throw new BadRequestException("User role is not valid");
        }

        gameRepository.save(newGame);
        return new GameDTO(newGame);
    }

    public Game getGame(long id) throws GameDoesNotExistException {
        Optional<Game> gameOptional = gameRepository.findByIdAndAccepted(id);
        if (gameOptional.isEmpty() || !gameOptional.get().getGameStatus().getStatus().equals("Accepted"))
            throw new GameDoesNotExistException("Game (id = "+id+") does not exists");
        return gameOptional.get();
    }

    public GameDTO getGameDTO(long id) throws GameDoesNotExistException{
        return new GameDTO(getGame(id));
    }

    public ResultsDTO<GameDTO> getGames(int page, int size, Optional<String> search, Optional<List<Integer>> categoriesIds) {
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
        return new ResultsDTO<>(gamePage
                .map(this::convertToDTO)
                .stream().toList(),
                new Pagination(gamePage.getTotalElements(), gamePage.getTotalPages()));
    }

    private GameDTO convertToDTO(Game game){
        return new GameDTO(game);
    }

    // TODO Getting popular games (considering reservations)
    public ResultsDTO<GameDTO> getPopularGames(int page, int size){
        Pageable pageable = PageRequest.of(page, size);
        Page<Game> gamePage = gameRepository.getPopularAcceptedGames(pageable);
        return new ResultsDTO<>(gamePage
                .map(this::convertToDTO)
                .stream().toList(),
                new Pagination(gamePage.getTotalElements(), gamePage.getTotalPages()));
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
            GameAlreadyAcceptedException, UserDoesNotExistException, IllegalAccessException {
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
