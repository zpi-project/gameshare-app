package com.zpi.backend.user;

import com.zpi.backend.role.RoleRepository;
import com.zpi.backend.role.RoleService;
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

    public GetUserDTO getUserInfoByEmail(String email) throws UserDoesNotExistException {
        User user = this.userRepository.findByEmail(email).orElseThrow(()->new UserDoesNotExistException("User not found"));
        return new GetUserDTO(user.getFirstName(),user.getLastName(),user.getPhoneNumber()
                ,user.getLocationLatitude(),
                user.getLocationLongitude(),user.getEmail(),user.getAvatarLink());
    }


    public User getUser(Authentication authentication) throws UserDoesNotExistException {
        String googleId = ((User)authentication.getPrincipal()).getGoogleId();
        return this.userRepository.findByEmail(googleId).orElseThrow(()->new UserDoesNotExistException("User not found"));
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
