package com.zpi.backend.user;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class GetMyUserDTO {
    private String firstName;
    private String lastName;
    private String phoneNumber;
    private double locationLatitude;
    private double locationLongitude;
    private String email;
    private String avatarLink;

    public GetMyUserDTO() {

    }

    public GetMyUserDTO fromUser(User user){
        this.firstName = user.getFirstName();
        this.lastName = user.getLastName();
        this.phoneNumber = user.getPhoneNumber();
        this.locationLatitude = user.getLocationLatitude();
        this.locationLongitude = user.getLocationLongitude();
        this.email = user.getEmail();
        this.avatarLink = user.getAvatarLink();
        return this;
    }
}
