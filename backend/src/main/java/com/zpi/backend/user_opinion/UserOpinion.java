package com.zpi.backend.user_opinion;

import com.zpi.backend.reservations.Reservation;
import com.zpi.backend.user.User;
import com.zpi.backend.user_opinion.Dto.ModifiedUserOpinionDTO;
import com.zpi.backend.user_opinion.Dto.NewUserOpinionDTO;
import jakarta.persistence.*;
import lombok.*;
import java.util.Date;

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

    @Column(name = "description",length = 500)
    private String description;

    @Column(name="timestamp")
    private Date timestamp;

    @Column(name="isRatingUserOwner")
    private boolean isRatingUserOwner;

    @ManyToOne
    private Reservation reservation;

    public UserOpinion(User user, User ratedUser, NewUserOpinionDTO newUserOpinionDTO) {
        this.ratingUser = user;
        this.ratedUser = ratedUser;
        this.stars = newUserOpinionDTO.getStars();
        this.description = newUserOpinionDTO.getDescription();
        this.timestamp = new Date(System.currentTimeMillis());
        //this.isRatingUserOwner =; TODO add later when we have game instances
    }

    public UserOpinion update(ModifiedUserOpinionDTO modifiedUserOpinionDTO) {
        this.stars = modifiedUserOpinionDTO.getStars();
        this.description = modifiedUserOpinionDTO.getDescription();
        this.timestamp = new Date(System.currentTimeMillis());
        return this;
    }
}
