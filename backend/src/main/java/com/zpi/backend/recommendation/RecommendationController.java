package com.zpi.backend.recommendation;

import com.zpi.backend.dto.ResultsDTO;
import com.zpi.backend.game.dto.GameDTO;
import com.zpi.backend.user.exception.UserDoesNotExistException;
import io.swagger.v3.oas.annotations.Operation;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;


@AllArgsConstructor
@RestController
@RequestMapping("recommendations")
public class RecommendationController {

    private final RecommendationService recommendationService;

    @Operation(
            summary = "Generate Association Rules using Apriori Algorithm.",
            description = "Generates association rules using the Apriori algorithm for personalized game recommendations. " +
                    "This process is automated and scheduled to run every Monday at 12:00 AM. " +
                    "Note: This operation cannot be triggered from the frontend application."
    )
    @RequestMapping(method = RequestMethod.GET, value = "/apriori")
    public ResponseEntity runApriori() {
        recommendationService.runAprioriAlgorithm();
        return ResponseEntity.ok().build();
    }

    @Operation(
            summary = "Retrieve game recommendations for logged-in user.",
            description = "Retrieves suggested game recommendations for the logged-in user based on " +
                    "their own previous reservations and those of others."
    )
    @RequestMapping(method = RequestMethod.GET, value = "/user")
    @PreAuthorize("isAuthenticated()")
    @CrossOrigin("${FRONTEND_HOST}:${FRONTEND_PORT}")
    public ResponseEntity<ResultsDTO<GameDTO>> getRecommendations(Authentication authentication,
                                                                  @RequestParam(defaultValue = "0") int page,
                                                                  @RequestParam(defaultValue = "5") int size) throws UserDoesNotExistException {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(recommendationService.getRecommendedGames(authentication, page, size));
    }
}
