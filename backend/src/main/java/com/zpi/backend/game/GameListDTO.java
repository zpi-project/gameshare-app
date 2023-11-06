package com.zpi.backend.game;

import com.zpi.backend.category.Category;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GameListDTO {
    private long id;
    private String name;
    private String image;
    private int playersNumber;
    private int playingTime;
    private int age;
    private String shortDescription;
    private List<Category> categories;

}
