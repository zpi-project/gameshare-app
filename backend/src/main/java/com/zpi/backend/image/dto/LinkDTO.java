package com.zpi.backend.image.dto;

import com.zpi.backend.image.game_instance_image.GameInstanceImage;
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
