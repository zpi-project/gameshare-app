package com.zpi.backend.game_instance_image;

import com.zpi.backend.game_instance.GameInstance;
import com.zpi.backend.game_instance.Exception.GameInstanceDoesNotExistException;
import com.zpi.backend.game_instance.GameInstanceRepository;

import com.zpi.backend.game_instance_image.Dto.LinkDTO;
import com.zpi.backend.game_instance_image.Dto.NewGameInstanceImageDTO;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor
public class GameInstanceImageService {
    GameInstanceImageRepository gameInstanceImageRepository;
    GameInstanceRepository gameInstanceRepository;

//    TODO implement addImageToGameInstance endpoint
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
