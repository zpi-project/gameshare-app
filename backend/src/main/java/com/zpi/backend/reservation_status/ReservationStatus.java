package com.zpi.backend.reservation_status;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "reservation_status")
public class ReservationStatus {
    @Id
    @GeneratedValue(strategy = jakarta.persistence.GenerationType.IDENTITY)
    private Long id;

    @Column(name = "status",nullable = false,unique = true)
    private String status;
}
