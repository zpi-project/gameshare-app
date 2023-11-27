package com.zpi.backend.reservation_status;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "reservation_status")
public class ReservationStatus {
    public static final String ACCEPTED_BY_OWNER = "ACCEPTED_BY_OWNER";
    public static final String REJECTED_BY_OWNER = "REJECTED_BY_OWNER";
    public static final String PENDING = "PENDING";
    public static final String CANCELED_BY_RENTER = "CANCELED_BY_RENTER";
    public static final String CANCELED_BY_OWNER = "CANCELED_BY_OWNER";
    public static final String RENTED = "RENTED";
    public static final String FINISHED = "FINISHED";
    public static final String EXPIRED = "EXPIRED";

    @Id
    @GeneratedValue(strategy = jakarta.persistence.GenerationType.IDENTITY)
    private Long id;

    @Column(name = "status",nullable = false,unique = true)
    private String status;
}
