package com.zpi.backend.user_opinion;


import com.zpi.backend.exceptionHandlers.BadRequestException;
import com.zpi.backend.role.NewUserOpinionDTO;
import com.zpi.backend.user.UserDoesNotExistException;
import io.swagger.v3.oas.annotations.Operation;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("${FRONTEND_HOST}:${FRONTEND_PORT}")
@AllArgsConstructor
public class UserOpinionController {

    UserOpinionService userOpinionService;

    @Operation(
            summary = "Get opinions about myself",
            description = "Returns all opinions that were given to the user"
    )
    @PreAuthorize("isAuthenticated()")
    @GetMapping("/userOpinion")
    public ResponseEntity getMineOpinions(Authentication authentication, @RequestParam int page, @RequestParam int size) throws UserDoesNotExistException {
        System.out.println("... called getMineOpinions");
        return ResponseEntity.ok().body(userOpinionService.getMineOpinions(authentication,page,size));
    }

    @Operation(
            summary = "Add opinion about user",
            description = "Adds a new opinion about user identified with UUID to database."
    )
    @PreAuthorize("isAuthenticated()")
    @PostMapping("/userOpinion")
    public ResponseEntity addOpinion(Authentication authentication, @RequestBody NewUserOpinionDTO newUserOpinionDTO) throws UserDoesNotExistException, BadRequestException {
        System.out.println("... called addOpinion");
        UserOpinion userOpinion = userOpinionService.addOpinion(authentication,newUserOpinionDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(userOpinion);
    }




}
