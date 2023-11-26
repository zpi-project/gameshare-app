package com.zpi.backend.game_instance.specification;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class GameInstanceUserSearch {
    private String searchName;
    private String userUUID;
    private Boolean active;
}
