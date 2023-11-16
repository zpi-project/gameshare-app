package com.zpi.backend.game_instance_image;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface GameInstanceImageRepository extends JpaRepository<GameInstanceImage, Long> {
    Optional<GameInstanceImage> findByGameInstanceUuidAndGameInstance_OwnerGoogleId(
            String gameInstanceImageUUID, String googleId);

    void deleteAllByGameInstanceUuid(String gameInstanceUUID);
}
