package com.zpi.backend.user_opinion;
import lombok.Data;
import java.util.Date;

@Data
public class ReturnUserOpinionDTO {
    private Long id;
    private Date date;
    private String stars;
    private String description;
    private UserOpinionDTO ratingUser;

    //TODO: add isRatingUserOwner when we have game instances and reservations

    public ReturnUserOpinionDTO(UserOpinion userOpinion) {
        this.id = userOpinion.getId();
        this.date = userOpinion.getTimestamp();
        this.stars = String.valueOf(userOpinion.getStars());
        this.description = userOpinion.getDescription();
        this.ratingUser = new UserOpinionDTO(userOpinion.getRatingUser());
    }
}