package com.zpi.backend.game_instance;

import com.zpi.backend.game.Game;
import com.zpi.backend.game_instance_image.GameInstanceImage;
import com.zpi.backend.user.User;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Data
@Table(name = "game_instances")
@NoArgsConstructor
public class GameInstance {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(nullable = false,unique = true)
    private String uuid = UUID.randomUUID().toString();

    @ManyToOne
    private Game game;

    @ManyToOne
    private User owner;

    private double pricePerDay;

    @Column(length = 511)
    private String description;

    private boolean isActive;
    // TODO What about status

    @OneToMany(mappedBy = "gameInstance")
    private List<GameInstanceImage> images;

    private double avgRating;

    public GameInstance(NewGameInstanceDTO newGameInstanceDTO, Game game, User owner) {
        this.game = game;
        this.owner = owner;
        this.pricePerDay = newGameInstanceDTO.getPricePerDay();
        this.description = newGameInstanceDTO.getDescription();
        this.isActive = true;
        this.images = new ArrayList<>();
    }
}
