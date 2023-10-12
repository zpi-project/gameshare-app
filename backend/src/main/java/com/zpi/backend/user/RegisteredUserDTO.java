package com.zpi.backend.user;

import com.zpi.backend.role.Role;
import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class RegisteredUserDTO {
    private String role;
    private Boolean isRegistered;

    @Override
    public String toString() {
        return "RegisteredUserDTO{" +
                "role=" + role +
                ", isRegistered=" + isRegistered +
                '}';
    }
}