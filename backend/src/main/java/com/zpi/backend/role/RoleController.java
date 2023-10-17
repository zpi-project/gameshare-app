package com.zpi.backend.role;

import com.zpi.backend.user.UserDoesNotExistException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
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

    @GetMapping("/role")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<String> getRole(Authentication authentication) throws UserDoesNotExistException {
        return ResponseEntity.ok(roleService.getRole(authentication).getName());
    }

}


