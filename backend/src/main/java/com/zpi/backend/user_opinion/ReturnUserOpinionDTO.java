package com.zpi.backend.user_opinion;
import com.zpi.backend.user.User;
import lombok.Data;
import java.util.Date;

@Data
public class ReturnUserOpinionDTO {
    private Date date;
    private String stars;
    private String description;
    private User ratingUser;

    //TODO: add isRatingUserOwner when we have game instances and reservations

    public ReturnUserOpinionDTO(UserOpinion userOpinion) {
        this.date = userOpinion.getTimestamp();
        this.stars = String.valueOf(userOpinion.getStars());
        this.description = userOpinion.getDescription();
        this.ratingUser = userOpinion.getRatingUser();
    }
}