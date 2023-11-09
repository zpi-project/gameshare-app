package com.zpi.backend.user;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserGameInstanceDTO {
    private String uuid;
    private String firstName;
    private String lastName;
    private String avatarLink;
    private double avgRating;

    public UserGameInstanceDTO(User user){
        uuid = user.getUuid();
        firstName = user.getFirstName();
        lastName = user.getLastName();
        avatarLink = user.getAvatarLink();
        avgRating = user.getAvgRating();
    }
}
