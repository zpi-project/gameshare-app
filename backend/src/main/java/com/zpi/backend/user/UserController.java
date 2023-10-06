package com.zpi.backend.user;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
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
    public String auth_test(Authentication authentication) {
        System.out.println("... called auth");
        String userId;
        User user = (User) authentication.getPrincipal();
        return user.getEmail();
    }

    @PostMapping("/register")
    public String register( Authentication authentication) {
        if (authentication == null) {
            return "invalid token";
        }
        System.out.println("... called register");
        try{
            userService.registerUser((User) authentication.getPrincipal());
        }catch (UserAlreadyExistsException e){
            return "user already exists";
        }
        return "ok";
    }
    @GetMapping("/test")
    public String test() {
        return "test";
    }
}
