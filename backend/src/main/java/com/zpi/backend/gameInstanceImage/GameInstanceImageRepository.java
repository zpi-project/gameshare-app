package com.zpi.backend.gameInstanceImage;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GameInstanceImageRepository extends JpaRepository<GameInstanceImage, Long> {
}
