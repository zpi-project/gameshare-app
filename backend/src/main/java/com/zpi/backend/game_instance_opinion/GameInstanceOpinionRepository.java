package com.zpi.backend.game_instance_opinion;


import com.zpi.backend.game_instance.GameInstance;
import com.zpi.backend.reservations.Reservation;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GameInstanceOpinionRepository extends JpaRepository<GameInstanceOpinion, Long> {
    Page<GameInstanceOpinion> getGameInstanceOpinionsByGameInstance(GameInstance gameInstance, Pageable pageable);
    List<GameInstanceOpinion> getGameInstanceOpinionByGameInstance(GameInstance gameInstance);
    GameInstanceOpinion getGameInstanceOpinionByReservation(Reservation reservation);
}
