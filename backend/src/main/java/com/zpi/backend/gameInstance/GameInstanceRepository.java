package com.zpi.backend.gameInstance;

import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

@Repository
public interface GameInstanceRepository extends JpaRepository<GameInstance, Long>, JpaSpecificationExecutor<GameInstance> {
    Optional<GameInstance> findByUuid(String uuid);
    Optional<GameInstance> findByUuidAndOwner_GoogleId(String gameUUID, String ownerGoogleId);
    Page<GameInstance> findByOwnerUuid(String ownerUUID, Pageable pageable);
    Page<GameInstance> findByOwnerUuidAndGameNameContainingIgnoreCase(String ownerUUID, String searchName, Pageable pageable);

}
