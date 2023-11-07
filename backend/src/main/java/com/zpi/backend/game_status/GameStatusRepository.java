package com.zpi.backend.game_status;

import org.springframework.data.jpa.repository.JpaRepository;

public interface GameStatusRepository extends JpaRepository<GameStatus, Long> {

    GameStatus getGameStatusByStatus(String name);
}
