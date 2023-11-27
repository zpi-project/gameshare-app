package com.zpi.backend.email_type;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "email_types")
public class EmailType {

    public static final String REGISTRATION = "REGISTRATION";
    public static final String RESERVATION_ACCEPTED = "RESERVATION_ACCEPTED";
    public static final String RESERVATION_REJECTED = "RESERVATION_REJECTED";
    public static final String RESERVATION_PENDING = "RESERVATION_PENDING";
    public static final String RESERVATION_COMING_SOON = "RESERVATION_COMING_SOON";
    public static final String RESERVATION_CANCELED_BY_OWNER = "RESERVATION_CANCELED_BY_OWNER";
    public static final String RESERVATION_CANCELED_BY_RENTER = "RESERVATION_CANCELED_BY_RENTER";
    public static final String RESERVATION_FINISHED = "RESERVATION_FINISHED";
    public static final String RESERVATION_TODAY = "RESERVATION_TODAY";
    public static final String RESERVATION_EXPIRED = "RESERVATION_EXPIRED";
    public static final String NEW_GAME = "NEW_GAME";

    @Id
    @GeneratedValue(strategy = jakarta.persistence.GenerationType.IDENTITY)
    private long id;
    @Column(nullable = false,unique = true)
    private String type;
}
