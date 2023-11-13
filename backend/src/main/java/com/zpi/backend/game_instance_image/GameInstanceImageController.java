package com.zpi.backend.game_instance_image;

import com.zpi.backend.exception_handlers.BadRequestException;
import com.zpi.backend.game_instance.GameInstanceDoesNotExistException;
import com.zpi.backend.user.User;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import static org.springframework.web.bind.annotation.RequestMethod.DELETE;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

@RestController
@AllArgsConstructor
@RequestMapping("/game-instances/images")
@CrossOrigin("${FRONTEND_HOST}:${FRONTEND_PORT}")
public class GameInstanceImageController {
    GameInstanceImageService gameInstanceImageService;

    @PreAuthorize("isAuthenticated()")
    @RequestMapping(value = "/{gameInstanceUUID}", method = POST, consumes = {MediaType.IMAGE_JPEG_VALUE, MediaType.IMAGE_PNG_VALUE})
    public ResponseEntity addImageToGameInstance(Authentication authentication, @PathVariable String gameInstanceUUID,
                                                 @RequestParam("file") MultipartFile newFile) throws GameInstanceDoesNotExistException, BadRequestException {
        gameInstanceImageService.addImageToGameInstance(authentication, gameInstanceUUID, newFile);
        return ResponseEntity.status(HttpStatus.CREATED)
                .build();
    }

    @PreAuthorize("isAuthenticated()")
    @RequestMapping(value = "/{gameInstanceImageUUID}", method = DELETE)
    public ResponseEntity deleteGameInstanceImage(Authentication authentication, @PathVariable String gameInstanceImageUUID)
            throws GameInstanceImageDoesNotExistException {
        gameInstanceImageService.deleteGameInstanceImage(authentication, gameInstanceImageUUID);
        return ResponseEntity.status(HttpStatus.OK)
                .build();
    }
}
