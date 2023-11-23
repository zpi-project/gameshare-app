package com.zpi.backend.recommendation;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@AllArgsConstructor
public class RecommendationService {
    private final RecommendationRepository recommendationRepository;

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
        return recommendationRepository.findAll();
    }

    public void runAprioriAlgorithm(){
        AprioriAlgorithm aprioriAlgorithm =
                new AprioriAlgorithm(2, 0.5, prepareTransactions());
        aprioriAlgorithm.run();
    }
}
