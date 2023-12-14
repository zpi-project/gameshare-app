package com.zpi.backend.game_instance;

import com.zpi.backend.category.exception.CategoryDoesNotExistException;
import com.zpi.backend.dto.ResultsDTO;
import com.zpi.backend.exception_handlers.BadRequestException;
import com.zpi.backend.game.exception.GameDoesNotExistException;
import com.zpi.backend.game_instance.dto.*;
import com.zpi.backend.game_instance.exception.GameInstanceDoesNotExistException;
import com.zpi.backend.game_instance.exception.GameInstanceStatusException;
import com.zpi.backend.user.exception.UserDoesNotExistException;
import io.swagger.v3.oas.annotations.Operation;
import lombok.AllArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import static org.springframework.web.bind.annotation.RequestMethod.*;

@RestController
@AllArgsConstructor
@RequestMapping("/game-instances")
//@CrossOrigin("${FRONTEND_HOST}:${FRONTEND_PORT}")
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
      System.out.println("... called addGameInstance");
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
      System.out.println("... called updateGameInstance");
        GameInstanceDTO gameInstance = gameInstanceService.updateGameInstance(uuid, updatedGameInstanceDTO, authentication);
        return ResponseEntity.status(HttpStatus.OK)
                .body(gameInstance);
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
      System.out.println("... called activate");
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
      System.out.println("... called deactivate");
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
      System.out.println("... called getGameInstance");
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
                                                                          @RequestParam(defaultValue = "0") int page,
                                                                          @RequestParam(defaultValue = "10") int size,
                                                                              Authentication authentication)
            throws UserDoesNotExistException {
      System.out.println("... called getMyGameInstances");
        return ResponseEntity.status(HttpStatus.OK)
                .body(gameInstanceService.getMyGameInstances(searchName, size, page, authentication));
    }

    @Operation(
            summary = "Get game instances by userUUID",
            description = "Returns the Game Instances of a User from the database, identified by user's userUUID"
    )
    @RequestMapping(value = "/user/{userUUID}", method = GET)
    public ResponseEntity<ResultsDTO<GameInstanceDTO>> getUserGameInstances(@PathVariable String userUUID, @RequestParam Optional<String> searchName,
                                                                            @RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size)
            throws UserDoesNotExistException {
      System.out.println("... called getUserGameInstances");
        return ResponseEntity.status(HttpStatus.OK)
                .body(gameInstanceService.getUserGameInstances(userUUID, searchName, size, page, true));
    }

    @Operation(
            summary = "Get game instances using filters",
            description = "Returns Game Instances filtered by name, category, age, players number, availability" +
                    "and sorted by distance (calculated by latitude and longitude) from the database."
    )
    @RequestMapping(method = GET, value="/search")
    public ResponseEntity<ResultsDTO<SearchGameInstanceDTO>>  getGameInstances(Authentication authentication, @RequestParam Optional<String> searchName, @RequestParam Optional<Long> categoryId,
                                                                               @RequestParam Optional<Integer> age, @RequestParam Optional<Integer> playersNumber, @RequestParam Optional<Integer> maxPricePerDay,
                                                                               @RequestParam Optional<String> userUUID, @RequestParam double latitude, @RequestParam double longitude, @RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size)
            throws CategoryDoesNotExistException {
      System.out.println("... called getGameInstances");
        return ResponseEntity.status(HttpStatus.OK)
                .body(gameInstanceService.getGameInstances(authentication, size, page, searchName, categoryId, age, playersNumber, maxPricePerDay, userUUID, latitude, longitude));
    }

    @Operation(
            summary ="Gets game instance unavailability periods",
            description = "Returns game instance unavailability periods " +
                    "can be called by anyone"
    )
    @GetMapping(value="/{uuid}/availability")
    public ResponseEntity<List<GameInstanceUnAvailabilityDTO>> getGameInstanceUnAvailability(@PathVariable String uuid, @RequestParam int year, @RequestParam int month) throws GameInstanceDoesNotExistException {
      System.out.println("... called getGameInstanceUnAvailability");
        return ResponseEntity.status(HttpStatus.OK)
                .body(gameInstanceService.getGameInstanceUnavailability(uuid,year,month,false));
    }

    @Operation(
            summary ="Gets game instance unavailability periods",
            description = "Returns game instance unavailability periods and reservation uuid " +
                    "can be called by owner of the game instance"
    )
    @RequestMapping(method = GET,value="/{uuid}/reservations")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<List<GameInstanceUnAvailabilityDTO>> getGameInstanceReservations(@PathVariable String uuid, @RequestParam int year, @RequestParam int month, Authentication authentication)
            throws GameInstanceDoesNotExistException, UserDoesNotExistException {
      System.out.println("... called getGameInstanceReservations");
        return ResponseEntity.status(HttpStatus.OK)
                .body(gameInstanceService.getGameInstanceUnavailabilityReservation(authentication,uuid,year,month));
    }

    @Operation(
            summary ="Checks if game instance can be reserved",
            description = "Returns true if game instance can be reserved in given time frame " +
                    "can be called by anyone"
    )
    @RequestMapping(method= GET,value = "/{uuid}/timeframes/available")
    public ResponseEntity<Boolean> canMakeReservation(@PathVariable String uuid,
                                                      @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") Date startDate,
                                                      @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") Date endDate)  {
      System.out.println("... called canMakeReservation");
        return ResponseEntity.status(HttpStatus.OK)
                .body(gameInstanceService.canMakeReservation(uuid, startDate, endDate));
    }

  @Operation(
          summary ="Check if Game Instance has future reservations",
          description = "Returns true if game instance has any future reservations. " +
                  "Can be called only by Owner of the Game Instance."
  )
  @PreAuthorize("isAuthenticated()")
  @RequestMapping(method= GET,value = "/{gameInstanceUUID}/deactivate/reservations")
  public ResponseEntity<Boolean> checkGameInstanceFutureReservations(Authentication authentication, @PathVariable String gameInstanceUUID)
          throws GameInstanceDoesNotExistException, UserDoesNotExistException {
    System.out.println("... called checkGameInstanceFutureReservations");
    return ResponseEntity.status(HttpStatus.OK)
            .body(gameInstanceService.hasFutureReservations(authentication, gameInstanceUUID));
  }

}
