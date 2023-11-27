package com.zpi.backend.reservation_status;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

@Repository
public interface ReservationStatusRepository extends JpaRepository<ReservationStatus, Long> {
    Optional<ReservationStatus> findByStatus(String status);
    List<ReservationStatus> findAllByStatusIn(Collection<String> status);
}
