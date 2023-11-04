package com.zpi.backend.gameInstance;

import com.zpi.backend.dto.Pagination;
import com.zpi.backend.dto.ResultsDTO;
import com.zpi.backend.game.Game;
import com.zpi.backend.game.GameDoesNotExistException;
import com.zpi.backend.game.GameService;
import com.zpi.backend.gameInstanceImage.GameInstanceImageRepository;
import com.zpi.backend.user.User;
import com.zpi.backend.user.UserDoesNotExistException;
import com.zpi.backend.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class GameInstanceService {
    @Autowired
    GameInstanceRepository gameInstanceRepository;
    @Autowired
    GameInstanceImageRepository gameInstanceImageRepository;
    @Autowired
    UserService userService;
    @Autowired
    GameService gameService;

//    TODO What about saving images?
    public GameInstance addGameInstance(NewGameInstanceDTO newGameInstanceDTO, String googleId) throws UserDoesNotExistException, GameDoesNotExistException {
        User user = userService.getUserByGoogleId(googleId);
        Game game = gameService.getGame(newGameInstanceDTO.getGameId());
        GameInstance newGameInstance = new GameInstance(newGameInstanceDTO, game, user);
        gameInstanceRepository.save(newGameInstance);
        return newGameInstance;
    }

    public GameInstance updateGameInstance(String uuid, UpdatedGameInstanceDTO updatedGameInstanceDTO, String googleId) throws GameInstanceDoesNotExistException {
        Optional<GameInstance> gameInstanceOptional = gameInstanceRepository.findByUuidAndOwner_GoogleId(uuid, googleId);
        if (gameInstanceOptional.isEmpty())
            throw new GameInstanceDoesNotExistException("Game Instance (uuid = "+uuid+") does not exists or the User is not the Owner.");
        GameInstance gameInstance = gameInstanceOptional.get();
        gameInstance.setDescription(updatedGameInstanceDTO.getDescription());
        gameInstance.setPricePerDay(updatedGameInstanceDTO.getPricePerDay());
        gameInstanceRepository.save(gameInstance);
        return gameInstance;
    }

    //TODO Implementation of checking reservation, what about status?
    public void deleteGameInstance(String uuid, String googleId) throws GameInstanceDoesNotExistException {
        Optional<GameInstance> gameInstanceOptional = gameInstanceRepository.findByUuidAndOwner_GoogleId(uuid, googleId);
        if (gameInstanceOptional.isEmpty())
            throw new GameInstanceDoesNotExistException("Game Instance (uuid = "+uuid+") does not exists or the User is not the Owner.");
        gameInstanceRepository.delete(gameInstanceOptional.get());
    }

    public void activate(String gameInstanceUUID, String googleId) throws GameInstanceDoesNotExistException, GameInstanceStatusException {
        Optional<GameInstance> gameInstanceOptional = gameInstanceRepository.findByUuidAndOwner_GoogleId(gameInstanceUUID, googleId);
        if (gameInstanceOptional.isEmpty())
            throw new GameInstanceDoesNotExistException("The Game Instance (uuid = "+gameInstanceUUID+") does not exists or the User is not the Owner.");
        GameInstance gameInstance = gameInstanceOptional.get();
        if (gameInstance.isActive())
            throw new GameInstanceStatusException("The Game Instance (uuid = "+gameInstanceUUID+") has already been activated");
        gameInstance.setActive(true);
        gameInstanceRepository.save(gameInstance);
    }

    public void deactivate(String gameInstanceUUID, String googleId) throws GameInstanceDoesNotExistException, GameInstanceStatusException {
        Optional<GameInstance> gameInstanceOptional = gameInstanceRepository.findByUuidAndOwner_GoogleId(gameInstanceUUID, googleId);
        if (gameInstanceOptional.isEmpty())
            throw new GameInstanceDoesNotExistException("The Game Instance (uuid = "+gameInstanceUUID+") does not exists or the User is not the Owner.");
        GameInstance gameInstance = gameInstanceOptional.get();
        if (!gameInstance.isActive())
            throw new GameInstanceStatusException("The Game Instance (uuid = "+gameInstanceUUID+") has already been deactivated");
        gameInstance.setActive(false);
        gameInstanceRepository.save(gameInstance);
    }

    public GameInstance getGameInstance(String uuid) throws GameInstanceDoesNotExistException {
        Optional<GameInstance> gameInstanceOptional = gameInstanceRepository.findByUuid(uuid);
        if (gameInstanceOptional.isEmpty())
            throw new GameInstanceDoesNotExistException("The Game Instance (uuid = "+uuid+") does not exists ");
        return gameInstanceOptional.get();
    }

    public ResultsDTO<GameInstance> getUserGameInstances(String userUUID, int size, int page) throws UserDoesNotExistException {
        Pageable pageable = PageRequest.of(page, size);
        userService.getUserByUUID(userUUID);
        Page<GameInstance> gameInstancesPage = gameInstanceRepository.findByOwnerUserUuid(userUUID, pageable);
        return new ResultsDTO<>(gameInstancesPage.stream().toList(),
                new Pagination(gameInstancesPage.getTotalElements(), gameInstancesPage.getTotalPages()));
    }

    public ResultsDTO<GameInstance> getGameInstances(int size, int page, Optional<List<Long>> categoryIds, Optional<Integer> age,
                                               Optional<Integer> playersNumber, double latitude,
                                               double longitude){
        Pageable pageable = PageRequest.of(page, size);
        Page<GameInstance> gameInstancePage = gameInstanceRepository.filterGameInstancesByParameters(
                categoryIds, age, playersNumber,
                latitude, longitude, pageable);
        return new ResultsDTO<>(gameInstancePage.stream().toList(),
                new Pagination(gameInstancePage.getTotalElements(), gameInstancePage.getTotalPages()));
    }

    public ResultsDTO<GameInstance> getGameInstancesByName(int size, int page, String name, double latitude,
                                                     double longitude){
        Pageable pageable = PageRequest.of(page, size);
        Page<GameInstance> gameInstancePage = gameInstanceRepository.searchByGameNameSortByDistance(
                name, latitude, longitude, pageable);
        return new ResultsDTO<>(gameInstancePage.stream().toList(),
                new Pagination(gameInstancePage.getTotalElements(), gameInstancePage.getTotalPages()));
    }
}
