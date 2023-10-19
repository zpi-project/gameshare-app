package com.zpi.backend.GameInstance;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("game-instance")
@CrossOrigin("${FRONTEND_HOST}:${FRONTEND_PORT}")
public class GameInstanceController {
    @Autowired
    GameInstanceService gameInstanceService;

    @PostMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity addGameInstance(GameInstanceDTO newGameInstanceDTO){
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(null);
    }

    @PutMapping
    @PreAuthorize("isAuthenticated()")
    @RequestMapping("/{uuid}")
    public ResponseEntity updateGameInstance(@PathVariable String uuid, GameInstanceDTO newGameInstanceDTO,
                                             Authentication authentication){
        return ResponseEntity.status(HttpStatus.OK)
                .body(null);
    }

    @DeleteMapping
    @PreAuthorize("isAuthenticated()")
    @RequestMapping("/{uuid}")
    public ResponseEntity deleteGameInstance(@PathVariable String uuid, Authentication authentication){
        return ResponseEntity.status(HttpStatus.OK)
                .build();
    }

    @GetMapping
    // TODO Is authenticated?
    @PreAuthorize("isAuthenticated()")
    @RequestMapping("/{uuid}")
    public ResponseEntity getGameInstance(@PathVariable String uuid, Authentication authentication){
        return ResponseEntity.status(HttpStatus.OK)
                .body(null);
    }

    @GetMapping
    // TODO Is authenticated?
    @PreAuthorize("isAuthenticated()")
    @RequestMapping("/{userUuid}")
    public ResponseEntity getUserGameInstances(@PathVariable String userUuid, @RequestParam int size, @RequestParam int page,
                                               Authentication authentication){
        return ResponseEntity.status(HttpStatus.OK)
                .body(null);
    }

    @GetMapping
    // TODO Is authenticated?
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity getGameInstances(@RequestParam int size, @RequestParam int page, @RequestParam Optional<List<Long>> categoryIds,
                                           @RequestParam Optional<Integer> age, @RequestParam Optional<Integer> playersNumber,
                                           @RequestParam Optional<String> name, @RequestParam double latitude,
                                           @RequestParam double longitude, Authentication authentication){
        return ResponseEntity.status(HttpStatus.OK)
                .body(null);
    }

    @GetMapping
    // TODO Is authenticated?
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity getGameInstancesByName(@RequestParam int size, @RequestParam int page, @RequestParam Optional<String> name,
                                                 @RequestParam double latitude, @RequestParam double longitude,
                                                 Authentication authentication){
        return ResponseEntity.status(HttpStatus.OK)
                .body(null);
    }


}
