package com.zpi.backend.game;

import jakarta.persistence.NamedQuery;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface GameRepository extends JpaRepository<Game, Long> {
    List<Game> searchAllByNameContainsIgnoreCaseAndAcceptedIsTrue(String name, Pageable pageable);
    List<Game> getAllByAcceptedIsTrue(Pageable pageable);
    boolean existsGameByNameAndAcceptedIsTrue(String name);
    Optional<Game> findByIdAndAcceptedIsTrue(Long id);
    @Query(value = "select distinct G.id, original_id, G.name, age, min_players, max_players, playing_time, " +
            "short_description, accepted, image " +
            "from games G join games_categories GC on G.id = GC.game_id " +
            "where GC.category_id in :categories and accepted = true",
    nativeQuery = true)
    List<Game> getAllByAcceptedAndCategoriesIn(Pageable pageable, @Param("categories") List<Integer> categoriesIds);
    @Query(value = "select distinct G.id, original_id, G.name, age, min_players, max_players, playing_time, " +
            "short_description, accepted, image " +
            "from games G join games_categories GC on G.id = GC.game_id " +
            "where GC.category_id in :categories and accepted = true and G.name like %:name%",
            nativeQuery = true)
    List<Game>  searchAllByNameContainsAndAcceptedAndCategoriesIn(@Param("name") String name, @Param("categories") List<Integer> categoriesIds, Pageable pageable);
}
