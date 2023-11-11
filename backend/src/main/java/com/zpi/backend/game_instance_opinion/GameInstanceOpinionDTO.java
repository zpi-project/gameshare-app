package com.zpi.backend.game_instance_opinion;

import com.zpi.backend.user.UserDTO;
import com.zpi.backend.user.UserGameInstanceDTO;
import com.zpi.backend.user.UserGuestDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GameInstanceOpinionDTO {
    private long id;
    private UserGuestDTO ratingUser;
    private String description;
    private int stars;
    private Date timestamp;

    public GameInstanceOpinionDTO(GameInstanceOpinion gameInstanceOpinion, boolean isGuest){
        this.id = gameInstanceOpinion.getId();
        this.description = gameInstanceOpinion.getDescription();
        this.stars = gameInstanceOpinion.getStars();
        this.timestamp = gameInstanceOpinion.getTimestamp();
        if (isGuest)
            this.ratingUser = new UserGuestDTO(gameInstanceOpinion.getRatingUser());
        else
            this.ratingUser = new UserDTO(gameInstanceOpinion.getRatingUser());
    }
}
