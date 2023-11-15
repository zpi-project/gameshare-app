package com.zpi.backend.user;

import com.zpi.backend.emails.EmailService;
import com.zpi.backend.exception_handlers.BadRequestException;
import com.zpi.backend.role.RoleRepository;
import com.zpi.backend.user.dto.UpdateUserDTO;
import com.zpi.backend.user.dto.UserDTO;
import com.zpi.backend.user.dto.UserGuestDTO;
import com.zpi.backend.user.exception.UserAlreadyExistsException;
import com.zpi.backend.user.exception.UserDoesNotExistException;
import com.zpi.backend.validators.AdminChecker;
import lombok.AllArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class UserService {
    private  UserRepository userRepository;
    private final RoleRepository roleRepository;
    private AdminChecker adminChecker;

    private boolean checkIfUserExists(String googleId) {
        User user = this.userRepository.findByGoogleId(googleId).orElse(null);
        return user != null;
    }

    public User getUser(Authentication authentication) throws UserDoesNotExistException {
        String googleId = ((User)authentication.getPrincipal()).getGoogleId();
        return this.userRepository.findByGoogleId(googleId).orElseThrow(()->new UserDoesNotExistException("User not found"));
    }

    public User getUserByUUID(String uuid) throws UserDoesNotExistException {
        return this.userRepository.findByUuid(uuid).orElseThrow(()->new UserDoesNotExistException("User not found"));
    }

    public UserGuestDTO getUserByUUID(Authentication authentication, String uuid) throws UserDoesNotExistException {
        User user = getUserByUUID(uuid);
        if (authentication == null || !authentication.isAuthenticated())
            return new UserGuestDTO(user);
        else
            return new UserDTO(user);

    }


    public void updateUser(Authentication authentication,UpdateUserDTO updateUserDTO) throws UserDoesNotExistException, BadRequestException {
        updateUserDTO.validate();
        User user = getUser(authentication);
        user.update(updateUserDTO);
        this.userRepository.save(user);
    }

    public void registerUser(UpdateUserDTO updateUserDTO, Authentication authentication) throws UserAlreadyExistsException {
        User user = (User) authentication.getPrincipal();
        if(!checkIfUserExists(user.getGoogleId())) {
            user.update(updateUserDTO);
            if(adminChecker.isAdmin(user.getEmail()))
                user.setRole(roleRepository.getRoleByName("admin"));
            else
                user.setRole(roleRepository.getRoleByName("user"));
            userRepository.save(user);
        }
        else {
            throw new UserAlreadyExistsException("User already exists");
        }
    }
    public void updateAvgRating(long userId){
        userRepository.updateAvgRating(userId);
    }

}
