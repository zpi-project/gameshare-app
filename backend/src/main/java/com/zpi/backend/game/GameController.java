package com.zpi.backend.game;

import com.zpi.backend.category.exception.CategoryDoesNotExistException;
import com.zpi.backend.dto.Amount;
import com.zpi.backend.dto.ResultsDTO;
import com.zpi.backend.exception_handlers.BadRequestException;
import com.zpi.backend.game.dto.GameDTO;
import com.zpi.backend.game.dto.NewGameDTO;
import com.zpi.backend.game.dto.UserWithGameOpinionDTO;
import com.zpi.backend.game.exception.GameAlreadyAcceptedException;
import com.zpi.backend.game.exception.GameAlreadyExistsException;
import com.zpi.backend.game.exception.GameAlreadyRejectedException;
import com.zpi.backend.game.exception.GameDoesNotExistException;
import com.zpi.backend.user.exception.UserDoesNotExistException;
import io.swagger.v3.oas.annotations.Operation;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@AllArgsConstructor
@CrossOrigin("${FRONTEND_HOST}:${FRONTEND_PORT}")
@RequestMapping("/games")
public class GameController {
    GameService gameService;

    @Operation(
            summary = "Add a new game",
            description = "Adds a new unaccepted Game to database."
    )
    @PostMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<GameDTO> addGame(@RequestBody NewGameDTO newGameDTO) throws GameAlreadyExistsException, BadRequestException, CategoryDoesNotExistException {
        System.out.println("... called addGame");
        GameDTO newGame = gameService.addGame(newGameDTO);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(newGame);
    }

    @Operation(
            summary = "Get games",
            description = "Returns paginated games from database. Optional filtering by name and categories."
    )
    @GetMapping
    public ResponseEntity<ResultsDTO<GameDTO>> getGames(@RequestParam int page, @RequestParam int size, @RequestParam Optional<String> search,
                                   @RequestParam Optional<List<Integer>> categoriesIds) {
        System.out.println("... called getGames");
        ResultsDTO<GameDTO> games = gameService.getGames(page, size, search, categoriesIds);
        return ResponseEntity.status(HttpStatus.OK)
                .body(games);
    }

    @Operation(
            summary = "Get a game by id",
            description = "Returns Game from database by its id."
    )
    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public ResponseEntity<GameDTO> getGame(@PathVariable long id) throws GameDoesNotExistException {
        System.out.println("... called getGame("+id+")");
        GameDTO game = gameService.getGameDTO(id);
        return ResponseEntity.status(HttpStatus.OK)
                .body(game);
    }

    @Operation(
            summary = "Accept a game by id",
            description = "Changes status value of a Game identified by its id to Accepted. Only Admin is allowed to do this operation."
    )
    @PreAuthorize("isAuthenticated()")
    @RequestMapping(value = "/{id}/accept", method = RequestMethod.PUT)
    public ResponseEntity acceptGame(Authentication authentication, @PathVariable long id)
            throws GameDoesNotExistException, GameAlreadyAcceptedException, UserDoesNotExistException, IllegalAccessException {
        System.out.println("... called acceptGame("+id+")");
        gameService.acceptGame(authentication, id);
        return ResponseEntity.status(HttpStatus.OK)
                .build();
    }
    @Operation(
            summary = "Reject a game by id",
            description = "Changes status value of a Game identified by its id to Rejected. Only Admin is allowed to do this operation."
    )
    @PreAuthorize("isAuthenticated()")
    @RequestMapping(value = "{id}/reject", method = RequestMethod.PUT)
    public ResponseEntity rejectGame(Authentication authentication, @PathVariable long id)
            throws GameDoesNotExistException, UserDoesNotExistException, IllegalAccessException, GameAlreadyRejectedException {
        System.out.println("... called acceptGame("+id+")");
        gameService.rejectGame(authentication, id);
        return ResponseEntity.status(HttpStatus.OK)
                .build();
    }

    @Operation(
            summary = "Get popular games",
            description = "Returns paginated popular games from database. [Not implemented] Popularity is calculated considering reservations."
    )
    @GetMapping(value = "/popular")
    public ResponseEntity<ResultsDTO<GameDTO>> getPopularGames(@RequestParam int page, @RequestParam int size) {
        System.out.println("... called getPopularGames");
        ResultsDTO<GameDTO> games = gameService.getGames(page, size, Optional.empty(), Optional.empty());
        return ResponseEntity.status(HttpStatus.OK)
                .body(games);
    }

    @Operation(
            summary = "Get users' rating with game by id",
            description = "Returns paginated user data along with their rating based on User Opinions and their Game Instance rating from database. [Note: Calculating game instance opinions is NOT IMPLEMENTED yet]."
    )
    @GetMapping(value = "/{gameId}/users")
    public ResponseEntity<ResultsDTO<UserWithGameOpinionDTO>> getUsersAndGameInstancesWithGame(
            @PathVariable long gameId, @RequestParam double latitude, @RequestParam double longitude,
            @RequestParam int page, @RequestParam int size) {
        System.out.println("... called getUsersAndGameInstancesWithGame");
        ResultsDTO<UserWithGameOpinionDTO> userWithGames =
                gameService.getUsersAndGameInstancesWithGame(gameId, latitude, longitude, page, size);
        return ResponseEntity.status(HttpStatus.OK)
                .body(userWithGames);
    }

    @Operation(
            summary = "Get amount of games",
            description = "Returns amount of Games in database."
    )
    @RequestMapping(method = RequestMethod.GET, value = "/amount")
    public ResponseEntity<Amount> getAmount(){
        System.out.println("... called getAmountOfGames");
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new Amount(gameService.getAmount()));
    }
}
