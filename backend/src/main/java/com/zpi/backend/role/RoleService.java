package com.zpi.backend.role;

import com.zpi.backend.user.User;
import com.zpi.backend.user.exception.UserDoesNotExistException;
import com.zpi.backend.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import static com.zpi.backend.role.Role.ADMIN;

@Service
@RequiredArgsConstructor
public class RoleService {
    private final UserService userService;


    public Role getRole(Authentication authentication) throws UserDoesNotExistException {
        User user = userService.getUser(authentication);
        return user.getRole();
    }

    public boolean checkIfAdmin(Authentication authentication) throws UserDoesNotExistException {
        User user = userService.getUser(authentication);
        return user.getRole().getName().equals(ADMIN);
    }
}
