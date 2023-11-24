package com.zpi.backend.recommendation.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserGamePair {
    private long userId;
    private long gameId;

    public UserGamePair(Object[] input) {
        this.userId = (long) input[0];
        this.gameId = (long) input[1];
    }
}
