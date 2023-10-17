package com.zpi.backend.game;

import com.zpi.backend.category.CategoryDoesNotExistException;
import com.zpi.backend.exceptionHandlers.BadRequestException;
import org.hibernate.mapping.Array;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("http://localhost:5173")
@RequestMapping("/games")
public class GameController {
    @Autowired
    GameService gameService;

    @PostMapping
    public ResponseEntity addGame(@RequestBody NewGameDTO newGameDTO) throws GameAlreadyExistsException, BadRequestException, CategoryDoesNotExistException {
        System.out.println("... called addGame");
        Game newGame = gameService.addGame(newGameDTO);
        return ResponseEntity.status(HttpStatus.OK)
                .body(newGame);
    }

    @GetMapping
    public ResponseEntity getGames(@RequestParam int page, @RequestParam int size, @RequestParam Optional<String> search,
                                   @RequestParam Optional<List<Integer>> categoriesIds) {
        System.out.println("... called getGames");
        List<Game> games = gameService.getGames(page, size, search, categoriesIds);
        return ResponseEntity.status(HttpStatus.OK)
                .body(games);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public ResponseEntity getGame(@PathVariable long id) throws GameDoesNotExistException {
        System.out.println("... called getGame("+id+")");
        Game games = gameService.getGame(id);
        return ResponseEntity.status(HttpStatus.OK)
                .body(games);
    }
}
