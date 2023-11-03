package com.zpi.backend.gameInstanceImage;

import com.zpi.backend.gameInstance.GameInstance;
import com.zpi.backend.gameInstance.GameInstanceDoesNotExistException;
import com.zpi.backend.gameInstance.GameInstanceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class GameInstanceImageService {
    @Autowired
    GameInstanceImageRepository gameInstanceImageRepository;
    @Autowired
    GameInstanceRepository gameInstanceRepository;

    public LinkDTO addImageToGameInstance(String googleId, String gameInstanceUUID,
                                          NewGameInstanceImageDTO newGameInstanceDTO) throws GameInstanceDoesNotExistException {
        Optional<GameInstance> gameInstanceOptional = gameInstanceRepository
                .findByUuidAndOwner_GoogleId(gameInstanceUUID, googleId);
        if (gameInstanceOptional.isEmpty())
            throw new GameInstanceDoesNotExistException("Game Instance (uuid = "+gameInstanceUUID+") does not exists or the User is not the Owner.");
        LinkDTO linkDTO = new LinkDTO();
        return linkDTO;
    }

    public void deleteGameInstanceImage(String googleId, String gameInstanceImageUUID) throws GameInstanceImageDoesNotExistException {
        Optional<GameInstanceImage> gameInstanceImageOptional = gameInstanceImageRepository
                .findByGameInstanceUuidAndGameInstance_OwnerGoogleId(gameInstanceImageUUID, googleId);
        if (gameInstanceImageOptional.isEmpty())
            throw new GameInstanceImageDoesNotExistException("Game Instance Image (UUID = "+gameInstanceImageUUID+") does not exists or the User is not the Owner.");
        gameInstanceImageRepository.deleteById(gameInstanceImageOptional.get().getId());
    }


}
