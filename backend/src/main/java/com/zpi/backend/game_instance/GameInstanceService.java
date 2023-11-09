package com.zpi.backend.game_instance;

import com.zpi.backend.category.Category;
import com.zpi.backend.category.CategoryDoesNotExistException;
import com.zpi.backend.category.CategoryService;
import com.zpi.backend.dto.Pagination;
import com.zpi.backend.dto.ResultsDTO;
import com.zpi.backend.exception_handlers.BadRequestException;
import com.zpi.backend.game.Game;
import com.zpi.backend.game.GameDoesNotExistException;
import com.zpi.backend.game.GameService;
import com.zpi.backend.game_instance_image.GameInstanceImageRepository;
import com.zpi.backend.user.User;
import com.zpi.backend.user.UserDoesNotExistException;
import com.zpi.backend.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
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
    @Autowired
    CategoryService categoryService;

    public GameInstanceDTO addGameInstance(NewGameInstanceDTO newGameInstanceDTO, Authentication authentication) throws UserDoesNotExistException, GameDoesNotExistException, BadRequestException {
        newGameInstanceDTO.validate();
        User user = userService.getUser(authentication);
        Game game = gameService.getGame(newGameInstanceDTO.getGameId());
        GameInstance newGameInstance = new GameInstance(newGameInstanceDTO, game, user);
        gameInstanceRepository.save(newGameInstance);
        return new GameInstanceDTO(newGameInstance, false);
    }

    public GameInstanceDTO updateGameInstance(String uuid, UpdatedGameInstanceDTO updatedGameInstanceDTO, Authentication authentication) throws GameInstanceDoesNotExistException, BadRequestException {
        updatedGameInstanceDTO.validate();
        String googleId = ((User)authentication.getPrincipal()).getGoogleId();
        Optional<GameInstance> gameInstanceOptional = gameInstanceRepository.findByUuidAndOwner_GoogleId(uuid, googleId);
        if (gameInstanceOptional.isEmpty())
            throw new GameInstanceDoesNotExistException("Game Instance (uuid = "+uuid+") does not exists or the User is not the Owner.");
        GameInstance gameInstance = gameInstanceOptional.get();
        gameInstance.setDescription(updatedGameInstanceDTO.getDescription());
        gameInstance.setPricePerDay(updatedGameInstanceDTO.getPricePerDay());
        gameInstanceRepository.save(gameInstance);
        return new GameInstanceDTO(gameInstance, false);
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

    public GameInstanceDTO getGameInstance(String uuid, Authentication authentication) throws GameInstanceDoesNotExistException {
        boolean isGuest = authentication == null || !authentication.isAuthenticated();
        Optional<GameInstance> gameInstanceOptional = gameInstanceRepository.findByUuid(uuid);
        if (gameInstanceOptional.isEmpty())
            throw new GameInstanceDoesNotExistException("The Game Instance (uuid = "+uuid+") does not exists ");
        return new GameInstanceDTO(gameInstanceOptional.get(), isGuest);
    }

    public GameInstance getGameInstance(String uuid) throws GameInstanceDoesNotExistException {
        Optional<GameInstance> gameInstanceOptional = gameInstanceRepository.findByUuid(uuid);
        if (gameInstanceOptional.isEmpty())
            throw new GameInstanceDoesNotExistException("The Game Instance (uuid = "+uuid+") does not exists ");
        return gameInstanceOptional.get();
    }

    public ResultsDTO<GameInstanceListDTO> getUserGameInstances(String userUUID, Optional<String> searchName, int size, int page) throws UserDoesNotExistException {
        Pageable pageable = PageRequest.of(page, size);
        userService.getUserByUUID(userUUID);
        Page<GameInstance> gameInstancesPage;
        if (searchName.isEmpty())
            gameInstancesPage = gameInstanceRepository.findByOwnerUuid(userUUID, pageable);
        else
            gameInstancesPage = gameInstanceRepository.findByOwnerUuidAndGameNameContainingIgnoreCase(
                    userUUID, searchName.get(), pageable);
        List<GameInstanceListDTO> resultsList = new ArrayList<>();
        gameInstancesPage.stream().toList()
                .forEach(gameInstance -> resultsList.add(new GameInstanceListDTO(gameInstance)));
        return new ResultsDTO<>(resultsList,
                new Pagination(gameInstancesPage.getTotalElements(), gameInstancesPage.getTotalPages()));
    }

    public ResultsDTO<GameInstanceListDTO> getGameInstances(int size, int page, Optional<String> searchName, Optional<Long> categoryId, Optional<Integer> age,
                                               Optional<Integer> playersNumber, Optional<Integer> maxPricePerDay, double latitude,
                                               double longitude) throws CategoryDoesNotExistException {
        Pageable pageable = PageRequest.of(page, size);
        Category category = null;
        if (categoryId.isPresent())
            category = categoryService.getCategory(categoryId.get());
        GameInstanceSearch gameInstanceSearch = new GameInstanceSearch(
                searchName.orElse(null), category,
                age.orElse(null), playersNumber.orElse(null),
                maxPricePerDay.orElse(null), latitude, longitude
        );
        Specification<GameInstance> spec = new GameInstanceSpecification(gameInstanceSearch);
        Page<GameInstance> gameInstancesPage = gameInstanceRepository.findAll(spec, pageable);
        List<GameInstanceListDTO> resultsList = new ArrayList<>();
        gameInstancesPage.stream().toList()
                .forEach(gameInstance -> resultsList.add(new GameInstanceListDTO(gameInstance)));
        return new ResultsDTO<>(resultsList,
                new Pagination(gameInstancesPage.getTotalElements(), gameInstancesPage.getTotalPages()));
    }
}
