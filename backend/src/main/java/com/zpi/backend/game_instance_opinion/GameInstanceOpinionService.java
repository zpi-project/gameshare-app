package com.zpi.backend.game_instance_opinion;

import com.zpi.backend.dto.Pagination;
import com.zpi.backend.dto.ResultsDTO;
import com.zpi.backend.exception_handlers.BadRequestException;
import com.zpi.backend.gameInstance.*;
import com.zpi.backend.user.User;
import com.zpi.backend.user.UserDoesNotExistException;
import com.zpi.backend.user.UserService;
import com.zpi.backend.user_opinion.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class GameInstanceOpinionService {
    @Autowired
    private GameInstanceOpinionRepository gameInstanceOpinionRepository;
    @Autowired
    private UserService userService;
    @Autowired
    private GameInstanceService gameInstanceService;

    public GameInstanceOpinionDTO addOpinion(Authentication authentication, NewGameInstanceOpinionDTO newGameInstanceOpinionDTO)
            throws BadRequestException, UserDoesNotExistException, GameInstanceDoesNotExistException {
        newGameInstanceOpinionDTO.validate();
        User user = userService.getUser(authentication);
        GameInstance gameInstance = gameInstanceService.getGameInstance(newGameInstanceOpinionDTO.getGameInstanceUuid());
        GameInstanceOpinion gameInstanceOpinion = new GameInstanceOpinion(user, gameInstance, newGameInstanceOpinionDTO);
        gameInstanceOpinionRepository.save(gameInstanceOpinion);
        return new GameInstanceOpinionDTO(gameInstanceOpinion);
    }

    public GameInstanceOpinionDTO updateOpinion(Authentication authentication,long id, UpdatedGameInstanceOpinionDTO updatedGameInstanceOpinionDTO)
            throws UserDoesNotExistException, EditSomeoneElseOpinionException, OpinionDoesNotExistException, BadRequestException {
        updatedGameInstanceOpinionDTO.validate();
        GameInstanceOpinion gameInstanceOpinion = gameInstanceOpinionRepository.findById(id).orElseThrow(() -> new OpinionDoesNotExistException("Opinion does not exist"));
        User user = userService.getUser(authentication);
        if(checkIfNotRatingUsersOpinion(user, gameInstanceOpinion))
            throw new EditSomeoneElseOpinionException("User can edit only his own opinion");
        gameInstanceOpinion.update(updatedGameInstanceOpinionDTO);
        gameInstanceOpinionRepository.save(gameInstanceOpinion);
        return new GameInstanceOpinionDTO(gameInstanceOpinion);
    }

    public void deleteOpinion(Authentication authentication, long id) throws DeleteSomeoneElseOpinionException, UserDoesNotExistException, OpinionDoesNotExistException {
        GameInstanceOpinion gameInstanceOpinion = gameInstanceOpinionRepository.findById(id).orElseThrow(()->new OpinionDoesNotExistException("Opinion does not exist"));
        User user = userService.getUser(authentication);
        if(checkIfNotRatingUsersOpinion(user, gameInstanceOpinion))
            throw new DeleteSomeoneElseOpinionException("User can delete only his own opinion");
        gameInstanceOpinionRepository.delete(gameInstanceOpinion);
    }

    public ResultsDTO<GameInstanceOpinionDTO> getOpinions(String gameInstanceUuid, int page, int size) throws GameInstanceDoesNotExistException {
        Pageable pageable = PageRequest.of(page, size,
                Sort.by(Sort.Direction.DESC, "timestamp"));
        Page<GameInstanceOpinion> gameInstanceOpinionPage;
        gameInstanceOpinionPage = gameInstanceOpinionRepository.getGameInstanceOpinionsByGameInstance(
                gameInstanceService.getGameInstance(gameInstanceUuid), pageable);
        List<GameInstanceOpinionDTO> resultsList = new ArrayList<>();
        gameInstanceOpinionPage
                .stream().toList()
                .forEach(gameInstanceOpinion -> resultsList.add(
                        new GameInstanceOpinionDTO(gameInstanceOpinion)));
        return new ResultsDTO<>(resultsList,
                new Pagination(gameInstanceOpinionPage.getTotalElements(), gameInstanceOpinionPage.getTotalPages()));
    }

    public boolean checkIfNotRatingUsersOpinion(User user, GameInstanceOpinion gameInstanceOpinion){
        return !gameInstanceOpinion.getRatingUser().equals(user);
    }
}
