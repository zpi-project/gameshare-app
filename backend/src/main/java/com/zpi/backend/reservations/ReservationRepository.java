package com.zpi.backend.reservations;

import com.zpi.backend.user.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    Page<Reservation> getReservationsByRenter(Pageable pageable, User renter);

    @Query(
            value = "select r.end_date,r.renter_comment,r.start_date,r.timestamp,r.renter_id ,r.status_id,r.game_instance_id," +
                    "GI.uuid, GI.game_id,GI.owner_id,GI.price_per_day,GI.description,GI.is_active," +
                    "U.google_id,U.uuid,U.email,U.first_name,U.last_name,U.phone_number,U.location_longitude," +
                    "U.location_latitude,U.avatar_link,U.avg_rating, " +
                    "s.status,"+
                    "r.id as reservation_id, GI.id as gi_game_instance_id," +
                    "U.id " +
                    "from reservations r join game_instances GI on r.game_instance_id = gi.id " +
                    "join users U on GI.owner_id = U.id " +
                    "join reservation_status s on r.status_id = s.id " +
                    "where U.uuid = :uuid and s.status <> 'Expired' and s.status <> 'Finished'",
            nativeQuery = true
    )
    Page<Reservation> getReservationsByOwner(Pageable pageable,@Param("uuid") String uuid);
}
