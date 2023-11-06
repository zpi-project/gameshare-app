package com.zpi.backend.gameInstance;

import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

@Repository
public interface GameInstanceRepository extends JpaRepository<GameInstance, Long> {
    Optional<GameInstance> findByUuid(String uuid);
    Optional<GameInstance> findByUuidAndOwner_GoogleId(String gameUUID, String ownerGoogleId);
    Page<GameInstance> findByOwnerUserUuid(String ownerUUID, Pageable pageable);
    Page<GameInstance> findByOwnerUserUuidAndGameNameContainingIgnoreCase(String ownerUUID, String searchName, Pageable pageable);
    @Query(value="select distinct *, " +
            "sqrt(pow(U.location_latitude, 2) + pow(:latitude, 2)) " +
            "+ sqrt(pow(U.location_longitude, 2) + pow(:longitude, 2)) AS distance " +
            "from game_instances GI " +
            "join games G on G.id = GI.game_id " +
            "join games_categories GC on G.id = GC.game_id " +
            "join users U on U.id = GI.owner_id " +
            "where G.name like %:gameName% and accepted = true " +
            "ORDER BY distance;",
            nativeQuery = true
    )
    Page<GameInstance> searchByGameNameSortByDistance(String gameName, double latitude, double longitude, Pageable pageable);

//TODO Query to do
    @Query(value = "select distinct *, " +
            "sqrt(pow(U.location_latitude, 2) + pow(:latitude, 2)) " +
            "+ sqrt(pow(U.location_longitude, 2) + pow(:longitude, 2)) AS distance " +
            "from game_instances GI " +
            "join games G on G.id = GI.game_id " +
            "join games_categories GC on G.id = GC.game_id " +
            "join users U on U.id = GI.owner_id " +
            "where GC.category_id in :categories and accepted = true " +
            "and :age >= age " +
            "and :playersNumber between min_players and max_players " +
            "ORDER BY distance;",
            nativeQuery = true)
    Page<GameInstance> filterGameInstancesByParameters(@Param("categories") Optional<List<Long>> categoryIds, @Param("age") Optional<Integer> age,
                                                       @Param("playersNumber") Optional<Integer> playersNumber, @Param("latitude") double latitude,
                                                       @Param("longitude") double longitude, Pageable pageable);

}
