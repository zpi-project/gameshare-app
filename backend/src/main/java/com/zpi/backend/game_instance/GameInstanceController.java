package com.zpi.backend.game_instance;

import com.zpi.backend.category.exception.CategoryDoesNotExistException;
import com.zpi.backend.dto.ResultsDTO;
import com.zpi.backend.exception_handlers.BadRequestException;
import com.zpi.backend.game.exception.GameDoesNotExistException;
import com.zpi.backend.game_instance.dto.*;
import com.zpi.backend.game_instance.exception.GameInstanceDoesNotExistException;
import com.zpi.backend.game_instance.exception.GameInstanceStatusException;
import com.zpi.backend.game_instance_image.exception.GameInstanceImageDoesNotExistException;
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

import static org.springframework.web.bind.annotation.RequestMethod.*;

@RestController
@AllArgsConstructor
@RequestMapping("/game-instances")
@CrossOrigin("${FRONTEND_HOST}:${FRONTEND_PORT}")
public class GameInstanceController {
  GameInstanceService gameInstanceService;

    @Operation(
            summary = "Add a new game instance",
            description = "Adds a new active Game Instance to the database. " +
                    "The User who invokes this endpoint becomes the owner of the Game Instance."
    )
    @PreAuthorize("isAuthenticated()")
    @RequestMapping(method = POST)
    public ResponseEntity<GameInstanceDTO> addGameInstance(@RequestBody NewGameInstanceDTO newGameInstanceDTO, Authentication authentication)
            throws UserDoesNotExistException, GameDoesNotExistException, BadRequestException {
        GameInstanceDTO gameInstance = gameInstanceService.addGameInstance(newGameInstanceDTO, authentication);
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
    public ResponseEntity<GameInstanceDTO> updateGameInstance(@PathVariable String uuid,@RequestBody UpdatedGameInstanceDTO updatedGameInstanceDTO,
                                             Authentication authentication) throws GameInstanceDoesNotExistException, BadRequestException, UserDoesNotExistException {
        GameInstanceDTO gameInstance = gameInstanceService.updateGameInstance(uuid, updatedGameInstanceDTO, authentication);
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
            throws GameInstanceDoesNotExistException, UserDoesNotExistException, GameInstanceImageDoesNotExistException {
        gameInstanceService.deleteGameInstance(uuid, authentication);
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
            throws GameInstanceStatusException, GameInstanceDoesNotExistException, UserDoesNotExistException {
        gameInstanceService.activate(gameInstanceUUID, authentication);
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
            throws GameInstanceStatusException, GameInstanceDoesNotExistException, UserDoesNotExistException {
        gameInstanceService.deactivate(gameInstanceUUID, authentication);
        return ResponseEntity.status(HttpStatus.OK)
                .build();
    }

    @Operation(
            summary = "Get a game instance by UUID",
            description = "Returns a Game Instance from the database by its UUID."
    )
    @RequestMapping(value = "/{gameInstanceUUID}", method = GET)
    public ResponseEntity<GameInstanceDetailsDTO> getGameInstance(@PathVariable String gameInstanceUUID,
                                                                  Authentication authentication)
            throws GameInstanceDoesNotExistException {
        return ResponseEntity.status(HttpStatus.OK)
                .body(gameInstanceService.getGameInstance(gameInstanceUUID, authentication));
    }

    @Operation(
            summary = "Get logged in user's game instances",
            description = "Returns all logged User's Game Instances from the database."
    )
    @PreAuthorize("isAuthenticated()")
    @RequestMapping(method = GET)
    public ResponseEntity<ResultsDTO<GameInstanceDTO>> getMyGameInstances(@RequestParam Optional<String> searchName,
                                                                              @RequestParam int size, @RequestParam int page,
                                                                              Authentication authentication)
            throws UserDoesNotExistException {
        return ResponseEntity.status(HttpStatus.OK)
                .body(gameInstanceService.getMyGameInstances(searchName, size, page, authentication));
    }

    @Operation(
            summary = "Get game instances by userUUID",
            description = "Returns the Game Instances of a User from the database, identified by user's userUUID"
    )
    @RequestMapping(value = "/user/{userUUID}", method = GET)
    public ResponseEntity<ResultsDTO<GameInstanceDTO>> getUserGameInstances(@PathVariable String userUUID, @RequestParam Optional<String> searchName,
                                                                         @RequestParam int size, @RequestParam int page) throws UserDoesNotExistException {
        return ResponseEntity.status(HttpStatus.OK)
                .body(gameInstanceService.getUserGameInstances(userUUID, searchName, size, page, false));
    }

    @Operation(
            summary = "Get game instances using filters",
            description = "Returns Game Instances filtered by name, category, age, players number, availability" +
                    "and sorted by distance (calculated by latitude and longitude) from the database."
    )
    @RequestMapping(method = GET, value="/search")
    public ResponseEntity<ResultsDTO<SearchGameInstanceDTO>>  getGameInstances(Authentication authentication, @RequestParam Optional<String> searchName, @RequestParam Optional<Long> categoryId,
                                                                               @RequestParam Optional<Integer> age, @RequestParam Optional<Integer> playersNumber, @RequestParam Optional<Integer> maxPricePerDay,
                                                                               @RequestParam Optional<String> userUUID, @RequestParam double latitude, @RequestParam double longitude, @RequestParam int size, @RequestParam int page)
            throws CategoryDoesNotExistException {
        return ResponseEntity.status(HttpStatus.OK)
                .body(gameInstanceService.getGameInstances(authentication, size, page, searchName, categoryId, age, playersNumber, maxPricePerDay, userUUID, latitude, longitude));
    }

    @Operation(
            summary ="Gets game instance unavailability periods",
            description = "Returns game instance unavailability periods " +
                    "can be called by anyone"
    )
    @GetMapping(value="/{uuid}/avaliability")
    public ResponseEntity<List<GameInstanceUnAvailabilityDTO>> getGameInstanceUnAvaliability(@PathVariable String uuid, @RequestParam String year, @RequestParam String month) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(gameInstanceService.getGameInstanceAvailability(uuid,year,month,false));
    }

    @Operation(
            summary ="Gets game instance unavailability periods",
            description = "Returns game instance unavailability periods and reservation uuid " +
                    "can be called by owner of the game instance"
    )
    @GetMapping(value="/{uuid}/reservations")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<List<GameInstanceUnAvailabilityDTO>> getGameInstanceReservations(@PathVariable String uuid, @RequestParam String year, @RequestParam String month, Authentication authentication) throws GameInstanceDoesNotExistException, UserDoesNotExistException {
        return ResponseEntity.status(HttpStatus.OK)
                .body(gameInstanceService.getGameInstanceAvailabilityReservation(authentication,uuid,year,month));
    }

}
