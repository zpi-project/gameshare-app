package com.zpi.backend.user_opinion;


import com.zpi.backend.dto.ResultsDTO;
import com.zpi.backend.exception_handlers.BadRequestException;
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
    @GetMapping("/user/opinions")
    public ResponseEntity<ResultsDTO<UserOpinion>> getMyOpinions(Authentication authentication, @RequestParam int page, @RequestParam int size) throws UserDoesNotExistException {
        System.out.println("... called getMyOpinions");
        return ResponseEntity.ok().body(userOpinionService.getMyOpinions(authentication,page,size));
    }

    @Operation(
            summary = "Add opinion about user",
            description = "Adds a new opinion about user identified with UUID to database."
    )
    @PreAuthorize("isAuthenticated()")
    @PostMapping("/user/opinions")
    public ResponseEntity<UserOpinion> addOpinion(Authentication authentication, @RequestBody NewUserOpinionDTO newUserOpinionDTO) throws UserDoesNotExistException, BadRequestException {
        System.out.println("... called addOpinion");
        UserOpinion userOpinion = userOpinionService.addOpinion(authentication,newUserOpinionDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(userOpinion);
    }

    @Operation(
            summary = "Get opinions about user",
            description = "Returns all opinions that were given to the user with a given UUID"
    )

    @GetMapping("/user/{uuid}/opinions")
    public ResponseEntity<ResultsDTO<UserOpinion>> getOpinions(@PathVariable String uuid, @RequestParam int page, @RequestParam int size) throws UserDoesNotExistException {
        System.out.println("... called getOpinions");
        return ResponseEntity.ok().body(userOpinionService.getOpinions(uuid,page,size));
    }

    @Operation(
            summary = "Update opinion",
            description = "Updates opinion with a given id"
    )
    @PreAuthorize("isAuthenticated()")
    @PutMapping("/user/opinions/{id}")
    public ResponseEntity<UserOpinion> updateOpinion(Authentication authentication,@PathVariable long id, @RequestBody UpdateUserOpinionDTO updateUserOpinionDTO)
            throws UserDoesNotExistException, EditSomeoneElseOpinionException, OpinionDoesNotExistException, BadRequestException {
        System.out.println("... called updateOpinion");
        return ResponseEntity.ok().body(userOpinionService.updateOpinion(authentication,id,updateUserOpinionDTO));
    }

    @Operation(
            summary = "Delete opinion",
            description = "Deletes opinion with a given id"
    )
    @PreAuthorize("isAuthenticated()")
    @DeleteMapping("/user/opinions/{id}")
    public ResponseEntity deleteOpinion(Authentication authentication,@PathVariable long id)
            throws UserDoesNotExistException, DeleteSomeoneElseOpinionException, OpinionDoesNotExistException {
        System.out.println("... called deleteOpinion");
        userOpinionService.deleteOpinion(authentication,id);
        return ResponseEntity.ok().build();
    }
}
