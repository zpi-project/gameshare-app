package com.zpi.backend.user_opinion;

import com.zpi.backend.reservations.Reservation;
import com.zpi.backend.user.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface UserOpinionRepository extends JpaRepository<UserOpinion, Long> {

    Page<UserOpinion> getUserOpinionsByRatedUserOrderByTimestamp(User ratedUser, Pageable pageable);

    List<UserOpinion> getUserOpinionsByReservationAndRatedUser(Reservation reservation,User ratedUser);
}
