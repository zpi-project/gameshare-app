package com.zpi.backend.gameStatus;

import com.zpi.backend.exceptionHandlers.BadRequestException;
import com.zpi.backend.game.Game;
import com.zpi.backend.role.RoleService;
import com.zpi.backend.user.UserDoesNotExistException;
import lombok.AllArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class GameStatusService {
    RoleService roleService;
    GameStatusRepository gameStatusRepository;

    public GameStatus addGameStatus(Authentication authentication,NewGameStatusDTO newGameStatusDTO) throws IllegalAccessException, UserDoesNotExistException, BadRequestException {
        if(!roleService.checkIfAdmin(authentication))
            throw new IllegalAccessException();
        newGameStatusDTO.validate();
        GameStatus newGameStatus = new GameStatus().fromDTO(newGameStatusDTO);
        gameStatusRepository.save(newGameStatus);
        return newGameStatus;
    }

    public GameStatus getGameStatus(String name) {
        return gameStatusRepository.getGameStatusByStatus(name);
    }
}
