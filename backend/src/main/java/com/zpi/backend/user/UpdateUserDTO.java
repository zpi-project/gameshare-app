package com.zpi.backend.user;

import com.zpi.backend.exception_handlers.BadRequestException;
import com.zpi.backend.validators.ValueChecker;
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


    public boolean validate() throws BadRequestException {
        if (ValueChecker.isStringEmpty(firstName))
            throw new BadRequestException("First name cannot be empty");
        if (ValueChecker.isStringEmpty(lastName))
            throw new BadRequestException("Last name cannot be empty");
        if (ValueChecker.isPhoneIncorrect(phoneNumber)){
            throw new BadRequestException("Phone number is incorrect");
        }
        if (ValueChecker.isCoordinateIncorrect(locationLatitude)){
            throw new BadRequestException("Latitude is incorrect");
        }
        if (ValueChecker.isCoordinateIncorrect(locationLongitude)){
            throw new BadRequestException("Longitude is incorrect");
        }
        return true;
    }
}
