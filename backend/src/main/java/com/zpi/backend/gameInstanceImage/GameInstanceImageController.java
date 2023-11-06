package com.zpi.backend.gameInstanceImage;

import com.zpi.backend.gameInstance.GameInstanceDoesNotExistException;
import com.zpi.backend.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import static org.springframework.web.bind.annotation.RequestMethod.DELETE;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

@RestController
@RequestMapping("/game-instance/images")
@CrossOrigin("${FRONTEND_HOST}:${FRONTEND_PORT}")
public class GameInstanceImageController {
    @Autowired
    GameInstanceImageService gameInstanceImageService;

    @PreAuthorize("isAuthenticated()")
    @RequestMapping(value = "/{gameInstanceUUID}", method = POST)
    public ResponseEntity addImageToGameInstance(Authentication authentication, @PathVariable String gameInstanceUUID,
    @RequestBody NewGameInstanceImageDTO newGameInstanceDTO) throws GameInstanceDoesNotExistException {
        String googleId = ((User)authentication.getPrincipal()).getGoogleId();
        gameInstanceImageService.addImageToGameInstance(googleId, gameInstanceUUID, newGameInstanceDTO);
        return ResponseEntity.status(HttpStatus.CREATED)
                .build();
    }

    @PreAuthorize("isAuthenticated()")
    @RequestMapping(value = "/{gameInstanceImageUUID}", method = DELETE)
    public ResponseEntity deleteGameInstanceImage(Authentication authentication, @PathVariable String gameInstanceImageUUID) throws GameInstanceImageDoesNotExistException {
        String googleId = ((User)authentication.getPrincipal()).getGoogleId();
        gameInstanceImageService.deleteGameInstanceImage(googleId, gameInstanceImageUUID);
        return ResponseEntity.status(HttpStatus.OK)
                .build();
    }
}
