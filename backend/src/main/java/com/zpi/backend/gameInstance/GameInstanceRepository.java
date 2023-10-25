package com.zpi.backend.gameInstance;

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
    List<GameInstance> findByOwnerUuid(String ownerUUID, Pageable pageable);
//TODO Query to do
    @Query(value = "select distinct G.id, original_id, G.name, age, min_players, max_players, playing_time, " +
            "short_description, accepted, image " +
            "from game_instances GI " +
            "join games G on G.id = GI.game_id " +
            "join games_categories GC on G.id = GC.game_id " +
            "join users U on U.id = GI.owner_id " +
            "where GC.category_id in :categories and accepted = true " +
            "and :age >= age " +
            "and :playerNumbers between min_players and max_players " +
            "order by sqrt(pow(U.location_latitude, 2) + pow(:latitude, 2)) + sqrt(pow(U.location_longitude, 2) + pow(:longitude, 2))",
            nativeQuery = true)
    List<GameInstance> filterGameByParameters(@Param("categories") List<Long> categoryIds, @Param("age") Integer age,
                                               @Param("playersNumber") Integer playersNumber, @Param("latitude") double latitude,
                                               @Param("longitude") double longitude, Pageable pageable);
}
