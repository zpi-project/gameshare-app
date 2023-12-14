package com.zpi.backend.image.game_instance_image;

import com.zpi.backend.exception_handlers.BadRequestException;
import com.zpi.backend.game_instance.exception.GameInstanceDoesNotExistException;
import com.zpi.backend.image.dto.FileDTO;
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
@RequestMapping("/game-instances/images")
//@CrossOrigin("${FRONTEND_HOST}:${FRONTEND_PORT}")
public class GameInstanceImageController {
    GameInstanceImageService gameInstanceImageService;

    @PreAuthorize("isAuthenticated()")
    @RequestMapping(value = "/{gameInstanceUUID}", method = POST, consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<FileDTO> addImageToGameInstance(Authentication authentication, @PathVariable String gameInstanceUUID,
                                                          @RequestParam("file") MultipartFile newFile) throws GameInstanceDoesNotExistException, BadRequestException, TooManyImagesException, UserDoesNotExistException {
        System.out.println("... called addImageToGameInstance");
        FileDTO file = gameInstanceImageService.addImageToGameInstance(authentication, gameInstanceUUID, newFile);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(file);
    }

    @PreAuthorize("isAuthenticated()")
    @RequestMapping(value = "/{gameInstanceImageID}", method = DELETE)
    public ResponseEntity deleteGameInstanceImage(Authentication authentication, @PathVariable long gameInstanceImageID)
            throws ImageDoesNotExistException, UserDoesNotExistException {
        System.out.println("... called deleteGameInstanceImage");
        gameInstanceImageService.deleteGameInstanceImage(authentication, gameInstanceImageID);
        return ResponseEntity.status(HttpStatus.OK)
                .build();
    }
}
