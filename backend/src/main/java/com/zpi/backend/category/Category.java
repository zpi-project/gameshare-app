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
    @SequenceGenerator(name="categories_seq", sequenceName = "CATEGORIES_SEQ", allocationSize=1, initialValue=1000)
    @GeneratedValue(generator = "categories_seq")
    private Long category_id;
    @Column(nullable = false, unique = true)
    private String name;
    public Category(String name){
        this.name = name;
    }
    public Category(long category_id){
        this.category_id = category_id;
    }
    public static Category toCategory(long id){
        return new Category(id);
    }
}
