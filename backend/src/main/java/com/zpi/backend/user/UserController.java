package com.zpi.backend.user;

import io.swagger.v3.oas.annotations.Operation;
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

    @Operation(
            summary = "Get user",
            description = "Returns the user's own data"
    )
    @GetMapping("/user")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<GetMyUserDTO> getUser(Authentication authentication) throws UserDoesNotExistException {
        System.out.println("... called getUser");
        User user = userService.getUser(authentication);
        GetMyUserDTO userInfo = new GetMyUserDTO(user);
        return ResponseEntity.status(HttpStatus.OK).body(userInfo);
    }

    @Operation(
            summary = "Get user by UUID",
            description = "Returns users data using UUID"
    )
    @GetMapping("/user/{uuid}")
    public ResponseEntity<GetUserDTO> getUserById(@PathVariable("uuid") String googleId) throws UserDoesNotExistException {
        System.out.println("... called getUserByUUID");
        User user = userService.getUserByUUID(googleId);
        GetUserDTO userInfo = new GetUserDTO(user);
        return ResponseEntity.status(HttpStatus.OK).body(userInfo);
    }

    @Operation(
            summary = "Register a new user",
            description = "Creates a new user in the database using authentication data, including first name, last name, phone number, and location."
    )
    @PostMapping("/user")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<String> createUser(@RequestBody UpdateUserDTO updateUserDTO, Authentication authentication) throws  UserAlreadyExistsException {
        System.out.println("... called createUser");
        userService.registerUser(updateUserDTO, authentication);
        return ResponseEntity.status(HttpStatus.CREATED).body("User created");
    }

    @Operation(
            summary = "Update user's data",
            description = "Modifies user data, including first name, last name, phone number, and location."
    )
    @PutMapping("/user")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<String> updateUser(@RequestBody UpdateUserDTO updateUserDTO, Authentication authentication) throws UserDoesNotExistException {
        System.out.println("... called updateUser");
        userService.updateUser(authentication, updateUserDTO);
        return ResponseEntity.status(HttpStatus.OK).body("User updated");
    }
}
