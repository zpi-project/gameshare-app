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
    private Long id;

    @Column(nullable = false, unique = true)
    private String name;

    private String name_pl;

    public Category(String name){
        this.name = name;
        this.name_pl=null;
    }

    public Category(long id){
        this.id = id;
    }
}
