package com.zpi.backend.user;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UpdateUserDTO {
    private String firstName;
    private String lastName;
    private String phoneNumber;
    private double locationLatitude;
    private double locationLongitude;
}
