package com.zpi.backend.user;

import com.zpi.backend.category.exception.CategoryDoesNotExistException;
import com.zpi.backend.dto.ResultsDTO;
import com.zpi.backend.exception_handlers.BadRequestException;
import com.zpi.backend.user.dto.UpdateUserDTO;
import com.zpi.backend.user.dto.UserDTO;
import com.zpi.backend.user.dto.UserGuestDTO;
import com.zpi.backend.user.exception.UserAlreadyExistsException;
import com.zpi.backend.user.exception.UserDoesNotExistException;
import io.swagger.v3.oas.annotations.Operation;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;


import java.util.Optional;

@RestController
@AllArgsConstructor
@CrossOrigin("${FRONTEND_HOST}:${FRONTEND_PORT}")
public class UserController {
    UserService userService;

    @Operation(
            summary = "Get user",
            description = "Returns the user's own data"
    )
    @GetMapping("/user")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<UserDTO> getUser(Authentication authentication) throws UserDoesNotExistException {
        System.out.println("... called getUser");
        User user = userService.getUser(authentication);
        UserDTO userInfo = new UserDTO(user);
        return ResponseEntity.status(HttpStatus.OK)
                .body(userInfo);
    }

    @Operation(
            summary = "Get user by UUID",
            description = "Returns users data using UUID"
    )
    @GetMapping("/user/{uuid}")
    public ResponseEntity<UserGuestDTO> getUserById(@PathVariable("uuid") String uuid, Authentication authentication) throws UserDoesNotExistException {
        System.out.println("... called getUserByUUID");
        return ResponseEntity.status(HttpStatus.OK)
                .body(userService.getUserByUUID(authentication, uuid));
    }

    @Operation(
            summary = "Register a new user",
            description = "Creates a new user in the database using authentication data, including first name, last name, phone number, and location."
    )
    @PostMapping("/user")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<String> createUser(@RequestBody UpdateUserDTO updateUserDTO, Authentication authentication, Optional<String> language) throws UserAlreadyExistsException {
        System.out.println("... called createUser");
        userService.registerUser(updateUserDTO, authentication, language);
        return ResponseEntity.status(HttpStatus.CREATED).body("User created");
    }

    @Operation(
            summary = "Update user's data",
            description = "Modifies user data, including first name, last name, phone number, and location."
    )
    @PutMapping("/user")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<String> updateUser(@RequestBody UpdateUserDTO updateUserDTO, Authentication authentication) throws UserDoesNotExistException, BadRequestException {
        System.out.println("... called updateUser");
        userService.updateUser(authentication, updateUserDTO);
        return ResponseEntity.status(HttpStatus.OK).body("User updated");
    }

    @Operation(
            summary = "Get users using filters",
            description = "Returns Users filtered by name, category, age, players number, availability " +
                    "and sorted by distance (calculated by latitude and longitude) from the database."
    )
    @GetMapping("/user/search")
    public ResponseEntity<ResultsDTO<UserGuestDTO>> getUsers(@RequestParam Optional<String> searchName,
                                                             @RequestParam Optional<Long> categoryId, @RequestParam Optional<Integer> age,
                                                             @RequestParam Optional<Integer> playersNumber, @RequestParam Optional<Integer> maxPricePerDay,
                                                             @RequestParam Optional<String> userUUID, @RequestParam double latitude,
                                                             @RequestParam double longitude, @RequestParam int size, @RequestParam int page) throws CategoryDoesNotExistException {
        System.out.println("... called getUsersSearch");
        return ResponseEntity.status(HttpStatus.OK)
                .body(userService.getUsersSearch(size, page, searchName, categoryId, age, playersNumber, maxPricePerDay, userUUID, latitude, longitude));
    }
}
