package com.zpi.backend.user;

import lombok.Data;

import java.util.UUID;

@Data
public class GetUserDTO {
    private UUID uuid;
    private String firstName;
    private String lastName;
    private String phoneNumber;
    private String avatarLink;
    private double locationLongitude;
    private double locationLatitude;

    public GetUserDTO(User user) {
        this.uuid = UUID.fromString(user.getUuid());
        this.firstName = user.getFirstName();
        this.lastName = user.getLastName();
        this.phoneNumber = user.getPhoneNumber();
        this.avatarLink = user.getAvatarLink();
        this.locationLongitude = user.getLocationLongitude();
        this.locationLatitude = user.getLocationLatitude();
    }
}
