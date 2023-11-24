package com.zpi.backend.recommendation;

import com.zpi.backend.dto.Pagination;
import com.zpi.backend.dto.ResultsDTO;
import com.zpi.backend.game.Game;
import com.zpi.backend.game.dto.GameDTO;
import com.zpi.backend.user.User;
import com.zpi.backend.user.UserService;
import com.zpi.backend.user.exception.UserDoesNotExistException;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class RecommendationService {

    @Value("${APRIORI_MIN_SUPPORT}")
    private static int APRIORI_MIN_SUPPORT;
    @Value("${APRIORI_MIN_CONFIDENCE}")
    private static double APRIORI_MIN_CONFIDENCE;

    private final RecommendationRepository recommendationRepository;
    private final UserService userService;

    public ResultsDTO<GameDTO> getRecommendedGames(Authentication authentication, int page, int size) throws UserDoesNotExistException {
        Pageable pageable = PageRequest.of(page, size);
        User loggedInUser = userService.getUser(authentication);

        Set<Long> gameIds = new HashSet<>(recommendationRepository
                .getAllGamesInUserReservations(loggedInUser.getId()));
        List<AssociationRule> associationRules = getAllAssociationRules();

        if (gameIds.isEmpty() || associationRules.isEmpty())
            return new ResultsDTO<>(List.of(), new Pagination(0,0));

        Set<Long> recommendedGameIds = associationRules.stream()
                .filter(rule -> ruleContainsPlayedGames(rule, gameIds))
                .sorted((rule1, rule2) -> Double.compare(rule2.getConfidence(), rule1.getConfidence()))
                .flatMap(ar -> ar.getConsequent().stream())
                .collect(Collectors.toSet());

        // Removing games that user already played
        recommendedGameIds.removeAll(gameIds);

        Page<Game> recommendedGames = recommendationRepository.getRecommendedGames(recommendedGameIds, pageable);

        return new ResultsDTO<>(recommendedGames
                .stream()
                .map(GameDTO::new)
                .collect(Collectors.toList()),
                new Pagination(
                recommendedGames.getTotalElements(),
                recommendedGames.getTotalPages()
                )
        );
    }

    private boolean ruleContainsPlayedGames(AssociationRule rule, Set<Long> playedGames) {
        return playedGames.containsAll(rule.getAntecedent());
    }

    public List<Set<Long>> prepareTransactions(){
        HashMap<Long, Set<Long>> usersTransactions = new HashMap<>();

        List<UserGamePair> userGamePairs = recommendationRepository
                .getAllGamesInUsersReservations()
                .stream()
                .map(UserGamePair::new)
                .toList();
        for (UserGamePair ug: userGamePairs){
            if (usersTransactions.containsKey(ug.getUserId()))
                usersTransactions.get(ug.getUserId()).add(ug.getGameId());
            else {
                Set<Long> newSet = new HashSet<>();
                newSet.add(ug.getGameId());
                usersTransactions.put(ug.getUserId(), newSet);
            }
        }

        return usersTransactions.values().stream().toList();
    }

    public List<AssociationRule> getAllAssociationRules(){
        return recommendationRepository
                .findAll()
                .stream()
                .map(AssociationRule::new)
                .collect(Collectors.toList());
    }

    public void runAprioriAlgorithm(){
        AprioriAlgorithm aprioriAlgorithm =
                new AprioriAlgorithm(APRIORI_MIN_SUPPORT, APRIORI_MIN_CONFIDENCE, prepareTransactions());
        List<AssociationRule> associationRuleDBS = aprioriAlgorithm.run();
        recommendationRepository.deleteAll();
        recommendationRepository.saveAll(
                associationRuleDBS.stream()
                        .map(AssociationRuleDB::new)
                        .collect(Collectors.toSet())
        );
    }
}
