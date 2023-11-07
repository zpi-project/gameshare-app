package com.zpi.backend.user;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserGameDTO extends UserGameGuestDTO {
    private String phoneNumber;

    public UserGameDTO(User user){
        super(user);
        phoneNumber = user.getPhoneNumber();
    }
}
