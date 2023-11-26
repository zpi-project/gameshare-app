package com.zpi.backend.reservations;

import com.zpi.backend.game_instance.GameInstance;
import com.zpi.backend.reservation_status.ReservationStatus;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import static com.zpi.backend.reservation_status.ReservationStatus.*;

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


    @Query(
            "From Reservation r where r.gameInstance.uuid= :gameInstanceUuid and " +
                    "(r.status.status = '"+ACCEPTED_BY_OWNER+"' or r.status.status = '"+RENTED+"')"
    )
    List<Reservation> findAcceptedOrRentedReservationsByGameInstance(@Param("gameInstanceUuid") String gameInstanceUuid);

    Page<Reservation> getReservationsByGameInstance_Uuid(Pageable pageable, String gameInstanceUuid);

    List<Reservation> getReservationsByGameInstanceAndStatusIn(GameInstance gameInstance, Collection<ReservationStatus> status);

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
            value = "SELECT * FROM reservations r " +
                    "join reservation_status rs on r.status_id = rs.id " +
                    "WHERE date(start_date) = CURRENT_DATE + INTERVAL '2 days' " +
                    "and rs.status = '"+ACCEPTED_BY_OWNER+"'", nativeQuery = true
    )
    List<Reservation> getReservationsStartingInTwoDays();

    @Query(
            value = "from Reservation WHERE date(startDate) = CURRENT_DATE " +
                    "and status.status = '"+ACCEPTED_BY_OWNER+"'"
    )
    List<Reservation> getReservationsStartingToday();

    @Modifying
    @Transactional
    @Query(value = "update reservations set status_id = " +
            "(select id from reservation_status where status = '"+EXPIRED+"') " +
            "where date(start_date) >= CURRENT_DATE " +
            "and status_id = (select id from reservation_status where status = '"+PENDING+"')",
            nativeQuery = true)
    void setExpiredStatus();

    @Query(value = "from Reservation where date(startDate) = CURRENT_DATE and status.status = 'PENDING'")
    List<Reservation> getExpiringReservations();

    @Query(value = "from Reservation where (" +
            "(date(startDate) <= :acceptedStartDate and :acceptedStartDate <= date(endDate)) or " +
            "(date(startDate) <= :acceptedEndDate and :acceptedEndDate <= date(endDate)) or " +
            "(:acceptedStartDate <= date(startDate) and date(endDate) <= :acceptedEndDate)) " +
            "and status.status = '"+PENDING+"'" +
            "and gameInstance = :gameInstance")
    List<Reservation> getReservationToReject(@Param("gameInstance") GameInstance gameInstance,
                                             @Param("acceptedStartDate") Date acceptedStartDate,
                                             @Param("acceptedEndDate") Date acceptedEndDate);

    @Modifying
    @Transactional
    @Query("update Reservation as r set r.status = " +
            "(select rs from ReservationStatus as rs where rs.status = '"+CANCELED_BY_OWNER+"') " +
            "where r.gameInstance = :gameInstance and r.startDate > CURRENT_DATE " +
            "and r.status in (select rs from ReservationStatus as rs " +
            "where rs.status in ('"+ACCEPTED_BY_OWNER+"', '"+PENDING+"'))")
    void setReservationStatusAsCanceledByOwnerForGameInstance(@Param("gameInstance") GameInstance gameInstance);
}
