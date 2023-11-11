package com.zpi.backend.reservation_status;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReservationStatusRepository extends JpaRepository<ReservationStatus, Long> {
    ReservationStatus findByStatus(String status);
}
