package com.zpi.backend.user;

import com.zpi.backend.security.InvalidTokenException;
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
    public ResponseEntity<GetUserDTO> getUser(@RequestParam String email, Authentication authentication) throws UserDoesNotExistException {
        GetUserDTO userInfo = userService.getUserInfoByEmail(email);
        return ResponseEntity.status(HttpStatus.OK).body(userInfo);
    }


    @PostMapping("/user")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<String> createUser(@RequestBody UpdateUserDTO updateUserDTO, Authentication authentication) throws  UserAlreadyExistsException {
        userService.registerUser(updateUserDTO, authentication);
        return ResponseEntity.status(HttpStatus.CREATED).body("User created");
    }
}
