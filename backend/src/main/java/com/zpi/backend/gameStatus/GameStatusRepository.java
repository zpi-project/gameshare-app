package com.zpi.backend.gameStatus;

import org.springframework.data.jpa.repository.JpaRepository;

public interface GameStatusRepository extends JpaRepository<GameStatus, Long> {

    GameStatus getGameStatusByStatus(String name);
}
