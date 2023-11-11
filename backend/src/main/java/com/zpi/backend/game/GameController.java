package com.zpi.backend.game;

import com.zpi.backend.category.CategoryDoesNotExistException;
import com.zpi.backend.dto.Amount;
import com.zpi.backend.dto.ResultsDTO;
import com.zpi.backend.exception_handlers.BadRequestException;
import com.zpi.backend.user.UserDoesNotExistException;
import io.swagger.v3.oas.annotations.Operation;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("${FRONTEND_HOST}:${FRONTEND_PORT}")
@RequestMapping("/games")
@AllArgsConstructor
public class GameController {
    GameService gameService;

    @Operation(
            summary = "Add a new game",
            description = "Adds a new unaccepted Game to database."
    )
    @PostMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Game> addGame(@RequestBody NewGameDTO newGameDTO) throws GameAlreadyExistsException, BadRequestException, CategoryDoesNotExistException {
        System.out.println("... called addGame");
        Game newGame = gameService.addGame(newGameDTO);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(newGame);
    }

    @Operation(
            summary = "Get games",
            description = "Returns paginated games from database. Optional filtering by name and categories."
    )
    @GetMapping
    public ResponseEntity<ResultsDTO<Game>> getGames(@RequestParam int page, @RequestParam int size, @RequestParam Optional<String> search,
                                   @RequestParam Optional<List<Integer>> categoriesIds) {
        System.out.println("... called getGames");
        ResultsDTO<Game> games = gameService.getGames(page, size, search, categoriesIds);
        return ResponseEntity.status(HttpStatus.OK)
                .body(games);
    }

    @Operation(
            summary = "Get a game by id",
            description = "Returns Game from database by its id."
    )
    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public ResponseEntity<Game> getGame(@PathVariable long id) throws GameDoesNotExistException {
        System.out.println("... called getGame("+id+")");
        Game game = gameService.getGame(id);
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
            throws GameDoesNotExistException, GameAlreadyAcceptedException, UserDoesNotExistException, IllegalAccessException, GameAlreadyRejectedException {
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
