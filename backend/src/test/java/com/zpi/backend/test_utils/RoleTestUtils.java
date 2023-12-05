package com.zpi.backend.test_utils;

import com.zpi.backend.role.Role;

public class RoleTestUtils {
    public static Role createRole(String name) {
        Role role = new Role();
        role.setName(name);
        return role;
    }
}
