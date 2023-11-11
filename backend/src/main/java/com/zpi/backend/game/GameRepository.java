package com.zpi.backend.game;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface GameRepository extends JpaRepository<Game, Long> {

    @Query(
            value = "select  G.id, original_id, G.name, age, min_players, max_players, playing_time," +
                    "short_description, image,game_status_id from games G join game_statuses GS on G.game_status_id = GS.id" +
                    " where lower(G.name) like %:name% and GS.status = 'Accepted'",
            nativeQuery = true
    )
    Page<Game> searchAllByNameContains(@Param("name") String name, Pageable pageable);

    @Query(
            value = "select  G.id, original_id, G.name, age, min_players, max_players, playing_time," +
                    "short_description, image,game_status_id from games G join game_statuses GS on G.game_status_id = GS.id"
                    +" where GS.status = 'Accepted'",
            nativeQuery = true
    )
    Page<Game> getAllAccepted(Pageable pageable);

    Optional<Game> findGameById(Long id);
    Boolean existsGameByName(String name);

    @Query(
            value = "select  G.id, original_id, G.name, age, min_players, max_players, playing_time," +
                    "short_description, image,game_status_id from games G join game_statuses GS on G.game_status_id = GS.id" +
                    " where G.id = :id and GS.status = 'Accepted'",
            nativeQuery = true
    )
    Optional<Game> findByIdAndAccepted(@Param("id") Long id);
    @Query(value = "select distinct G.id, original_id, G.name, age, min_players, max_players, playing_time, " +
            "short_description, image,game_status_id " +
            "from games G join games_categories GC on G.id = GC.game_id " +
            "join game_statuses GS on G.game_status_id = GS.id " +
            "where GC.category_id in :categories and GS.status = 'Accepted'",
    nativeQuery = true)

    Page<Game> getAllByAcceptedAndCategoriesIn(Pageable pageable, @Param("categories") List<Integer> categoriesIds);
    @Query(value = "select distinct G.id, original_id, G.name, age, min_players, max_players, playing_time, " +
            "short_description, image,game_status_id " +
            "from games G join games_categories GC on G.id = GC.game_id " +
            "join game_statuses GS on G.game_status_id = GS.id " +
            "where GC.category_id in :categories and GS.status = 'Accepted' and lower(G.name) like %:name%",
            nativeQuery = true)
    Page<Game>  searchAllByNameContainsAndAcceptedAndCategoriesIn(@Param("name") String name, @Param("categories") List<Integer> categoriesIds, Pageable pageable);

    @Query(value = "select u.uuid as uuid, u.first_name as firstName, u.last_name as lastName, " +
            "u.location_latitude as locationLatitude, u.location_longitude as locationLongitude, " +
            "u.avatar_link as avatarLink, " +
            "u.avg_rating as userRate, gi.uuid as gameInstanceUUID, " +
            "g.name as gameName, gi.avg_rating as gameInstanceRate," +
            "sqrt(pow(u.location_latitude - :userLatitude, 2) + pow(u.location_longitude - :userLongitude, 2)) as distance " +
            "from games g join game_instances gi on g.id = gi.game_id " +
            "join users u on gi.owner_id = u.id " +
            "where g.id = :gameId " +
            "order by distance;",
            nativeQuery = true)
    Page<Object[]> getAllUsersWithGameAndRating(@Param("gameId") long gameId, @Param("userLatitude") double latitude,
                                                @Param("userLongitude") double longitude, Pageable pageable);

}
