package com.zpi.backend.role;

import com.zpi.backend.user.UserDoesNotExistException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin("${FRONTEND_HOST}:${FRONTEND_PORT}")
@RestController
@RequiredArgsConstructor
public class RoleController {

    private final RoleService roleService;

    @GetMapping("/role")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<RoleDTO> getRole(Authentication authentication) throws UserDoesNotExistException {
        RoleDTO roleDTO = new RoleDTO().fromRole(roleService.getRole(authentication));
        return ResponseEntity.ok(roleDTO);
    }

}


