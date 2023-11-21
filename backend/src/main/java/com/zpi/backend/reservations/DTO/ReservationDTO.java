package com.zpi.backend.reservations.DTO;

import com.zpi.backend.game_instance.dto.GameInstanceDetailsDTO;
import com.zpi.backend.reservations.Reservation;
import com.zpi.backend.user.dto.UserDTO;
import lombok.Data;

import java.util.Date;

@Data
public class ReservationDTO {
    private String reservationId;
    private UserDTO renter;
    private Date startDate;
    private Date endDate;
    private String status;
    private GameInstanceDetailsDTO gameInstance;
    private String renterComment;
    private Date timestamp;
    private int duration;

    public ReservationDTO(Reservation reservation){
        this.reservationId = reservation.getReservationId();
        this.renter = new UserDTO(reservation.getRenter());
        this.startDate = reservation.getStartDate();
        this.endDate = reservation.getEndDate();
        this.status = reservation.getStatus().getStatus();
        this.gameInstance = new GameInstanceDetailsDTO(reservation.getGameInstance(),false);
        this.renterComment = reservation.getRenterComment();
        this.timestamp = reservation.getTimestamp();
        this.duration = reservation.getDuration();
    }

}
