package com.zpi.backend.recommendation;

import com.zpi.backend.dto.ResultsDTO;
import com.zpi.backend.game.Game;
import com.zpi.backend.game.dto.GameDTO;
import com.zpi.backend.user.exception.UserDoesNotExistException;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@AllArgsConstructor
@RestController
@RequestMapping("recommendations")
public class RecommendationController {

    private final RecommendationService recommendationService;

    @RequestMapping(method = RequestMethod.GET, value = "/transactions")
    public ResponseEntity<List<Set<Long>>> getTransactions() {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(recommendationService.prepareTransactions());
    }

    @RequestMapping(method = RequestMethod.GET, value = "/apriori")
    public ResponseEntity runApriori() {
        recommendationService.runAprioriAlgorithm();
        return ResponseEntity.ok().build();
    }

    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<List<AssociationRule>> getAssociationRules() {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(recommendationService.getAllAssociationRules());
    }

    @RequestMapping(method = RequestMethod.GET, value = "/user")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ResultsDTO<GameDTO>> getRecommendations(Authentication authentication,
                                                                  @RequestParam(defaultValue = "0") int page,
                                                                  @RequestParam(defaultValue = "5") int size) throws UserDoesNotExistException {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(recommendationService.getRecommendedGames(authentication, page, size));
    }
}
