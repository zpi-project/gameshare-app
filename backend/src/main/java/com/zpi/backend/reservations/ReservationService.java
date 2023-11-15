package com.zpi.backend.reservations;

import com.zpi.backend.dto.Pagination;
import com.zpi.backend.dto.ResultsDTO;
import com.zpi.backend.exception_handlers.BadRequestException;
import com.zpi.backend.game_instance.GameInstance;
import com.zpi.backend.game_instance.exception.GameInstanceDoesNotExistException;
import com.zpi.backend.game_instance.GameInstanceService;
import com.zpi.backend.game_instance_opinion.GameInstanceOpinionService;
import com.zpi.backend.interfaces.UserOpinionServiceInterface;
import com.zpi.backend.reservation_status.ReservationStatus;
import com.zpi.backend.reservation_status.ReservationStatusRepository;
import com.zpi.backend.reservations.DTO.*;
import com.zpi.backend.user.User;
import com.zpi.backend.user.exception.UserDoesNotExistException;
import com.zpi.backend.user.UserService;
import com.zpi.backend.user_opinion.UserOpinionRepository;
import com.zpi.backend.user_opinion.UserOpinionService;
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
    GameInstanceOpinionService gameinstanceOpinionService;
    UserOpinionRepository userOpinionRepository;


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



    public ResultsDTO<Reservation> getMyReservationsAsOwner(User owner, ReservationStatus status, int page, int size){
        Pageable pageable = PageRequest.of(page, size);
        Page<Reservation> reservationPage = reservationRepository.getCurrentReservationsByOwner(pageable, owner.getUuid(),status.getStatus());
        return new ResultsDTO<>(reservationPage.stream().toList(), new Pagination(reservationPage.getTotalElements(),reservationPage.getTotalPages()));
    }

    public ResultsDTO<Reservation> getMyReservationsAsRenter(User renter,ReservationStatus status, int page, int size){
        Pageable pageable = PageRequest.of(page, size);
        Page<Reservation> reservationPage = reservationRepository.getCurrentReservationsByRenter(pageable, renter.getUuid(),status.getStatus());
        return new ResultsDTO<>(reservationPage.stream().toList(), new Pagination(reservationPage.getTotalElements(),reservationPage.getTotalPages()));
    }

    public ResultsDTO<Reservation> getMyReservations(Authentication authentication, String status,Boolean asOwner, int page, int size) throws UserDoesNotExistException {
        User user = userService.getUser(authentication);
        ReservationStatus reservationStatus = reservationStatusRepository.findByStatus(status);
        if(asOwner){
            return getMyReservationsAsOwner(user,reservationStatus,page,size);
        }
        return getMyReservationsAsRenter(user,reservationStatus,page,size);
    }



    public Boolean checkIfUserIsOwner(User user, GameInstance gameInstance){
        return user.getUuid().equals(gameInstance.getOwner().getUuid());
    }


    public Reservation getReservationByUUID(String uuid){
        return reservationRepository.getReservationByUuid(uuid);
    }
    public ResultsDTO<Reservation> getReservationsByGameInstance(Authentication authentication, String gameInstanceUuid, int page, int size) throws GameInstanceDoesNotExistException, UserDoesNotExistException, BadRequestException {
        Pageable pageable = PageRequest.of(page, size);
        GameInstance gameInstance = gameInstanceService.getGameInstance(gameInstanceUuid);
        User user = userService.getUser(authentication);
        if(!checkIfUserIsOwner(user,gameInstance))
            throw new BadRequestException("User is not owner of this game instance");
        Page<Reservation> reservationPage = reservationRepository.getReservationsByGameInstance_Uuid(pageable, gameInstanceUuid);
        return new ResultsDTO<>(reservationPage.stream().toList(), new Pagination(reservationPage.getTotalElements(),reservationPage.getTotalPages()));
    }

    public Reservation changeReservationStatus(Authentication  authentication, String reservationUuid, String status) {
        //TODO some checking like owner can't set status to cancelled by renter
        Reservation reservation = reservationRepository.getReservationByUuid(reservationUuid);
        reservation.setStatus(reservationStatusRepository.findByStatus(status));
        return reservationRepository.save(reservation);
    }

    public ReservationDetailOwnerDTO getReservationOwnerDetails(Reservation reservation){
        User renter = reservation.getRenter();
        if(userOpinionRepository.getUserOpinionsByReservationAndRatedUser(reservation, renter).isEmpty()) {
            return new ReservationDetailOwnerDTO(reservation, true);
        }
        return new ReservationDetailOwnerDTO(reservation, false);

    }

    public ReservationDetailRenterDTO getReservationRenterDetails(Reservation reservation) throws BadRequestException {
        if(!(reservation.getStatus().getStatus().equals("In Progress")|| reservation.getStatus().getStatus().equals("Finished"))){
            throw new BadRequestException("Reservation is not in progress or finished");
        }
        User owner = reservation.getGameInstance().getOwner();
        GameInstance gameInstance = reservation.getGameInstance();
        boolean canAddOwnerOpinion = userOpinionRepository.getUserOpinionsByReservationAndRatedUser(reservation, owner).isEmpty();
        boolean canAddGameInstanceOpinion = gameinstanceOpinionService.getOpinionsByGameInstance(gameInstance).isEmpty();
        return new ReservationDetailRenterDTO(reservation,canAddOwnerOpinion,canAddGameInstanceOpinion);
    }

    public ReservationDetailDTO getReservationDetails(Authentication authentication, String reservationUuid) throws UserDoesNotExistException, BadRequestException {
        Reservation reservation = reservationRepository.getReservationByUuid(reservationUuid);
        User user = userService.getUser(authentication);
        if(checkIfUserIsOwner(user,reservation.getGameInstance())){
            return getReservationOwnerDetails(reservation);

        }
        else if(user.getUuid().equals(reservation.getRenter().getUuid())){
            return getReservationRenterDetails(reservation);
        }
        else{
            throw new BadRequestException("User is not owner or renter of this reservation");
        }
    }


}
