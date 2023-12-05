package com.zpi.backend.game_status;

import org.springframework.stereotype.Service;

import static com.zpi.backend.game_status.GameStatus.*;

@Service
public class GameStatusService {
    private final GameStatusRepository gameStatusRepository;

    public GameStatusService(GameStatusRepository gameStatusRepository){
        this.gameStatusRepository = gameStatusRepository;
        saveStatuses();
    }
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
