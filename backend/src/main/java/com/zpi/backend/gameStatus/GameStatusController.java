package com.zpi.backend.gameStatus;

import com.zpi.backend.exceptionHandlers.BadRequestException;
import com.zpi.backend.user.UserDoesNotExistException;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin("${FRONTEND_HOST}:${FRONTEND_PORT}")
@AllArgsConstructor
public class GameStatusController {

    GameStatusService gameStatusService;
    @PostMapping("/gameStatus")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<GameStatus> addGameStatus(Authentication authentication, @RequestBody NewGameStatusDTO newGameStatusDTO) throws IllegalAccessException, UserDoesNotExistException, BadRequestException {
        GameStatus newGameStatus =  gameStatusService.addGameStatus(authentication,newGameStatusDTO);
        return ResponseEntity.ok(newGameStatus);
    }
}
