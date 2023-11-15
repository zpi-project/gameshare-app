package com.zpi.backend.game_instance_image;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.zpi.backend.game_instance.GameInstance;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@Table(name = "game_instance_images")
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

    public GameInstanceImage(String name, String image) {
        this.imageName = name;
        this.imageLink = image;
    }

    public GameInstanceImage(String imageLink) {
        this.imageLink = imageLink;
    }
}
