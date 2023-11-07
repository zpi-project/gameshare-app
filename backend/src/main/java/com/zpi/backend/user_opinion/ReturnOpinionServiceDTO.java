package com.zpi.backend.user_opinion;
import lombok.Data;
import java.util.Date;

@Data
public class ReturnOpinionServiceDTO {
    private Date date;
    private String stars;
    private String description;

    //TODO: add isRatingUserOwner when we have game instances and reservations

    public ReturnOpinionServiceDTO(UserOpinion userOpinion) {
        this.date = userOpinion.getDate();
        this.stars = String.valueOf(userOpinion.getStars());
        this.description = userOpinion.getDescription();
    }
}