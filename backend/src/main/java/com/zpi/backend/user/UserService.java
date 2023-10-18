package com.zpi.backend.user;

import com.zpi.backend.role.RoleRepository;
import com.zpi.backend.security.InvalidTokenException;
import lombok.AllArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class UserService {
    private  UserRepository userRepository;
    private final RoleRepository roleRepository;

    private boolean checkIfUserExists(String googleId) {
        User user = this.userRepository.findByGoogleId(googleId).orElse(null);
        return user != null;
    }




    public User getUser(Authentication authentication) throws UserDoesNotExistException {
        String googleId = ((User)authentication.getPrincipal()).getGoogleId();
        return this.userRepository.findByGoogleId(googleId).orElseThrow(()->new UserDoesNotExistException("User not found"));
    }

    public User getUserByGoogleId(String googleId) throws UserDoesNotExistException {

        return this.userRepository.findByGoogleId(googleId).orElseThrow(()->new UserDoesNotExistException("User not found"));
    }


    public void updateUser(Authentication authentication,UpdateUserDTO updateUserDTO) throws UndefinedUserException, UserDoesNotExistException {
        User user = getUser(authentication);
        user.update(updateUserDTO);
        this.userRepository.save(user);

    }

    public void registerUser(UpdateUserDTO updateUserDTO, Authentication authentication) throws UserAlreadyExistsException {
        User user = (User) authentication.getPrincipal();
        if(!checkIfUserExists(user.getGoogleId()))
        {
            user.update(updateUserDTO);
            user.setRole(roleRepository.getRoleByName("user"));
            userRepository.save(user);
        }
        else {
            throw new UserAlreadyExistsException("User already exists");
        }

    }
}
