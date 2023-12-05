package com.zpi.backend.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long>, JpaSpecificationExecutor<User> {
    Optional<User> findByGoogleId(String googleId);
    Optional<User> findByUuid(String uuid);
    Optional<User> findByEmail(String email);
    @Modifying
    @Transactional
    @Query(value = "update users " +
            "set avg_rating = " +
            "(select avg(stars) from user_opinions " +
            "where rated_user_id = :userId), " +
            "opinions_amount = " +
            "(select count(*) from user_opinions " +
            "where rated_user_id = :userId)" +
            "where id = :userId",
            nativeQuery = true)
    void updateAvgRatingAndOpinionsAmount(@Param("userId") long userId);

}
