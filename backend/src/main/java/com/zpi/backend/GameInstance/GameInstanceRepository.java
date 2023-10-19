package com.zpi.backend.GameInstance;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GameInstanceRepository extends JpaRepository<GameInstance, Long> {
}
