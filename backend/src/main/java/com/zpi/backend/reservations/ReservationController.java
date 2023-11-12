package com.zpi.backend.reservations;

import com.zpi.backend.dto.ResultsDTO;
import com.zpi.backend.exception_handlers.BadRequestException;
import com.zpi.backend.game_instance.Exception.GameInstanceDoesNotExistException;
import com.zpi.backend.reservations.DTO.NewReservationDTO;
import com.zpi.backend.user.Exception.UserDoesNotExistException;
import io.swagger.v3.oas.annotations.Operation;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@AllArgsConstructor
public class ReservationController {

    private ReservationService reservationService;

    @Operation(
            summary = "Add a new reservation",
            description = "Adds a new reservation to the database. " +
                    "The User who invokes this endpoint becomes the renter of the reservation."
    )
    @PostMapping("/reservations")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity addReservation(Authentication authentication, @RequestBody NewReservationDTO newReservationDTO) throws BadRequestException, GameInstanceDoesNotExistException, UserDoesNotExistException {
        Reservation reservation = reservationService.addReservation(authentication, newReservationDTO);
        return ResponseEntity.ok().body(reservation);
    }


    @Operation(
            summary = "Get all current user reservations",
            description = "Gets all current user reservations. " +
                    "The User who invokes this endpoint can be either the renter or the owner of the reservation."+
                    "If asOwner is true, the user is the owner of the reservation, otherwise the user is the renter" +
                    " of the reservation."+
                    "Current reservation are reservations with status not equal to 'Finished' or 'Expired'"
    )
    @GetMapping("/reservations")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity getReservations(Authentication authentication, @RequestParam Boolean asOwner
            ,@RequestParam int page,@RequestParam int size) throws UserDoesNotExistException {
        ResultsDTO<Reservation> reservations = reservationService.getMyReservations(authentication,asOwner,page,size);
        return ResponseEntity.ok().body(reservations);
    }

    @GetMapping("/reservations/history")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity getReservationsHistory(Authentication authentication, @RequestParam Boolean asOwner
            ,@RequestParam int page,@RequestParam int size) throws UserDoesNotExistException {
        ResultsDTO<Reservation> reservations = reservationService.getMyReservationsHistory(authentication,asOwner,page,size);
        return ResponseEntity.ok().body(reservations);
    }


}
