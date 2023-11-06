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

}
