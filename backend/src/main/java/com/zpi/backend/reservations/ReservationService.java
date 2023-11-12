package com.zpi.backend.reservations;

import com.zpi.backend.dto.Pagination;
import com.zpi.backend.dto.ResultsDTO;
import com.zpi.backend.exception_handlers.BadRequestException;
import com.zpi.backend.game_instance.GameInstance;
import com.zpi.backend.game_instance.Exception.GameInstanceDoesNotExistException;
import com.zpi.backend.game_instance.GameInstanceService;
import com.zpi.backend.reservation_status.ReservationStatusRepository;
import com.zpi.backend.reservations.DTO.NewReservationDTO;
import com.zpi.backend.user.User;
import com.zpi.backend.user.Exception.UserDoesNotExistException;
import com.zpi.backend.user.UserService;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class ReservationService {
    UserService userService;
    GameInstanceService gameInstanceService;
    ReservationStatusRepository reservationStatusRepository;
    ReservationRepository reservationRepository;

    public Reservation addReservation(Authentication authentication, NewReservationDTO newReservationDTO) throws UserDoesNotExistException, BadRequestException, GameInstanceDoesNotExistException {
        User renter = userService.getUser(authentication);
        newReservationDTO.validate();
        GameInstance gameInstance = gameInstanceService.getGameInstance(newReservationDTO.getGameInstanceUUID());
        checkIfOwnerIsNotRenter(renter,gameInstance);
        Reservation reservation = new Reservation().fromDTO(newReservationDTO, renter, gameInstance);
        reservation.setStatus(reservationStatusRepository.findByStatus("Pending"));
        return reservationRepository.save(reservation);
    }
    public void checkIfOwnerIsNotRenter(User renter,GameInstance gameInstance) throws BadRequestException {
        if(renter.getUuid().equals(gameInstance.getOwner().getUuid()))
            throw new BadRequestException("Owner cannot be renter");
    }



    public ResultsDTO<Reservation> getMyReservationsAsOwner(User owner,int page,int size){
        Pageable pageable = PageRequest.of(page, size);
        Page<Reservation> reservationPage = reservationRepository.getCurrentReservationsByOwner(pageable, owner.getUuid());
        return new ResultsDTO<>(reservationPage.stream().toList(), new Pagination(reservationPage.getTotalElements(),reservationPage.getTotalPages()));
    }

    public ResultsDTO<Reservation> getMyReservationsAsRenter(User renter, int page, int size){
        Pageable pageable = PageRequest.of(page, size);
        Page<Reservation> reservationPage = reservationRepository.getCurrentReservationsByRenter(pageable, renter.getUuid());
        return new ResultsDTO<>(reservationPage.stream().toList(), new Pagination(reservationPage.getTotalElements(),reservationPage.getTotalPages()));
    }

    public ResultsDTO<Reservation> getMyReservations(Authentication authentication, Boolean asOwner, int page, int size) throws UserDoesNotExistException {
        User user = userService.getUser(authentication);
        if(asOwner){
            return getMyReservationsAsOwner(user,page,size);
        }
        return getMyReservationsAsRenter(user,page,size);
    }



    public ResultsDTO<Reservation> getMyReservationsHistoryAsOwner(User owner,int page,int size){
        Pageable pageable = PageRequest.of(page, size);
        Page<Reservation> reservationPage = reservationRepository.getReservationsHistoryByOwner(pageable, owner.getUuid());
        return new ResultsDTO<>(reservationPage.stream().toList(), new Pagination(reservationPage.getTotalElements(),reservationPage.getTotalPages()));
    }

    public ResultsDTO<Reservation> getMyReservationsHistoryAsRenter(User renter, int page, int size){
        Pageable pageable = PageRequest.of(page, size);
        Page<Reservation> reservationPage = reservationRepository.getReservationsHistoryByRenter(pageable, renter.getUuid());
        return new ResultsDTO<>(reservationPage.stream().toList(), new Pagination(reservationPage.getTotalElements(),reservationPage.getTotalPages()));
    }

    public ResultsDTO<Reservation> getMyReservationsHistory(Authentication authentication, Boolean asOwner, int page, int size) throws UserDoesNotExistException {
        User user = userService.getUser(authentication);
        if(asOwner){
            return getMyReservationsHistoryAsOwner(user,page,size);
        }
        return getMyReservationsHistoryAsRenter(user,page,size);
    }

    public void checkIfUserIsOwner(User user, GameInstance gameInstance) throws BadRequestException {
        if(!user.getUuid().equals(gameInstance.getOwner().getUuid()))
            throw new BadRequestException("User is not owner of this game instance");
    }

    public ResultsDTO<Reservation> getReservationsByGameInstance(Authentication authentication, String gameInstanceUuid, int page, int size) throws GameInstanceDoesNotExistException, UserDoesNotExistException, BadRequestException {
        Pageable pageable = PageRequest.of(page, size);
        GameInstance gameInstance = gameInstanceService.getGameInstance(gameInstanceUuid);
        User user = userService.getUser(authentication);
        checkIfUserIsOwner(user,gameInstance);
        Page<Reservation> reservationPage = reservationRepository.getReservationsByGameInstance_Uuid(pageable, gameInstanceUuid);
        return new ResultsDTO<>(reservationPage.stream().toList(), new Pagination(reservationPage.getTotalElements(),reservationPage.getTotalPages()));
    }
}
