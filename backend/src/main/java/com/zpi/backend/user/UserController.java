package com.zpi.backend.user;

import com.zpi.backend.security.InvalidTokenException;
import lombok.AllArgsConstructor;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.core.Authentication;

@RestController
@AllArgsConstructor
public class UserController {
    @Autowired
    UserService userService;
    @GetMapping("/auth")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<String> auth_test(Authentication authentication) {
        System.out.println("... called auth");
        String userId;
        User user = (User) authentication.getPrincipal();
        return ResponseEntity.status(HttpStatus.OK).body(user.getEmail());
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(Authentication authentication) throws UserAlreadyExistsException, InvalidTokenException {
        if (authentication == null) {
            throw new InvalidTokenException("Invalid token!");
        }
        System.out.println("... called register");
        userService.registerUser((User) authentication.getPrincipal());
        return ResponseEntity.status(HttpStatus.OK).body("OK");
    }
    @GetMapping("/test")
    public ResponseEntity<String > test() {
        return ResponseEntity.status(HttpStatus.OK).body("OK");
    }
}
