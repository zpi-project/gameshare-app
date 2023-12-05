package com.zpi.backend.user_opinion;


import com.zpi.backend.dto.ResultsDTO;
import com.zpi.backend.exception_handlers.BadRequestException;
import com.zpi.backend.user.exception.UserDoesNotExistException;
import com.zpi.backend.user_opinion.dto.ModifiedUserOpinionDTO;
import com.zpi.backend.user_opinion.dto.NewUserOpinionDTO;
import com.zpi.backend.user_opinion.dto.UserOpinionDTO;
import com.zpi.backend.user_opinion.exception.DeleteSomeoneElseOpinionException;
import com.zpi.backend.user_opinion.exception.EditSomeoneElseOpinionException;
import com.zpi.backend.user_opinion.exception.UserOpinionDoesNotExistException;
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
            description = "Returns all opinions that were given to the user, Only currently logged user can use this endpoint."
    )
    @PreAuthorize("isAuthenticated()")
    @GetMapping("/user/opinions")
    public ResponseEntity<ResultsDTO<UserOpinionDTO>> getMyOpinions(Authentication authentication, @RequestParam(defaultValue = "0") int page,
                                                                    @RequestParam(defaultValue = "10") int size) throws UserDoesNotExistException {
        System.out.println("... called getMyOpinions");
        return ResponseEntity.ok().body(userOpinionService.getMyOpinions(authentication,page,size));
    }

    @Operation(
            summary = "Add opinion about user",
            description = "Adds a new opinion about user identified with UUID to database."
    )
    @PreAuthorize("isAuthenticated()")
    @PostMapping("/user/opinions")
    public ResponseEntity<UserOpinionDTO> addOpinion(Authentication authentication, @RequestBody NewUserOpinionDTO newUserOpinionDTO) throws UserDoesNotExistException, BadRequestException {
        System.out.println("... called addOpinion");
        UserOpinionDTO userOpinion = userOpinionService.addOpinion(authentication,newUserOpinionDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(userOpinion);
    }

    @Operation(
            summary = "Get opinions about user",
            description = "Returns all opinions that were given to the user with a given UUID, everyone can use " +
                    "this endpoint."
    )

    @GetMapping("/user/{uuid}/opinions")
    public ResponseEntity<ResultsDTO<UserOpinionDTO>> getOpinions(Authentication authentication, @PathVariable String uuid,
                                                                  @RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size) throws UserDoesNotExistException {
        System.out.println("... called getOpinions");
        return ResponseEntity.ok().body(userOpinionService.getOpinions(authentication, uuid,page,size));
    }

    @Operation(
            summary = "Update opinion",
            description = "Updates opinion with a given id, User that created the opinion can edit it."
    )
    @PreAuthorize("isAuthenticated()")
    @PutMapping("/user/opinions/{id}")
    public ResponseEntity<UserOpinionDTO> updateOpinion(Authentication authentication, @PathVariable long id, @RequestBody ModifiedUserOpinionDTO modifiedUserOpinionDTO)
            throws UserDoesNotExistException, EditSomeoneElseOpinionException, UserOpinionDoesNotExistException, BadRequestException {
        System.out.println("... called updateOpinion");
        return ResponseEntity.ok().body(userOpinionService.updateOpinion(authentication,id, modifiedUserOpinionDTO));
    }

    @Operation(
            summary = "Delete opinion",
            description = "Deletes opinion with a given id, Only user that created the opinion can delete it."
    )
    @PreAuthorize("isAuthenticated()")
    @DeleteMapping("/user/opinions/{id}")
    public ResponseEntity deleteOpinion(Authentication authentication,@PathVariable long id)
            throws UserDoesNotExistException, DeleteSomeoneElseOpinionException, UserOpinionDoesNotExistException {
        System.out.println("... called deleteOpinion");
        userOpinionService.deleteOpinion(authentication,id);
        return ResponseEntity.ok().build();
    }
}
