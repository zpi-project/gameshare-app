package com.zpi.backend.user;

import lombok.Data;

@Data
public class GetUserDTO {
    private String firstName;
    private String lastName;
    private String phoneNumber;
    private String avatarLink;
    private double locationLongitude;
    private double locationLatitude;

    public GetUserDTO(User user) {
        this.firstName = user.getFirstName();
        this.lastName = user.getLastName();
        this.phoneNumber = user.getPhoneNumber();
        this.avatarLink = user.getAvatarLink();
        this.locationLongitude = user.getLocationLongitude();
        this.locationLatitude = user.getLocationLatitude();
    }
}
