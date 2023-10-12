package com.zpi.backend.user;

import com.zpi.backend.role.Role;
import com.zpi.backend.role.RoleService;
import com.zpi.backend.security.InvalidTokenException;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
@Service
@AllArgsConstructor
public class UserService {
    private  UserRepository userRepository;
    private RoleService roleService;
    public RegisteredUserDTO registerUser(User user) throws UndefinedUserException {

        if(!checkIfUserExists(user.getEmail())) {
            user.setRole(roleService.getRoleByName("user"));
            this.userRepository.save(user);
        }
        else {
            // Should never throw this exception
            user = this.userRepository.findByEmail(user.getEmail()).orElseThrow(() ->
                    new UndefinedUserException("User Does Not Exist but it should"));
        }

        return new RegisteredUserDTO(user.getRole().getName(),user.isRegistered());
    }

    private boolean checkIfUserExists(String email) {
        User user = this.userRepository.findByEmail(email).orElse(null);
        return user != null;
    }

    public GetUserDTO getUserInfoByEmail(String email) throws UserDoesNotExistException {
        User user = this.userRepository.findByEmail(email).orElseThrow(()->new UserDoesNotExistException("User not found"));
        return new GetUserDTO(user.getFirstName(),user.getLastName(),user.getPhoneNumber()
                ,user.getLocationLatitude(),
                user.getLocationLongitude(),user.getEmail(),user.getAvatarLink());
    }


    public void updateUser(User user,UpdateUserDTO updateUserDTO) throws UndefinedUserException, InvalidTokenException {



        user = this.userRepository.findByEmail(user.getEmail()).orElseThrow(()->new UndefinedUserException("User not found"));
        user.setFirstName(updateUserDTO.getFirstName());
        user.setLastName(updateUserDTO.getLastName());
        user.setPhoneNumber(updateUserDTO.getPhoneNumber());
        user.setLocationLatitude(updateUserDTO.getLocationLatitude());
        user.setLocationLongitude(updateUserDTO.getLocationLongitude());
        this.userRepository.save(user);

    }
}
