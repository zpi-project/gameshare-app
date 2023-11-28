package com.zpi.backend.game;

import com.zpi.backend.category.Category;
import com.zpi.backend.game_status.GameStatus;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Data
@NoArgsConstructor
@Table(name = "games")
public class Game {
    @Id
    @SequenceGenerator(name="games_seq", sequenceName = "GAMES_SEQ", allocationSize=1, initialValue=1000)
    @GeneratedValue(generator = "games_seq")
    private Long id;

    @Column(unique = true)
    private Long originalId;

    @Column(nullable = false, unique = true)
    private String name;

    @Column(nullable = false)
    private String name_pl;

    @ManyToMany(cascade = {CascadeType.MERGE, CascadeType.PERSIST}, fetch = FetchType.EAGER)
    @JoinTable(
            name = "games_categories",
            joinColumns = { @JoinColumn(name = "game_id") },
            inverseJoinColumns = { @JoinColumn(name = "category_id") },
            uniqueConstraints = @UniqueConstraint(name = "UniqueGameAndCategory", columnNames = {"game_id", "category_id"})
    )
    private List<Category> categories;

    @Column(nullable = false)
    private int minPlayers;

    @Column(nullable = false)
    private int maxPlayers;

    @Column(nullable = false)
    private int playingTime;

    @Column(nullable = false)
    private int age;

    @Column(nullable = false, length = 10000)
    private String shortDescription;

    @Column(nullable = false, length = 10000)
    private String short_description_pl;

    private String image;

    @ManyToOne
    private GameStatus gameStatus;

    public Game(String name, List<Category> categories, int minPlayers, int maxPlayers, int playingTime, int age, String shortDescription){
        this.name = name;
        this.categories = categories;
        this.minPlayers = minPlayers;
        this.maxPlayers = maxPlayers;
        this.playingTime = playingTime;
        this.age = age;
        this.shortDescription = shortDescription;
    }
}
