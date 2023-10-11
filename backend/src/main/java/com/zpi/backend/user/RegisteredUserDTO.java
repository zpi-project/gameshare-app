package com.zpi.backend.user;

import com.zpi.backend.role.Role;
import lombok.AllArgsConstructor;

@AllArgsConstructor
public class RegisteredUserDTO {
    private Role role;
    private Boolean isRegistered;
}
