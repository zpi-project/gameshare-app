package com.zpi.backend.user;

import com.zpi.backend.role.Role;
import com.zpi.backend.role.RoleService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
@Service
@AllArgsConstructor
public class UserService {
    @Autowired
    private  UserRepository userRepository;
    private RoleService roleService;
    public RegisteredUserDTO registerUser(String email) {

        User user = this.userRepository.findByEmail(email);
        if(user == null) {
            user = new User();
            user.setEmail(email);
            user.setRole(roleService.getRoleByName("user"));
            this.userRepository.save(user);
        }

        return new RegisteredUserDTO(user.getRole().getName(),user.isRegistered());
    }


}
