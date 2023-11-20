package com.zpi.backend.reservations;

import com.zpi.backend.game_instance.GameInstance;
import com.zpi.backend.reservation_status.ReservationStatus;
import com.zpi.backend.reservations.DTO.NewReservationDTO;
import com.zpi.backend.user.User;
import com.zpi.backend.utils.DateUtils;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.UUID;

@Entity
@Data
@Table(name = "reservations")
@NoArgsConstructor
public class Reservation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @Column(name = "reservation_id",nullable = true,unique = true)
    private String reservationId;


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

    @Transient
    private int duration;


    public Reservation fromDTO(NewReservationDTO newReservationDTO, User renter, GameInstance gameInstance) {

        this.renter = renter;
        this.gameInstance = gameInstance;
        this.startDate = newReservationDTO.getStartDate();
        this.endDate = newReservationDTO.getEndDate();
        this.renterComment = newReservationDTO.getRenterComment();
        this.timestamp = new Date(System.currentTimeMillis());
        this.duration = DateUtils.getDuration(startDate,endDate);
        this.reservationId = UUID.randomUUID().toString();
        return this;
    }
    public Reservation(User renter, GameInstance gameInstance, Date startDate, Date endDate, ReservationStatus status, String renterComment, Date timestamp) {
        this.renter = renter;
        this.gameInstance = gameInstance;
        this.startDate = startDate;
        this.endDate = endDate;
        this.status = status;
        this.renterComment = renterComment;
        this.timestamp = timestamp;
        this.duration = DateUtils.getDuration(startDate,endDate);
        this.reservationId = UUID.randomUUID().toString();
    }


}
