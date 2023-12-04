package com.zpi.backend.game_status;

import com.zpi.backend.role.RoleService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import static com.zpi.backend.game_status.GameStatus.*;

@Service
@AllArgsConstructor
public class GameStatusService {
    RoleService roleService;
    GameStatusRepository gameStatusRepository;

    public GameStatus getGameStatus(String name) {
        return gameStatusRepository.getGameStatusByStatus(name);
    }

    private void saveStatuses(){
        saveStatus(ACCEPTED);
        saveStatus(PENDING);
        saveStatus(REJECTED);
    }

    private void saveStatus(String status){
        if (!gameStatusRepository.existsByStatus(status)){
            gameStatusRepository.save(new GameStatus(status));
        }
    }
}
