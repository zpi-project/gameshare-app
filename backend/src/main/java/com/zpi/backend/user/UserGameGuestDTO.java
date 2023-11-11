package com.zpi.backend.user;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserGameGuestDTO {
    private String uuid;
    private String firstName;
    private String lastName;
    private double locationLatitude;
    private double locationLongitude;
    private String avatarLink;
    private double avgRating;


    public UserGameGuestDTO(User user){
        uuid = user.getUuid();
        firstName = user.getFirstName();
        lastName = user.getLastName();
        locationLatitude = user.getLocationLatitude();
        locationLongitude = user.getLocationLongitude();
        avatarLink = user.getAvatarLink();
        avgRating = (double) Math.round(user.getAvgRating() * 100) /100;
    }
}
