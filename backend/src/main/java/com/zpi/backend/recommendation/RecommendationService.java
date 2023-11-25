package com.zpi.backend.recommendation;

import com.zpi.backend.dto.Pagination;
import com.zpi.backend.dto.ResultsDTO;
import com.zpi.backend.email.EmailService;
import com.zpi.backend.game.Game;
import com.zpi.backend.game.dto.GameDTO;
import com.zpi.backend.user.User;
import com.zpi.backend.user.UserService;
import com.zpi.backend.user.exception.UserDoesNotExistException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Component
@Service
public class RecommendationService {

    @Value(value = "${APRIORI_MIN_SUPPORT}")
    private int APRIORI_MIN_SUPPORT;
    @Value(value = "${APRIORI_MIN_CONFIDENCE}")
    private double APRIORI_MIN_CONFIDENCE;
    private static final Logger logger = LoggerFactory.getLogger(RecommendationService.class);

    private final RecommendationRepository recommendationRepository;
    private final UserService userService;

    public RecommendationService(RecommendationRepository recommendationRepository, UserService userService) {
        this.recommendationRepository = recommendationRepository;
        this.userService = userService;
    }

    public ResultsDTO<GameDTO> getRecommendedGames(Authentication authentication, int page, int size) throws UserDoesNotExistException {
        Pageable pageable = PageRequest.of(page, size);
        User loggedInUser = userService.getUser(authentication);

        Set<Long> playedGamesIds = new HashSet<>(recommendationRepository
                .getAllGamesInUserReservations(loggedInUser.getId()));
        List<AssociationRule> associationRules = getAllAssociationRules();

        if (playedGamesIds.isEmpty() || associationRules.isEmpty())
            return new ResultsDTO<>(List.of(), new Pagination(0,0));

        Set<Long> recommendedGameIds = associationRules.stream()
                .filter(rule -> ruleContainsPlayedGames(rule, playedGamesIds))
                .sorted((rule1, rule2) -> Double.compare(rule2.getConfidence(), rule1.getConfidence()))
                .flatMap(ar -> ar.getConsequent().stream())
                .collect(Collectors.toSet());

        // Removing games that user already played
        recommendedGameIds.removeAll(playedGamesIds);

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

    @Scheduled(cron = "0 0 * * 1", zone = "Europe/Warsaw")
    public void runAprioriAlgorithm(){
        logger.info("Run Apriori Algorithm");
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
