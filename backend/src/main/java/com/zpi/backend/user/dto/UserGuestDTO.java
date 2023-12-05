package com.zpi.backend.user.dto;

import com.zpi.backend.user.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserGuestDTO {
    private String uuid;
    private String firstName;
    private String lastName;
    private double locationLatitude;
    private double locationLongitude;
    private String avatarLink;
    private double avgRating;
    private int opinionsAmount;

    public UserGuestDTO(User user){
        uuid = user.getUuid();
        firstName = user.getFirstName();
        lastName = user.getLastName();
        locationLatitude = user.getLocationLatitude();
        locationLongitude = user.getLocationLongitude();
        avatarLink = user.getAvatarLink();
        avgRating = (double) Math.round(user.getAvgRating() * 100) /100;
        opinionsAmount = user.getOpinionsAmount();
    }
}
