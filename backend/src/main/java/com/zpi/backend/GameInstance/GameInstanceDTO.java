package com.zpi.backend.GameInstance;

import lombok.Data;

import java.util.List;

@Data
public class GameInstanceDTO {
    private long gameId;
    private long userId;
    private String description;
    private List<String> images;
}
