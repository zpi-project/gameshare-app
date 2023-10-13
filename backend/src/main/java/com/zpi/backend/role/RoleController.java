package com.zpi.backend.role;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class RoleController {

    private final RoleService roleService;
    @PostMapping("/role")
    public Role addRole(@RequestBody Role role) {
        return roleService.addRole(role);
    }

}


