package com.zpi.backend.game_instance_image;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.zpi.backend.game_instance.GameInstance;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
public class GameInstanceImage {
    @Id
    @GeneratedValue(strategy = jakarta.persistence.GenerationType.IDENTITY)
    private long id;
    private String imageName;
    private String imageLink;
    @JsonIgnore
    @ManyToOne
    @JoinColumn(name="game_instance_id", nullable=false)
    private GameInstance gameInstance;

    public GameInstanceImage(String name, String image, GameInstance gameInstance) {
        this.imageName = name;
        this.imageLink = image;
        this.gameInstance = gameInstance;
    }
}
