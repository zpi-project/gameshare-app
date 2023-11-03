package com.zpi.backend.gameInstanceImage;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface GameInstanceImageRepository extends JpaRepository<GameInstanceImage, Long> {
    Optional<GameInstanceImage> findByGameInstanceUuidAndGameInstance_OwnerGoogleId(
            String gameInstanceImageUUID, String googleId);

}
