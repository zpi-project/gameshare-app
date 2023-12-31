package com.zpi.backend.game_instance_opinion;

import com.zpi.backend.dto.ResultsDTO;
import com.zpi.backend.exception_handlers.BadRequestException;
import com.zpi.backend.game_instance.exception.GameInstanceDoesNotExistException;
import com.zpi.backend.game_instance_opinion.dto.GameInstanceOpinionDTO;
import com.zpi.backend.game_instance_opinion.dto.NewGameInstanceOpinionDTO;
import com.zpi.backend.game_instance_opinion.dto.UpdatedGameInstanceOpinionDTO;
import com.zpi.backend.game_instance_opinion.exception.GameInstanceOpinionDoesNotExistException;
import com.zpi.backend.user.exception.UserDoesNotExistException;
import com.zpi.backend.user_opinion.exception.DeleteSomeoneElseOpinionException;
import com.zpi.backend.user_opinion.exception.EditSomeoneElseOpinionException;
import io.swagger.v3.oas.annotations.Operation;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@CrossOrigin("${FRONTEND_HOST}:${FRONTEND_PORT}")
@RequestMapping("/game-instances")
public class GameInstanceOpinionController {

    private GameInstanceOpinionService gameInstanceOpinionService;

    @Operation(
            summary = "Add opinion about game instance",
            description = "Adds a new opinion about Game Instance identified by UUID to database."
    )
    @PreAuthorize("isAuthenticated()")
    @PostMapping("/opinions")
    public ResponseEntity<GameInstanceOpinionDTO> addOpinion(Authentication authentication, @RequestBody NewGameInstanceOpinionDTO newUserOpinionDTO)
            throws UserDoesNotExistException, BadRequestException, GameInstanceDoesNotExistException {
        System.out.println("... called addGameInstanceOpinion");
        GameInstanceOpinionDTO userOpinion = gameInstanceOpinionService.addOpinion(authentication,newUserOpinionDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(userOpinion);
    }

    @Operation(
            summary = "Update game instance opinion",
            description = "Updates Game Instance Opinion identified by id"
    )
    @PreAuthorize("isAuthenticated()")
    @PutMapping("/opinions/{id}")
    public ResponseEntity<GameInstanceOpinionDTO> updateOpinion(Authentication authentication,@PathVariable long id,
                                                                @RequestBody UpdatedGameInstanceOpinionDTO updatedGameInstanceOpinionDTO)
            throws UserDoesNotExistException, EditSomeoneElseOpinionException, GameInstanceOpinionDoesNotExistException, BadRequestException {
        System.out.println("... called updateGameInstanceOpinion");
        return ResponseEntity.ok().body(gameInstanceOpinionService.updateOpinion(authentication,id,updatedGameInstanceOpinionDTO));
    }

    @Operation(
            summary = "Delete opinion",
            description = "Deletes opinion with identified by id"
    )
    @PreAuthorize("isAuthenticated()")
    @DeleteMapping("/opinions/{id}")
    public ResponseEntity deleteOpinion(Authentication authentication,@PathVariable long id)
            throws UserDoesNotExistException, DeleteSomeoneElseOpinionException, GameInstanceOpinionDoesNotExistException {
        System.out.println("... called deleteGameInstanceOpinion");
        gameInstanceOpinionService.deleteOpinion(authentication,id);
        return ResponseEntity.ok().build();
    }

    @Operation(
            summary = "Get opinions about game instance",
            description = "Returns all opinions that were given to the Game Instance identified by UUID"
    )

    @GetMapping("/{gameInstanceUuid}/opinions")
    public ResponseEntity<ResultsDTO<GameInstanceOpinionDTO>> getOpinions(Authentication authentication, @PathVariable String gameInstanceUuid,
                                                                          @RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size)
            throws GameInstanceDoesNotExistException {
        System.out.println("... called getGameInstanceOpinions");
        return ResponseEntity.ok()
                .body(gameInstanceOpinionService.getOpinions(authentication, gameInstanceUuid,page,size));
    }


}
