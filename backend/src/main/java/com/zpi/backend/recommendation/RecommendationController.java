package com.zpi.backend.recommendation;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Set;

@AllArgsConstructor
@RestController
@RequestMapping("recommendations")
public class RecommendationController {

    private final RecommendationService recommendationService;

    @RequestMapping(method = RequestMethod.GET, value = "/transactions")
    public ResponseEntity<List<Set<Long>>> getTransactions(){
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(recommendationService.prepareTransactions());
    }

    @RequestMapping(method = RequestMethod.GET, value = "/apriori")
    public ResponseEntity runApriori(){
        recommendationService.runAprioriAlgorithm();
        return ResponseEntity.ok().build();
    }

    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<List<AssociationRule>> getAssociationRules(){
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(recommendationService.getAllAssociationRules());
    }
}
