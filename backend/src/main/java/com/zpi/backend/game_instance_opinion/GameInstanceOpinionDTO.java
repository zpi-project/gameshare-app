package com.zpi.backend.game_instance_opinion;

import com.zpi.backend.user.UserGameInstanceDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GameInstanceOpinionDTO {
    private long id;
    private UserGameInstanceDTO ratingUser;
    private String description;
    private int stars;
    private Date timestamp;

    public GameInstanceOpinionDTO(GameInstanceOpinion gameInstanceOpinion){
        this.id = gameInstanceOpinion.getId();
        this.description = gameInstanceOpinion.getDescription();
        this.stars = gameInstanceOpinion.getStars();
        this.timestamp = gameInstanceOpinion.getTimestamp();
        this.ratingUser = new UserGameInstanceDTO(gameInstanceOpinion.getRatingUser());
    }
}