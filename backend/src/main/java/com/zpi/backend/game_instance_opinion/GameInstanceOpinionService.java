package com.zpi.backend.game_instance_opinion;

import com.zpi.backend.dto.Pagination;
import com.zpi.backend.dto.ResultsDTO;
import com.zpi.backend.exception_handlers.BadRequestException;
import com.zpi.backend.game_instance.*;
import com.zpi.backend.game_instance.exception.GameInstanceDoesNotExistException;
import com.zpi.backend.game_instance_opinion.dto.GameInstanceOpinionDTO;
import com.zpi.backend.game_instance_opinion.dto.NewGameInstanceOpinionDTO;
import com.zpi.backend.game_instance_opinion.dto.UpdatedGameInstanceOpinionDTO;
import com.zpi.backend.game_instance_opinion.exception.GameInstanceOpinionDoesNotExistException;
import com.zpi.backend.reservations.Reservation;
import com.zpi.backend.reservations.ReservationRepository;
import com.zpi.backend.user.User;
import com.zpi.backend.user.exception.UserDoesNotExistException;
import com.zpi.backend.user.UserService;
import com.zpi.backend.user_opinion.exception.DeleteSomeoneElseOpinionException;
import com.zpi.backend.user_opinion.exception.EditSomeoneElseOpinionException;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

import static com.zpi.backend.reservation_status.ReservationStatus.*;

@Service
@AllArgsConstructor
public class GameInstanceOpinionService {
    private GameInstanceOpinionRepository gameInstanceOpinionRepository;
    private UserService userService;
    private GameInstanceService gameInstanceService;
    private ReservationRepository reservationRepository;

    public GameInstanceOpinionDTO addOpinion(Authentication authentication, NewGameInstanceOpinionDTO newGameInstanceOpinionDTO)
            throws BadRequestException, UserDoesNotExistException, GameInstanceDoesNotExistException {
        newGameInstanceOpinionDTO.validate();
        User user = userService.getUser(authentication);
        boolean isGuest = !authentication.isAuthenticated();
        GameInstance gameInstance = gameInstanceService.getGameInstance(newGameInstanceOpinionDTO.getGameInstanceUuid());
        Reservation reservation = reservationRepository.getReservationByReservationId(newGameInstanceOpinionDTO.getReservationId()).orElseThrow(()->new BadRequestException("Reservation does not exist"));

        if (!checkIfCanAddOpinion(reservation))
            throw new BadRequestException("User already rated this reservation");

        if(!(reservation.getStatus().getStatus().equals(RENTED)|| reservation.getStatus().getStatus().equals(FINISHED))&&
        reservation.getRenter().equals(user))
            throw new BadRequestException("Renter can rate only finished or rented reservations");

        GameInstanceOpinion gameInstanceOpinion = new GameInstanceOpinion(user, gameInstance, newGameInstanceOpinionDTO);
        gameInstanceOpinionRepository.save(gameInstanceOpinion);
        gameInstanceService.updateAvgRatingAndOpinionsAmount(gameInstance.getId());
        return new GameInstanceOpinionDTO(gameInstanceOpinion, isGuest);
    }

    public boolean checkIfCanAddOpinion(Reservation reservation){
        return gameInstanceOpinionRepository.getGameInstanceOpinionByReservation(reservation) == null;
    }
    public GameInstanceOpinionDTO updateOpinion(Authentication authentication,long id, UpdatedGameInstanceOpinionDTO updatedGameInstanceOpinionDTO)
            throws UserDoesNotExistException, EditSomeoneElseOpinionException, GameInstanceOpinionDoesNotExistException, BadRequestException {
        updatedGameInstanceOpinionDTO.validate();
        GameInstanceOpinion gameInstanceOpinion = gameInstanceOpinionRepository.findById(id).orElseThrow(() -> new GameInstanceOpinionDoesNotExistException("Opinion does not exist"));
        User user = userService.getUser(authentication);
        boolean isGuest = !authentication.isAuthenticated();
        if(checkIfNotRatingUsersOpinion(user, gameInstanceOpinion))
            throw new EditSomeoneElseOpinionException("User can edit only his own opinion");
        gameInstanceOpinion.update(updatedGameInstanceOpinionDTO);
        gameInstanceOpinionRepository.save(gameInstanceOpinion);
        gameInstanceService.updateAvgRatingAndOpinionsAmount(gameInstanceOpinion.getGameInstance().getId());
        return new GameInstanceOpinionDTO(gameInstanceOpinion, isGuest);
    }

    public void deleteOpinion(Authentication authentication, long id) throws DeleteSomeoneElseOpinionException, UserDoesNotExistException, GameInstanceOpinionDoesNotExistException {
        GameInstanceOpinion gameInstanceOpinion = gameInstanceOpinionRepository.findById(id).orElseThrow(()->new GameInstanceOpinionDoesNotExistException("Opinion does not exist"));
        User user = userService.getUser(authentication);
        if(checkIfNotRatingUsersOpinion(user, gameInstanceOpinion))
            throw new DeleteSomeoneElseOpinionException("User can delete only his own opinion");
        long gameInstanceId = gameInstanceOpinion.getGameInstance().getId();
        gameInstanceOpinionRepository.delete(gameInstanceOpinion);
        gameInstanceService.updateAvgRatingAndOpinionsAmount(gameInstanceId);
    }

    public ResultsDTO<GameInstanceOpinionDTO> getOpinions(Authentication authentication, String gameInstanceUuid, int page, int size) throws GameInstanceDoesNotExistException {
        Pageable pageable = PageRequest.of(page, size,
                Sort.by(Sort.Direction.DESC, "timestamp"));
        boolean isGuest = authentication == null || !authentication.isAuthenticated();
        Page<GameInstanceOpinion> gameInstanceOpinionPage;
        gameInstanceOpinionPage = gameInstanceOpinionRepository.getGameInstanceOpinionsByGameInstance(
                gameInstanceService.getGameInstance(gameInstanceUuid), pageable);
        List<GameInstanceOpinionDTO> resultsList = new ArrayList<>();
        gameInstanceOpinionPage
                .stream().toList()
                .forEach(gameInstanceOpinion -> resultsList.add(
                        new GameInstanceOpinionDTO(gameInstanceOpinion, isGuest)));
        return new ResultsDTO<>(resultsList,
                new Pagination(gameInstanceOpinionPage.getTotalElements(), gameInstanceOpinionPage.getTotalPages()));
    }

    public boolean checkIfNotRatingUsersOpinion(User user, GameInstanceOpinion gameInstanceOpinion){
        return !gameInstanceOpinion.getRatingUser().equals(user);
    }

    public List<GameInstanceOpinion> getOpinionsByGameInstance(GameInstance gameInstance) {
            return gameInstanceOpinionRepository.getGameInstanceOpinionByGameInstance(gameInstance);
    }
}
