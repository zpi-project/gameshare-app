package com.zpi.backend.game;

import com.zpi.backend.game_status.GameStatus;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

import static com.zpi.backend.game_status.GameStatus.*;

@Repository
public interface GameRepository extends JpaRepository<Game, Long> {

    @Query(
            value = "select  G.id, original_id, G.name,G.name_pl, age, min_players, max_players, playing_time," +
                    "short_description,short_description_pl, image,game_status_id from games G join game_statuses GS on G.game_status_id = GS.id" +
                    " where lower(G.name) like %:name% and GS.status = '"+ACCEPTED+"'",
            nativeQuery = true
    )
    Page<Game> searchAllByNameContains(@Param("name") String name, Pageable pageable);

    @Query(
            value = "select  G.id, original_id, G.name,G.name_pl, age, min_players, max_players, playing_time," +
                    "short_description, short_description_pl, image,game_status_id from games G join game_statuses GS on G.game_status_id = GS.id"
                    +" where GS.status = '"+ACCEPTED+"'",
            nativeQuery = true
    )
    Page<Game> getAllAccepted(Pageable pageable);

    Optional<Game> findGameById(Long id);
    Boolean existsGameByName(String name);

    @Query(
            value = "select  G.id, original_id, G.name,G.name_pl, age, min_players, max_players, playing_time," +
                    "short_description, short_description_pl, image,game_status_id from games G join game_statuses GS on G.game_status_id = GS.id" +
                    " where G.id = :id and GS.status = '"+ACCEPTED+"'",
            nativeQuery = true
    )
    Optional<Game> findByIdAndAccepted(@Param("id") Long id);
    @Query(value = "select distinct G.id, original_id, G.name,G.name_pl, age, min_players, max_players, playing_time, " +
            "short_description,short_description_pl, image,game_status_id " +
            "from games G join games_categories GC on G.id = GC.game_id " +
            "join game_statuses GS on G.game_status_id = GS.id " +
            "where GC.category_id in :categories and GS.status = '"+ACCEPTED+"'",
    nativeQuery = true)

    Page<Game> getAllByAcceptedAndCategoriesIn(Pageable pageable, @Param("categories") List<Integer> categoriesIds);
    @Query(value = "select distinct G.id, original_id, G.name, G.name_pl, age, min_players, max_players, playing_time, " +
            "short_description, short_description_pl, image,game_status_id " +
            "from games G join games_categories GC on G.id = GC.game_id " +
            "join game_statuses GS on G.game_status_id = GS.id " +
            "where GC.category_id in :categories and GS.status = '"+ACCEPTED+"' and lower(G.name) like %:name%",
            nativeQuery = true)
    Page<Game>  searchAllByNameContainsAndAcceptedAndCategoriesIn(@Param("name") String name, @Param("categories") List<Integer> categoriesIds, Pageable pageable);

    @Query("select g from Game g " +
            "join GameInstance gi on g = gi.game " +
            "join Reservation r on gi = r.gameInstance " +
            "group by g " +
            "order by count(*) desc")
    Page<Game> getPopularAcceptedGames(Pageable pageable);

    @Modifying
    @Transactional
    @Query("update Game g set g.image = :imageLink " +
            "where g = :game")
    void updateImageLink(@Param("game") Game game, @Param("imageLink") String imageLink);

    Page<Game> findAllByGameStatus(Pageable pageable, GameStatus status);
}
