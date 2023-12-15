package com.zpi.backend.recommendation;

import com.zpi.backend.game.Game;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Set;

import static com.zpi.backend.reservation_status.ReservationStatus.*;

@Repository
public interface RecommendationRepository extends JpaRepository<AssociationRuleDB, Long> {

    // Recommendations query
    @Query("select r.renter.id as userId, gi.game.id as gameId " +
            "from GameInstance gi " +
            "join Reservation r on gi = r.gameInstance")
    List<Object[]> getAllGamesInUsersReservations();

    @Query("select gi.game.id as gameId " +
            "from GameInstance gi " +
            "join Reservation r on gi = r.gameInstance " +
            "where r.renter.id = :userId " +
            "and r.status.status in ('"+PENDING+"','"+ACCEPTED_BY_OWNER+"','"+RENTED+"', '"+FINISHED+"')")
    List<Long> getAllGamesInUserReservations(@Param("userId") long userId);

    @Query("select g from Game g where g.id in :gamesIds")
    Page<Game> getRecommendedGames(@Param("gamesIds") Set<Long> gamesIds, Pageable pageable);

    @Query("select gi.game.id as gameId " +
            "from GameInstance gi " +
            "where gi.owner.id = :userId")
    List<Long> getAllUserGameInstances(@Param("userId") long userId);
}
