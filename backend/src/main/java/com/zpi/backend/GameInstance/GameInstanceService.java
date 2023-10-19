package com.zpi.backend.GameInstance;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class GameInstanceService {
    @Autowired
    GameInstanceRepository gameInstanceRepository;

    public GameInstance addGameInstance(GameInstanceDTO newGameInstanceDTO, String googleId){
        return null;
    }

    public GameInstance updateGameInstance(String uuid, GameInstanceDTO newGameInstanceDTO, String googleId){
        return null;
    }

    public void deleteGameInstance(String uuid, String googleId){
    }

    public GameInstance getGameInstance(String uuid){
        return null;
    }

    public List<GameInstance> getUserGameInstances(String userUUID, int size, int page){
        return null;
    }

    public List<GameInstance> getGameInstances(int size, int page, Optional<List<Long>> categoryIds, Optional<Integer> age,
                                               Optional<Integer> playersNumber, Optional<String> name,
                                               double latitude, double longitude){
        return null;
    }

    public List<GameInstance> getGameInstancesByName(int size, int page, Optional<String> name, double latitude,
                                                     double longitude){
        return null;
    }
}
