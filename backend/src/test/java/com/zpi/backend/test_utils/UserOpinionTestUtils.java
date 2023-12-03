package com.zpi.backend.test_utils;

import com.zpi.backend.user.User;
import com.zpi.backend.user_opinion.UserOpinion;

public class UserOpinionTestUtils {
    public static UserOpinion createOpinionFromRenter(User renter, User owner) {
        UserOpinion opinion = new UserOpinion();
        opinion.setId(1L);
        opinion.setRatingUser(renter);
        opinion.setStars(5);
        opinion.setDescription("comment");
        opinion.setRatedUser(owner);
        return opinion;
    }
}
