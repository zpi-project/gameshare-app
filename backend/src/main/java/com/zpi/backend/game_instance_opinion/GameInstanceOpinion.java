package com.zpi.backend.game_instance_opinion;

import com.zpi.backend.game_instance.GameInstance;
import com.zpi.backend.game_instance_opinion.Dto.NewGameInstanceOpinionDTO;
import com.zpi.backend.game_instance_opinion.Dto.UpdatedGameInstanceOpinionDTO;
import com.zpi.backend.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class GameInstanceOpinion {
    @Id
    @GeneratedValue(strategy = jakarta.persistence.GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private User ratingUser;

    @ManyToOne
    private GameInstance gameInstance;

    private int stars;

    @Column(length = 511)
    private String description;

    private Date timestamp;

    // TODO Add reservation
//    private Reservation reservation;

    public GameInstanceOpinion(User user, GameInstance gameInstance, NewGameInstanceOpinionDTO newGameInstanceOpinionDTO) {
        this.ratingUser = user;
        this.gameInstance = gameInstance;
        this.stars = newGameInstanceOpinionDTO.getStars();
        this.description = newGameInstanceOpinionDTO.getDescription();
        this.timestamp = new Date(System.currentTimeMillis());
    }

    public void update(UpdatedGameInstanceOpinionDTO updatedGameInstanceOpinionDTO) {
        this.stars = updatedGameInstanceOpinionDTO.getStars();
        this.description = updatedGameInstanceOpinionDTO.getDescription();
        this.timestamp = new Date(System.currentTimeMillis());
    }
}
