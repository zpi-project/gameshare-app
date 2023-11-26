package com.zpi.backend.game_instance.specification;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GameInstanceOpinionSearch {
    private Long gameId;
    private double latitude;
    private double longitude;
}
