package com.zpi.backend.category;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@Table(name = "categories")
public class Category {
    @Id
    @GeneratedValue(strategy = jakarta.persistence.GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false, unique = true)
    private String name;
    public Category(String name){
        this.name = name;
    }
    public Category(long id){
        this.id = id;
    }
    public static Category toCategory(long id){
        return new Category(id);
    }
}
