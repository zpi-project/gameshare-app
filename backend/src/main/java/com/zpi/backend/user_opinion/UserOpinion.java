package com.zpi.backend.user_opinion;

import com.google.api.client.util.DateTime;
import com.zpi.backend.user.User;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "user_opinions")
@Getter
@Setter
@ToString
@RequiredArgsConstructor
public class UserOpinion {
    @Id
    @GeneratedValue(strategy = jakarta.persistence.GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private User ratedUser;

    @ManyToOne
    private User ratingUser;

    @Column(name = "stars")
    private int stars;

    @Column(name = "description")
    private String description;

    @Column(name="timestamp")
    private DateTime timestamp;

    @Column(name="isRatingUserOwner")
    private boolean isRatingUserOwner;

    public UserOpinion(User user, User ratedUser, NewUserOpinionDTO newUserOpinionDTO) {
        this.ratingUser = user;
        this.ratedUser = ratedUser;
        this.stars = newUserOpinionDTO.getStars();
        this.description = newUserOpinionDTO.getDescription();
        this.timestamp = newUserOpinionDTO.getTimestamp();
        //this.isRatingUserOwner =; TODO add later when we have game instances
    }

    public UserOpinion update(UpdateUserOpinionDTO updateUserOpinionDTO) {
        this.stars = updateUserOpinionDTO.getStars();
        this.description = updateUserOpinionDTO.getDescription();
        this.timestamp = updateUserOpinionDTO.getTimestamp();
        return this;
    }



}
