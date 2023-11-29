package com.zpi.backend.game_instance;

import com.zpi.backend.reservations.Reservation;
import com.zpi.backend.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

import static com.zpi.backend.reservation_status.ReservationStatus.ACCEPTED_BY_OWNER;
import static com.zpi.backend.reservation_status.ReservationStatus.RENTED;

@Repository
public interface GameInstanceRepository extends JpaRepository<GameInstance, Long>, JpaSpecificationExecutor<GameInstance> {
    Optional<GameInstance> findByUuid(String uuid);
    Optional<GameInstance> findByUuidAndOwner(String gameUUID, User owner);
    @Modifying
    @Transactional
    @Query(value = "update game_instances " +
            "set avg_rating = " +
            "(select avg(stars) from game_instance_opinions " +
            "where game_instance_id = :gameInstanceId), " +
            "opinions_amount = (select count(*) from game_instance_opinions " +
            "where game_instance_id = :gameInstanceId)" +
            "where id = :gameInstanceId",
            nativeQuery = true)
    void updateAvgRatingAndOpinionsAmount(@Param("gameInstanceId") long gameInstanceId);

    @Query("select count(*) from GameInstanceImage gii " +
            "where gii.gameInstance.uuid = :gameInstanceUUID")
    int howManyGameInstanceImages(@Param("gameInstanceUUID") String gameInstanceUUID);

}
