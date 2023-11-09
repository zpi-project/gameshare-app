package com.zpi.backend.game_instance;

import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

@Repository
public interface GameInstanceRepository extends JpaRepository<GameInstance, Long>, JpaSpecificationExecutor<GameInstance> {
    Optional<GameInstance> findByUuid(String uuid);
    Optional<GameInstance> findByUuidAndOwner_GoogleId(String gameUUID, String ownerGoogleId);
    Page<GameInstance> findByOwnerUuid(String ownerUUID, Pageable pageable);
    Page<GameInstance> findByOwnerUuidAndGameNameContainingIgnoreCase(String ownerUUID, String searchName, Pageable pageable);
    @Modifying
    @Query(value = "update game_instances " +
            "set avgRating = " +
            "(select avg(stars) from game_instance_opinion " +
            "where game_instance_id = :gameInstanceId)" +
            "where id = :gameInstanceId",
            nativeQuery = true)
    void updateAvgRating(@Param("gameInstanceId") long gameInstanceId);

}