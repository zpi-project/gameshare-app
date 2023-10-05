package com.zpi.backend.user;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.NonNull;
import org.springframework.boot.autoconfigure.security.oauth2.resource.OAuth2ResourceServerProperties;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.core.Authentication;

import java.net.Authenticator;

@RestController
@AllArgsConstructor
public class UserController {


    UserService userService;
    @GetMapping("/auth")
    @PreAuthorize("isAuthenticated()")
    public String auth_test(Authentication authentication) {
        System.out.println("... called getFavouritePlaces");
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
