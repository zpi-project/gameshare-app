package com.zpi.backend.game;

import com.zpi.backend.category.Category;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Data
@NoArgsConstructor
@Table(name = "Games")
public class Game {
    @Id
    @GeneratedValue(strategy = jakarta.persistence.GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private Long originalId;

    @Column(nullable = false, unique = true)
    private String name;

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

    private String image;

    private boolean accepted;

    public Game(String name, List<Category> categories, int minPlayers, int maxPlayers, int playingTime, int age, String shortDescription, String image){
        this.name = name;
        this.categories = categories;
        this.minPlayers = minPlayers;
        this.maxPlayers = maxPlayers;
        this.playingTime = playingTime;
        this.age = age;
        this.shortDescription = shortDescription;
        this.image = image;
    }
}
