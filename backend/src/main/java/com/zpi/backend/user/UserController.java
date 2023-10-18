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

    // TODO Add @Operation - summary and description
    @GetMapping("/user")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<GetMyUserDTO> getUser(Authentication authentication) throws UserDoesNotExistException {
        System.out.println("... called getUser");
        User user = userService.getUser(authentication);
        GetMyUserDTO userInfo = new GetMyUserDTO(user);
        return ResponseEntity.status(HttpStatus.OK).body(userInfo);
    }

    // TODO Add @Operation - summary and description
// Shouldn't it me uuid not google id?
    @GetMapping("/user/{googleId}")
    public ResponseEntity<GetUserDTO> getUserById(@PathVariable("googleId") String googleId) throws UserDoesNotExistException {
        System.out.println("... called getUserById");
        User user = userService.getUserByGoogleId(googleId);
        GetUserDTO userInfo = new GetUserDTO(user);
        return ResponseEntity.status(HttpStatus.OK).body(userInfo);
    }

    // TODO Add @Operation - summary and description
    @PostMapping("/user")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<String> createUser(@RequestBody UpdateUserDTO updateUserDTO, Authentication authentication) throws  UserAlreadyExistsException {
        System.out.println("... called createUser");
        userService.registerUser(updateUserDTO, authentication);
        return ResponseEntity.status(HttpStatus.CREATED).body("User created");
    }

    // TODO Add @Operation - summary and description
    @PutMapping("/user")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<String> updateUser(@RequestBody UpdateUserDTO updateUserDTO, Authentication authentication) throws UndefinedUserException, UserDoesNotExistException {
        System.out.println("... called updateUser");
        userService.updateUser(authentication, updateUserDTO);
        return ResponseEntity.status(HttpStatus.OK).body("User updated");
    }
}
