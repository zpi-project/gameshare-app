package com.zpi.backend.user;

import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
@Service
@AllArgsConstructor
public class UserService {


    private  UserRepository userRepository;


    public void registerUser(User user) throws UserAlreadyExistsException {

        if(this.userRepository.findByEmail(user.getEmail()) == null)
            this.userRepository.save(user);
        else
            throw new UserAlreadyExistsException("User already exists");

    }


}
