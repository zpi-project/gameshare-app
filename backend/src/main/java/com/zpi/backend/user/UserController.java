package com.zpi.backend.user;

import com.zpi.backend.security.InvalidTokenException;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.core.Authentication;

import static org.springframework.web.servlet.function.ServerResponse.status;

@RestController
@AllArgsConstructor
public class UserController {

    @Autowired
    UserService userService;


    @GetMapping("/user")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<User> getUser(Authentication authentication) {
        System.out.println("... called user");
        User user = (User) authentication.getPrincipal();
        return ResponseEntity.status(HttpStatus.OK).body(user);
    }




    @PostMapping("/register")
    public ResponseEntity<RegisteredUserDTO> register(Authentication authentication) throws UserAlreadyExistsException, InvalidTokenException {
        System.out.println("... called register");
        User user = (User) authentication.getPrincipal();
        RegisteredUserDTO registeredUserDTO = userService.registerUser(user.getEmail());
        return ResponseEntity.status(HttpStatus.OK).body(registeredUserDTO);
    }
    @GetMapping("/test")
    public ResponseEntity<String > test() {

        return ResponseEntity.status(HttpStatus.OK).body("OK");
    }
}
