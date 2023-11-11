package com.zpi.backend.reservation_status;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ReservationRepository extends JpaRepository<ReservationStatus, Long> {

}
