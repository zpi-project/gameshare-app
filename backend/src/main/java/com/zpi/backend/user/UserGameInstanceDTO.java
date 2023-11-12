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
    private double locationLongitude;
    private double locationLatitude;
    private double avgRating;

    public UserGameInstanceDTO(User user){
        uuid = user.getUuid();
        firstName = user.getFirstName();
        lastName = user.getLastName();
        avatarLink = user.getAvatarLink();
        avgRating = (double) Math.round(user.getAvgRating() * 100) /100;
        locationLatitude = user.getLocationLongitude();
        locationLongitude = user.getLocationLongitude();
    }
}
