package com.zpi.backend.game_instance_image;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LinkDTO {
    private long id;
    private String name;
    private String link;

    public LinkDTO(GameInstanceImage gameInstanceImage) {
        id = gameInstanceImage.getId();
        name= gameInstanceImage.getImageName();
        link = gameInstanceImage.getImageLink();
    }
}
