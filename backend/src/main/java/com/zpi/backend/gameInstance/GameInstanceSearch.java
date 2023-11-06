package com.zpi.backend.gameInstance;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class GameInstanceSearch {
    private String searchName;
    private Long categoryId;
    private Integer age;
    private Integer playersNumber;
}
