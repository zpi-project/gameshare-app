package com.zpi.backend.gameStatus;

import com.zpi.backend.role.RoleService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class GameStatusService {
    RoleService roleService;
    GameStatusRepository gameStatusRepository;

    public GameStatus getGameStatus(String name) {
        return gameStatusRepository.getGameStatusByStatus(name);
    }
}
