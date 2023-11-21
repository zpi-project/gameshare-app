package com.zpi.backend.game_instance;

import com.zpi.backend.category.Category;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class GameInstanceSearch {
    private String searchName;
    private Category category;
    private Integer age;
    private Integer playersNumber;
    private Integer maxPricePerDay;
    private String userUUID;
    private Double latitude;
    private Double longitude;
    private String loggedUserUUID;
}
