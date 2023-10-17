package com.zpi.backend.game;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface GameRepository extends JpaRepository<Game, Long> {
    List<Game> searchAllByNameContainsIgnoreCaseAndAcceptedIsTrue(String name, Pageable pageable);
    List<Game> getAllByAcceptedIsTrue(Pageable pageable);
    boolean existsGameByNameAndAcceptedIsTrue(String name);
    Optional<Game> findByIdAndAcceptedIsTrue(Long id);
}
