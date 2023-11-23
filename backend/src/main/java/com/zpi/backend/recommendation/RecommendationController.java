package com.zpi.backend.recommendation;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Set;

@AllArgsConstructor
@RestController
@RequestMapping("recommendation")
public class RecommendationController {

    private final RecommendationService recommendationService;

    @RequestMapping(method = RequestMethod.GET, value = "/transactions")
    public List<Set<Long>> getTransactions(){
        return recommendationService.prepareTransactions();
    }
}
