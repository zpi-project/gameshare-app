package com.zpi.backend.user_opinion.dto;
import com.zpi.backend.user.dto.UserDTO;
import com.zpi.backend.user.dto.UserGuestDTO;
import com.zpi.backend.user_opinion.UserOpinion;
import lombok.Data;
import java.util.Date;

@Data
public class UserOpinionDTO {
    private Long id;
    private Date timestamp;
    private int stars;
    private String description;
    private UserGuestDTO ratingUser;

    //TODO: add isRatingUserOwner when we have game instances and reservations

    public UserOpinionDTO(UserOpinion userOpinion, boolean isGuest) {
        this.id = userOpinion.getId();
        this.timestamp = userOpinion.getTimestamp();
        this.stars = userOpinion.getStars();
        this.description = userOpinion.getDescription();
        if (isGuest)
            this.ratingUser = new UserGuestDTO(userOpinion.getRatingUser());
        else
            this.ratingUser = new UserDTO(userOpinion.getRatingUser());
    }
}