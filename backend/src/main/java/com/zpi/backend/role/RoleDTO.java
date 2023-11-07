package com.zpi.backend.role;

import lombok.Data;

@Data
public class RoleDTO {
    private String name;
    public RoleDTO fromRole(Role role){
        this.name = role.getName();
        return this;
    }
}
