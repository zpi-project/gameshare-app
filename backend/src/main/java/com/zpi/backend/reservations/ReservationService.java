package com.zpi.backend.reservations;

import com.zpi.backend.dto.Pagination;
import com.zpi.backend.dto.ResultsDTO;
import com.zpi.backend.exception_handlers.BadRequestException;
import com.zpi.backend.game_instance.GameInstance;
import com.zpi.backend.game_instance.GameInstanceDoesNotExistException;
import com.zpi.backend.game_instance.GameInstanceService;
import com.zpi.backend.reservation_status.ReservationStatusRepository;
import com.zpi.backend.reservations.DTO.NewReservationDTO;
import com.zpi.backend.user.User;
import com.zpi.backend.user.UserDoesNotExistException;
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
        Reservation reservation = new Reservation().fromDTO(newReservationDTO, renter, gameInstance);
        reservation.setStatus(reservationStatusRepository.findByStatus("Pending"));
        return reservationRepository.save(reservation);
    }

    public ResultsDTO<Reservation> getMyReservationsAsOwner(User owner,int page,int size){
        Pageable pageable = PageRequest.of(page, size);
        Page<Reservation> reservationPage = reservationRepository.getReservationsByOwner(pageable, owner.getUuid());
        return new ResultsDTO<>(reservationPage.stream().toList(), new Pagination(reservationPage.getTotalElements(),reservationPage.getTotalPages()));
    }

    public ResultsDTO<Reservation> getMyReservationsAsRenter(User renter, int page, int size){
        Pageable pageable = PageRequest.of(page, size);
        Page<Reservation> reservationPage = reservationRepository.getReservationsByRenter(pageable, renter);
        return new ResultsDTO<>(reservationPage.stream().toList(), new Pagination(reservationPage.getTotalElements(),reservationPage.getTotalPages()));
    }

    public ResultsDTO<Reservation> getMyReservations(Authentication authentication, Boolean asOwner, int page, int size) throws UserDoesNotExistException {
        User user = userService.getUser(authentication);
        if(asOwner){
            return getMyReservationsAsOwner(user,page,size);
        }
        return getMyReservationsAsRenter(user,page,size);
    }
}
