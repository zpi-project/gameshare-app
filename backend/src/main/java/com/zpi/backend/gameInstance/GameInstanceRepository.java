package com.zpi.backend.gameInstance;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface GameInstanceRepository extends JpaRepository<GameInstance, Long> {
    Optional<GameInstance> findByUuid(String uuid);
    Optional<GameInstance> findByUuidAndOwner_GoogleId(String gameUUID, String ownerGoogleId);
}
