package com.zpi.backend.recommendation;

import com.zpi.backend.game.Game;
import com.zpi.backend.reservations.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RecommendationRepository extends JpaRepository<Reservation, Long> {

    // Recommendations query
    @Query("select r.renter.id as userId, gi.game.id as gameId " +
            "from GameInstance gi " +
            "join Reservation r on gi = r.gameInstance")
    List<Object[]> getAllGamesInUsersReservations();
}
