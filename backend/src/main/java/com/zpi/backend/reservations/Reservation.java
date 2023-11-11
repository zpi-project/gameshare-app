package com.zpi.backend.reservations;

import com.zpi.backend.game_instance.GameInstance;
import com.zpi.backend.reservation_status.ReservationStatus;
import com.zpi.backend.reservations.DTO.NewReservationDTO;
import com.zpi.backend.user.User;
import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Entity
@Data
@Table(name = "reservations")
public class Reservation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @ManyToOne
    private User renter;


    @Column(name="start_date",nullable = false)
    private Date startDate;

    @Column(name="end_date",nullable = false)
    private Date endDate;

    @ManyToOne
    private ReservationStatus status;

    @ManyToOne
    private GameInstance gameInstance;

    @Column(name="renter_comment",length = 500)
    private String renterComment;

    @Column(name="timestamp")
    private Date timestamp;

    public Reservation fromDTO(NewReservationDTO newReservationDTO, User renter, GameInstance gameInstance) {
        this.renter = renter;
        this.gameInstance = gameInstance;
        this.startDate = newReservationDTO.getStartDate();
        this.endDate = newReservationDTO.getEndDate();
        this.renterComment = newReservationDTO.getRenterComment();
        this.timestamp = new Date(System.currentTimeMillis());
        return this;
    }
}
