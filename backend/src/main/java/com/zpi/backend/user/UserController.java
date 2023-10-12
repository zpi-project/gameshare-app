package com.zpi.backend.user;

import com.zpi.backend.security.InvalidTokenException;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;

import static org.springframework.web.servlet.function.ServerResponse.status;

@RestController
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    @Autowired
    UserService userService;


    @GetMapping("/user")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<GetUserDTO> getUser(@RequestParam String email, Authentication authentication) throws UserDoesNotExistException {
        GetUserDTO userInfo = userService.getUserInfoByEmail(email);
        return ResponseEntity.status(HttpStatus.OK).body(userInfo);
    }

    @PutMapping("/user")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<String> updateUser(@RequestBody UpdateUserDTO updateUserDTO, Authentication authentication) throws UserDoesNotExistException, InvalidTokenException, UndefinedUserException {
        User user = (User) authentication.getPrincipal();
        userService.updateUser(user,updateUserDTO);
        return ResponseEntity.status(HttpStatus.OK).body("");
    }




    @PostMapping("/register")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<RegisteredUserDTO> register(Authentication authentication) throws UserAlreadyExistsException, InvalidTokenException, UndefinedUserException {
        System.out.println("... called register");
        User user = (User) authentication.getPrincipal();
        RegisteredUserDTO registeredUserDTO = userService.registerUser(user);
        return ResponseEntity.status(HttpStatus.OK).body(registeredUserDTO);
    }

}
