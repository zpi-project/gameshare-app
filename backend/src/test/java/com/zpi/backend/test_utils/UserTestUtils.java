package com.zpi.backend.test_utils;

import com.zpi.backend.user.User;

public class UserTestUtils {
    public static User createUser(String role) {
        User user = new User();
        user.setFirstName("firstName");
        user.setLastName("lastName");
        user.setEmail("email");
        user.setId(1L);
        user.setAvatarLink("Avatar link");
        user.setAvgRating(5.0);
        user.setRole(RoleTestUtils.createRole(role));
        return user;
    }

    public static User createUserOwner(String Role) {
        User user = new User();
        user.setFirstName("firstNameOwner");
        user.setLastName("lastNameOwner");
        user.setEmail("emailOwner");
        user.setId(2L);
        user.setAvatarLink("Avatar link");
        user.setAvgRating(5.0);
        user.setRole(RoleTestUtils.createRole(Role));
        return user;
    }
}
