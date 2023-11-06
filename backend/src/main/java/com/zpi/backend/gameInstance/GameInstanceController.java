package com.zpi.backend.gameInstance;

import com.zpi.backend.dto.ResultsDTO;
import com.zpi.backend.game.GameDoesNotExistException;
import com.zpi.backend.user.User;
import com.zpi.backend.user.UserDoesNotExistException;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

import static org.springframework.web.bind.annotation.RequestMethod.*;

@RestController
@RequestMapping("/game-instances")
@CrossOrigin("${FRONTEND_HOST}:${FRONTEND_PORT}")
public class GameInstanceController {
    @Autowired
    GameInstanceService gameInstanceService;

    @Operation(
            summary = "Add a new game instance",
            description = "Adds a new active Game Instance to the database. " +
                    "The User who invokes this endpoint becomes the owner of the Game Instance."
    )
    @PreAuthorize("isAuthenticated()")
    @RequestMapping(method = POST)
    public ResponseEntity<GameInstanceDTO> addGameInstance(NewGameInstanceDTO newGameInstanceDTO, Authentication authentication)
            throws UserDoesNotExistException, GameDoesNotExistException {
        String googleId = ((User)authentication.getPrincipal()).getGoogleId();
        GameInstanceDTO gameInstance = gameInstanceService.addGameInstance(newGameInstanceDTO, googleId);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(gameInstance);
    }

    @Operation(
            summary = "Update a game instance by UUID",
            description = "Modifies a Game Instance identified by its UUID." +
                    "The User who invokes this endpoint must be the owner of the Game Instance"
    )
    @PreAuthorize("isAuthenticated()")
    @RequestMapping(value = "/{uuid}", method = PUT)
    public ResponseEntity<GameInstanceDTO> updateGameInstance(@PathVariable String uuid, UpdatedGameInstanceDTO updatedGameInstanceDTO,
                                             Authentication authentication) throws GameInstanceDoesNotExistException {
        String googleId = ((User)authentication.getPrincipal()).getGoogleId();
        GameInstanceDTO gameInstance = gameInstanceService.updateGameInstance(uuid, updatedGameInstanceDTO, googleId);
        return ResponseEntity.status(HttpStatus.OK)
                .body(gameInstance);
    }

    @Operation(
            summary = "Delete a game instance by UUID",
            description = "Removes a Game Instance identified by its UUID." +
                    "The User who invokes this endpoint must be the owner of the Game Instance"
    )
    @PreAuthorize("isAuthenticated()")
    @RequestMapping(value = "/{uuid}", method = DELETE)
    public ResponseEntity deleteGameInstance(@PathVariable String uuid, Authentication authentication)
            throws GameInstanceDoesNotExistException {
        String googleId = ((User)authentication.getPrincipal()).getGoogleId();
        gameInstanceService.deleteGameInstance(uuid, googleId);
        return ResponseEntity.status(HttpStatus.OK)
                .build();
    }

    @Operation(
            summary = "Activate a game instance by UUID",
            description = "Changes the activate value of a Game Instance identified by its UUID to True. " +
                    "Only the owner of the Game Instance is permitted to perform this operation."
    )
    @PreAuthorize("isAuthenticated()")
    @RequestMapping(value = "/{gameInstanceUUID}/activate", method = PATCH)
    public ResponseEntity activate(@PathVariable String gameInstanceUUID, Authentication authentication)
            throws GameInstanceStatusException, GameInstanceDoesNotExistException {
        String googleId = ((User)authentication.getPrincipal()).getGoogleId();
        gameInstanceService.activate(gameInstanceUUID, googleId);
        return ResponseEntity.status(HttpStatus.OK)
                .build();
    }

    @Operation(
            summary = "Deactivate a game instance by UUID",
            description = "Changes the activate value of a Game Instance identified by its UUID to False. " +
                    "Only the owner of the Game Instance is permitted to perform this operation."
    )
    @PreAuthorize("isAuthenticated()")
    @RequestMapping(value = "/{gameInstanceUUID}/deactivate", method = PATCH)
    public ResponseEntity deactivate(@PathVariable String gameInstanceUUID, Authentication authentication)
            throws GameInstanceStatusException, GameInstanceDoesNotExistException {
        String googleId = ((User)authentication.getPrincipal()).getGoogleId();
        gameInstanceService.deactivate(gameInstanceUUID, googleId);
        return ResponseEntity.status(HttpStatus.OK)
                .build();
    }

    @Operation(
            summary = "Get a game instance by UUID",
            description = "Returns a Game Instance from the database by its UUID."
    )
    @RequestMapping(value = "/{gameInstanceUUID}", method = GET)
    public ResponseEntity<GameInstanceDTO> getGameInstance(@PathVariable String gameInstanceUUID,
                                                           Authentication authentication)
            throws GameInstanceDoesNotExistException {
        return ResponseEntity.status(HttpStatus.OK)
                .body(gameInstanceService.getGameInstance(gameInstanceUUID, authentication));
    }

    @Operation(
            summary = "Get game instances by userUUID",
            description = "Returns the Game Instances of a User from the database, identified by user's userUUID"
    )
    @RequestMapping(value = "/user/{userUUID}", method = GET)
    public ResponseEntity<ResultsDTO<GameInstanceListDTO>> getUserGameInstances(@PathVariable String userUUID, @RequestParam Optional<String> searchName,
                                                                         @RequestParam int size, @RequestParam int page) throws UserDoesNotExistException {
        return ResponseEntity.status(HttpStatus.OK)
                .body(gameInstanceService.getUserGameInstances(userUUID, searchName, size, page));
    }

    @Operation(
            summary = "[Not implemented] Get game instances using filters",
            description = "Returns Game Instances filtered by categories, age, players number, " +
                    "and sorted by distance (calculated by latitude and longitude) from the database."
    )
    // TODO getGameInstances with filtering
    @RequestMapping(method = GET, value="/search")
    public ResponseEntity<ResultsDTO<GameInstanceListDTO>>  getGameInstances(@RequestParam Optional<String> searchName, @RequestParam Optional<Long> categoryId,
                                           @RequestParam Optional<Integer> age, @RequestParam Optional<Integer> playersNumber,
                                           @RequestParam double latitude, @RequestParam double longitude, @RequestParam int size, @RequestParam int page){
//        return ResponseEntity
//                .status(HttpStatus.NOT_IMPLEMENTED)
//                .body(null);
        return ResponseEntity.status(HttpStatus.OK)
                .body(gameInstanceService.getGameInstances(size, page, searchName, categoryId, age, playersNumber, latitude, longitude));
    }

    @Operation(
            summary = "[Not implemented] Get game instance's opinions by game instance's uuid",
            description = "Returns the Game Instances Opinions from the database, identified by Game Instance's uuid"
    )
    @RequestMapping(value = "/{gameInstanceUUID}/opinions", method = GET)
    public ResponseEntity getGameInstanceOpinions(@PathVariable String gameInstanceUUID,
                                                                         @RequestParam int size, @RequestParam int page) {
        return ResponseEntity
                .status(HttpStatus.NOT_IMPLEMENTED)
                .body(null);
    }


}
