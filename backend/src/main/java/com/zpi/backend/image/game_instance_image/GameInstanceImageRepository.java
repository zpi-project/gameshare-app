package com.zpi.backend.image.game_instance_image;

import com.zpi.backend.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface GameInstanceImageRepository extends JpaRepository<GameInstanceImage, Long> {
    Optional<GameInstanceImage> findByIdAndGameInstanceOwner(
            long gameInstanceImageID, User owner);
}
