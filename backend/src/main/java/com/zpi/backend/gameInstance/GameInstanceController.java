package com.zpi.backend.gameInstance;

import com.zpi.backend.dto.ResultsDTO;
import com.zpi.backend.game.GameDoesNotExistException;
import com.zpi.backend.user.User;
import com.zpi.backend.user.UserDoesNotExistException;
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

    @PreAuthorize("isAuthenticated()")
    @RequestMapping(method = POST)
    public ResponseEntity<GameInstance> addGameInstance(NewGameInstanceDTO newGameInstanceDTO, Authentication authentication)
            throws UserDoesNotExistException, GameDoesNotExistException {
        String googleId = ((User)authentication.getPrincipal()).getGoogleId();
        GameInstance gameInstance = gameInstanceService.addGameInstance(newGameInstanceDTO, googleId);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(gameInstance);
    }

    @PreAuthorize("isAuthenticated()")
    @RequestMapping(value = "/{uuid}", method = PUT)
    public ResponseEntity<GameInstance> updateGameInstance(@PathVariable String uuid, UpdatedGameInstanceDTO updatedGameInstanceDTO,
                                             Authentication authentication) throws GameInstanceDoesNotExistException {
        String googleId = ((User)authentication.getPrincipal()).getGoogleId();
        GameInstance gameInstance = gameInstanceService.updateGameInstance(uuid, updatedGameInstanceDTO, googleId);
        return ResponseEntity.status(HttpStatus.OK)
                .body(gameInstance);
    }

    @PreAuthorize("isAuthenticated()")
    @RequestMapping(value = "/{uuid}", method = DELETE)
    public ResponseEntity deleteGameInstance(@PathVariable String uuid, Authentication authentication)
            throws GameInstanceDoesNotExistException {
        String googleId = ((User)authentication.getPrincipal()).getGoogleId();
        gameInstanceService.deleteGameInstance(uuid, googleId);
        return ResponseEntity.status(HttpStatus.OK)
                .build();
    }

    @PreAuthorize("isAuthenticated()")
    @RequestMapping(value = "/activate/{gameInstanceUUID}", method = PATCH)
    public ResponseEntity activate(@PathVariable String gameInstanceUUID, Authentication authentication)
            throws GameInstanceStatusException, GameInstanceDoesNotExistException {
        String googleId = ((User)authentication.getPrincipal()).getGoogleId();
        gameInstanceService.activate(gameInstanceUUID, googleId);
        return ResponseEntity.status(HttpStatus.OK)
                .build();
    }

    @PreAuthorize("isAuthenticated()")
    @RequestMapping(value = "/deactivate/{gameInstanceUUID}", method = PATCH)
    public ResponseEntity deactivate(@PathVariable String gameInstanceUUID, Authentication authentication)
            throws GameInstanceStatusException, GameInstanceDoesNotExistException {
        String googleId = ((User)authentication.getPrincipal()).getGoogleId();
        gameInstanceService.deactivate(gameInstanceUUID, googleId);
        return ResponseEntity.status(HttpStatus.OK)
                .build();
    }

    // TODO Is authenticated?
    @PreAuthorize("isAuthenticated()")
    @RequestMapping(value = "/{gameInstanceUUID}", method = GET)
    public ResponseEntity<GameInstance> getGameInstance(@PathVariable String gameInstanceUUID)
            throws GameInstanceDoesNotExistException {
        return ResponseEntity.status(HttpStatus.OK)
                .body(gameInstanceService.getGameInstance(gameInstanceUUID));
    }

    // TODO Is authenticated?
//    @PreAuthorize("isAuthenticated()")
    @RequestMapping(value = "/{userUUID}", method = GET)
    public ResponseEntity<ResultsDTO<GameInstance>> getUserGameInstances(@PathVariable String userUUID,
                                                                         @RequestParam int size, @RequestParam int page) throws UserDoesNotExistException {
        return ResponseEntity.status(HttpStatus.OK)
                .body(gameInstanceService.getUserGameInstances(userUUID, size, page));
    }

    // TODO Is authenticated?
//    @PreAuthorize("isAuthenticated()")
    // TODO getGameInstances with filtering
    @RequestMapping(method = GET)
    public ResponseEntity<ResultsDTO<GameInstance>>  getGameInstances(@RequestParam int size, @RequestParam int page, @RequestParam Optional<List<Long>> categoriesIds,
                                           @RequestParam Optional<Integer> age, @RequestParam Optional<Integer> playersNumber,
                                           @RequestParam double latitude, @RequestParam double longitude){
        return ResponseEntity
                .status(HttpStatus.NOT_IMPLEMENTED)
                .body(null);
//        return ResponseEntity.status(HttpStatus.OK)
//                .body(gameInstanceService.getGameInstances(size, page, categoriesIds, age, playersNumber, latitude, longitude));
    }

    // TODO Is authenticated?
//    @PreAuthorize("isAuthenticated()")
    @RequestMapping(value="/{gameName}",method = GET)
    public ResponseEntity<ResultsDTO<GameInstance>>  getGameInstancesByName(@PathVariable String gameName, @RequestParam int size, @RequestParam int page,
                                                 @RequestParam double latitude, @RequestParam double longitude,
                                                 Authentication authentication){
        return ResponseEntity.status(HttpStatus.OK)
                .body(gameInstanceService.getGameInstancesByName(size, page, gameName, latitude, longitude));
    }


}
