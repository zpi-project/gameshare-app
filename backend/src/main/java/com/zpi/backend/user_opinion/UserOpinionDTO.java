package com.zpi.backend.user_opinion;
import com.zpi.backend.user.UserDTO;
import com.zpi.backend.user.UserGuestDTO;
import lombok.Data;
import java.util.Date;

@Data
public class UserOpinionDTO {
    private Long id;
    private Date date;
    private int stars;
    private String description;
    // TODO DO UserDTO / UserGuestDTO
    private UserGuestDTO ratingUser;

    //TODO: add isRatingUserOwner when we have game instances and reservations

    public UserOpinionDTO(UserOpinion userOpinion, boolean isGuest) {
        this.id = userOpinion.getId();
        this.date = userOpinion.getTimestamp();
        this.stars = userOpinion.getStars();
        this.description = userOpinion.getDescription();
        if (isGuest)
            this.ratingUser = new UserGuestDTO(userOpinion.getRatingUser());
        else
            this.ratingUser = new UserDTO(userOpinion.getRatingUser());
    }
}