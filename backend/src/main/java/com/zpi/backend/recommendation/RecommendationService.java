package com.zpi.backend.recommendation;

import com.zpi.backend.reservations.DTO.ReservationDTO;
import com.zpi.backend.user.User;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

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
}
