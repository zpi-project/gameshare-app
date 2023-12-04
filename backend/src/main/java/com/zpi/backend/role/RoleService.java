package com.zpi.backend.role;

import com.zpi.backend.user.User;
import com.zpi.backend.user.exception.UserDoesNotExistException;
import com.zpi.backend.user.UserService;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import static com.zpi.backend.role.Role.*;

@Service
public class RoleService {
    private final UserService userService;
    private final RoleRepository roleRepository;


    public RoleService(UserService userService, RoleRepository roleRepository) {
        this.userService = userService;
        this.roleRepository = roleRepository;
    }

    public Role getRole(Authentication authentication) throws UserDoesNotExistException {
        User user = userService.getUser(authentication);
        return user.getRole();
    }

    public boolean checkIfAdmin(Authentication authentication) throws UserDoesNotExistException {
        User user = userService.getUser(authentication);
        return user.getRole().getName().equals(ADMIN);
    }

    private void saveRoles(){
        saveRole(ADMIN);
        saveRole(USER);
    }

    private void saveRole(String name){
        if (!roleRepository.existsRoleByName(name)){
            roleRepository.save(new Role(name));
        }
    }
}
