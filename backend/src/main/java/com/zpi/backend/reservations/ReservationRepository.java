package com.zpi.backend.reservations;

import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Long> {


    @Query(
           "From Reservation r where r.renter.uuid = :uuid and r.status.status = :status"
    )
    Page<Reservation> getReservationsByRenterAndStatus(Pageable pageable,@Param("uuid") String renterUuid,@Param("status") String status);

    @Query(
           "From Reservation r where r.gameInstance.owner.uuid = :uuid and r.status.status = :status"
    )
    Page<Reservation> getCurrentReservationsByOwnerAndStatus(Pageable pageable, @Param("uuid") String OwnerUuid, @Param("status") String status);

    List<Reservation> findReservationsByGameInstance_Uuid(String gameInstanceUuid);


    Page<Reservation> getReservationsByGameInstance_Uuid(Pageable pageable, String gameInstanceUuid);

    Optional<Reservation> getReservationByReservationId(String reservationId);


    @Query(
              "From Reservation r where r.gameInstance.owner.uuid = :uuid"
    )
    Page<Reservation> getReservationsByOwner(Pageable pageable, String uuid);

    @Query(
            "from Reservation r where r.renter.uuid = :uuid"
    )

    Page<Reservation>getReservationsByRenter(Pageable pageable, String uuid);

    @Query(
            value = "SELECT * FROM reservations WHERE date(start_date) = CURRENT_DATE + INTERVAL '2 days' and status_id = 1", nativeQuery = true
    )
    List<Reservation> getReservationsStartingInTwoDays();
    @Query(
            value = "SELECT * FROM reservations WHERE date(start_date) = CURRENT_DATE and status_id = 1", nativeQuery = true
    )
    List<Reservation> getReservationsStartingToday();

    @Modifying
    @Transactional
    @Query(value = "update reservations set status_id = 8 where date(start_date) = CURRENT_DATE and status_id = 3", nativeQuery = true)
    void setExpiredStatus();

    @Query(value = "from Reservation where date(startDate) = CURRENT_DATE and status.id = 3")
    List<Reservation> getExpiringReservations();
}