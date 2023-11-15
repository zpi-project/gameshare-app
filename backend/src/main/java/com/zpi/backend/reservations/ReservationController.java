package com.zpi.backend.reservations;

import com.zpi.backend.dto.ResultsDTO;
import com.zpi.backend.exception_handlers.BadRequestException;
import com.zpi.backend.game_instance.exception.GameInstanceDoesNotExistException;
import com.zpi.backend.reservations.DTO.NewReservationDTO;
import com.zpi.backend.reservations.DTO.ReservationDetailDTO;
import com.zpi.backend.user.exception.UserDoesNotExistException;
import io.swagger.v3.oas.annotations.Operation;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

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
                    "The User who invokes this endpoint can be either the renter or the owner of the reservations."+
                    "If asOwner is true, the user is the owner of the reservations, otherwise the user is the renter" +
                    " of the reservations."+
                    "Current reservations are reservations with status not equal to 'Finished' or 'Expired'"
    )
    @GetMapping("/reservations")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity getReservations(Authentication authentication,@RequestParam String status, @RequestParam Boolean asOwner
            ,@RequestParam int page,@RequestParam int size) throws UserDoesNotExistException {
        ResultsDTO<Reservation> reservations = reservationService.getMyReservations(authentication,status,asOwner,page,size);
        return ResponseEntity.ok().body(reservations);
    }



    @Operation(
            summary = "Get reservations by game instance",
            description = "Gets reservations by game instance uuid. User invoking this endpoint must be " +
                    "the owner of the game instance."
    )
    @GetMapping("/reservations/{gameInstanceUuid}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity getReservationsByGameInstance(@PathVariable String gameInstanceUuid,Authentication authentication,
                                                        @RequestParam int page,@RequestParam int size) throws UserDoesNotExistException, GameInstanceDoesNotExistException, BadRequestException {
        ResultsDTO<Reservation> reservations = reservationService.getReservationsByGameInstance(authentication,gameInstanceUuid,page,size);
        return ResponseEntity.ok().body(reservations);
    }

    @PutMapping("/reservations/{reservationUuid}/status")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity changeReservationStatus(Authentication authentication, @PathVariable String reservationUuid, @RequestParam String status) throws BadRequestException, UserDoesNotExistException {
        Reservation reservation = reservationService.changeReservationStatus(authentication, reservationUuid, status);
        return ResponseEntity.ok().body(reservation);
    }

    @GetMapping("/reservations/{reservationUuid}/details")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity getReservationDetails(Authentication authentication, @PathVariable String reservationUuid) throws BadRequestException, UserDoesNotExistException {
        ReservationDetailDTO reservationDetails = reservationService.getReservationDetails(authentication, reservationUuid);
        return ResponseEntity.ok().body(reservationDetails);
    }

}
