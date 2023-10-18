package com.zpi.backend.user;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;

@RestController
@AllArgsConstructor
@CrossOrigin("${FRONTEND_HOST}:${FRONTEND_PORT}")
public class UserController {

    @Autowired
    UserService userService;


    @GetMapping("/user")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<GetMyUserDTO> getUser(Authentication authentication) throws UserDoesNotExistException {
        User user = userService.getUser(authentication);
        GetMyUserDTO userInfo = new GetMyUserDTO().fromUser(user);
        return ResponseEntity.status(HttpStatus.OK).body(userInfo);
    }


    @GetMapping("/user/{googleId}")
    public ResponseEntity<GetUserDTO> getUserById(@PathVariable("googleId") String googleId) throws UserDoesNotExistException {
        User user = userService.getUserByGoogleId(googleId);
        GetUserDTO userInfo = new GetUserDTO().fromUser(user);
        return ResponseEntity.status(HttpStatus.OK).body(userInfo);
    }


    @PostMapping("/user")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<String> createUser(@RequestBody UpdateUserDTO updateUserDTO, Authentication authentication) throws  UserAlreadyExistsException {
        userService.registerUser(updateUserDTO, authentication);
        return ResponseEntity.status(HttpStatus.CREATED).body("User created");
    }

    @PutMapping("/user")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<String> updateUser(@RequestBody UpdateUserDTO updateUserDTO, Authentication authentication) throws UndefinedUserException, UserDoesNotExistException {
        userService.updateUser(authentication, updateUserDTO);
        return ResponseEntity.status(HttpStatus.OK).body("User updated");
    }
}
