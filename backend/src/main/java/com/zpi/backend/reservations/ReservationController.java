package com.zpi.backend.reservations;

import com.zpi.backend.dto.ResultsDTO;
import com.zpi.backend.exception_handlers.BadRequestException;
import com.zpi.backend.game_instance.exception.GameInstanceDoesNotExistException;
import com.zpi.backend.reservations.DTO.NewReservationDTO;
import com.zpi.backend.reservations.DTO.ReservationDTO;
import com.zpi.backend.reservations.DTO.ReservationDetailDTO;
import com.zpi.backend.user.exception.UserDoesNotExistException;
import io.swagger.v3.oas.annotations.Operation;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@Controller
@AllArgsConstructor
@CrossOrigin("${FRONTEND_HOST}:${FRONTEND_PORT}")
public class ReservationController {

    private ReservationService reservationService;

    @Operation(
            summary = "Add a new reservation",
            description = "Adds a new reservation to the database. " +
                    "The User who invokes this endpoint becomes the renter of the reservation."
    )
    @PostMapping("/reservations")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ReservationDTO> addReservation(Authentication authentication, @RequestBody NewReservationDTO newReservationDTO) throws BadRequestException, GameInstanceDoesNotExistException, UserDoesNotExistException {
        ReservationDTO reservationDTO = reservationService.addReservation(authentication, newReservationDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(reservationDTO);
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
    public ResponseEntity<ResultsDTO<ReservationDTO>> getReservations(Authentication authentication, @RequestParam Optional<String> status, @RequestParam Boolean asOwner
            , @RequestParam int page, @RequestParam int size) throws UserDoesNotExistException, BadRequestException {
        ResultsDTO<ReservationDTO> reservations;
        if (status.isPresent())
        {
            reservations = reservationService.getMyReservations(authentication,status.get(),asOwner,page,size);
        }
        else
            reservations = reservationService.getMyReservations(authentication,asOwner,page,size);

        return ResponseEntity.ok().body(reservations);
    }



    @Operation(
            summary = "Get reservations by game instance",
            description = "Gets reservations by game instance uuid. User invoking this endpoint must be " +
                    "the owner of the game instance."
    )
    @GetMapping("/reservations/{gameInstanceUuid}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ResultsDTO<ReservationDTO>> getReservationsByGameInstance(@PathVariable String gameInstanceUuid,Authentication authentication,
                                                        @RequestParam int page,@RequestParam int size) throws UserDoesNotExistException, GameInstanceDoesNotExistException, BadRequestException {
        ResultsDTO<ReservationDTO> reservations = reservationService.getReservationsByGameInstance(authentication,gameInstanceUuid,page,size);
        return ResponseEntity.ok().body(reservations);
    }

    @Operation(
            summary = "Change reservation status",
            description = "Changes reservation status " +
                    "User invoking this endpoint must be involved in the reservation (either renter or owner)"
    )
    @PutMapping("/reservations/{reservationId}/status")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ReservationDTO> changeReservationStatus(Authentication authentication, @PathVariable String reservationId, @RequestParam String status) throws BadRequestException, UserDoesNotExistException {
        ReservationDTO reservationDTO = new ReservationDTO(reservationService.changeReservationStatus(authentication, reservationId, status));
        return ResponseEntity.ok().body(reservationDTO);
    }

    @Operation(
            summary = "Get possible reservation statuses",
            description = "Gets possible reservation statuses " +
                    "User invoking this endpoint must be involved in the reservation (either renter or owner)" +
                    "Possible statuses depend on the current status of the reservation"
    )
    @GetMapping("/reservations/{reservationId}/statuses")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<List<String>> getReservationStatuses(Authentication authentication, @PathVariable String reservationId) throws BadRequestException, UserDoesNotExistException {
        List<String> reservationStatuses = reservationService.getReservationStatuses(authentication, reservationId);
        return ResponseEntity.ok().body(reservationStatuses);
    }

    @Operation(
            summary = "Get reservation details",
            description = "Gets reservation details " +
                    "User invoking this endpoint must be involved in the reservation (either renter or owner)"
    )
    @GetMapping("/reservations/{reservationId}/details")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ReservationDetailDTO> getReservationDetails(Authentication authentication, @PathVariable String reservationId) throws BadRequestException, UserDoesNotExistException {
        ReservationDetailDTO reservationDetails = reservationService.getReservationDetails(authentication, reservationId);
        return ResponseEntity.ok().body(reservationDetails);
    }

}
