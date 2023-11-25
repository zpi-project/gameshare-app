package com.zpi.backend.image.game_image;

import com.zpi.backend.exception_handlers.BadRequestException;
import com.zpi.backend.game.exception.GameDoesNotExistException;
import com.zpi.backend.game_instance.exception.GameInstanceDoesNotExistException;
import com.zpi.backend.image.dto.FileDTO;
import com.zpi.backend.image.exception.ImageAlreadyExistsException;
import com.zpi.backend.image.exception.ImageDoesNotExistException;
import com.zpi.backend.image.exception.TooManyImagesException;
import com.zpi.backend.user.exception.UserDoesNotExistException;
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
@RequestMapping("/games/{gameId}/images")
@CrossOrigin("${FRONTEND_HOST}:${FRONTEND_PORT}")
public class GameImageController {
    GameImageService gameImageService;

    @PreAuthorize("isAuthenticated()")
    @RequestMapping(method = POST, consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<FileDTO> addImageToGame(@PathVariable Long gameId, @RequestParam("file") MultipartFile newFile)
            throws BadRequestException, GameDoesNotExistException, ImageAlreadyExistsException {
        FileDTO file = gameImageService.addImageToGameInstance(gameId, newFile);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(file);
    }

    @PreAuthorize("isAuthenticated()")
    @RequestMapping(method = DELETE)
    public ResponseEntity deleteGameImage(Authentication authentication, @PathVariable Long gameId)
            throws UserDoesNotExistException, GameDoesNotExistException, IllegalAccessException {
        gameImageService.deleteGameImage(authentication, gameId);
        return ResponseEntity.status(HttpStatus.OK)
                .build();
    }
}
