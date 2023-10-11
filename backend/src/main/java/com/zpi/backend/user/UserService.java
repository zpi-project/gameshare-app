package com.zpi.backend.user;

import com.zpi.backend.role.Role;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
@Service
@AllArgsConstructor
public class UserService {
    @Autowired
    private  UserRepository userRepository;
    public RegisteredUserDTO registerUser(User user) {

        if(this.userRepository.findByEmail(user.getEmail()) == null) {
            user.setRole(new Role("USER"));
            this.userRepository.save(user);
        }
        return new RegisteredUserDTO(user.getRole(),user.isRegistered());
    }


}
