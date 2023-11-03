package com.zpi.backend.role;

import com.zpi.backend.user.User;
import com.zpi.backend.user.UserDoesNotExistException;
import com.zpi.backend.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Service
//TODO make it only for admin user
@RequiredArgsConstructor
public class RoleService {
    private final RoleRepository roleRepository;
    private final UserService userService;

    public Role getRoleByName(String name) {
        return roleRepository.getRoleByName(name);
    }

    public Role getRole(Authentication authentication) throws UserDoesNotExistException {
        User user = userService.getUser(authentication);
        return user.getRole();
    }

    public boolean checkIfAdmin(Authentication authentication) throws UserDoesNotExistException {
        User user = userService.getUser(authentication);
        return user.getRole().getName().equals("admin");
    }
}
