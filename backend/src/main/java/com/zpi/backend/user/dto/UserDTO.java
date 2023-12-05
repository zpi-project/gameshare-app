package com.zpi.backend.user.dto;

import com.zpi.backend.user.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO extends UserGuestDTO {
    private String phoneNumber;

    public UserDTO(User user){
        super(user);
        phoneNumber = user.getPhoneNumber();
    }
}
