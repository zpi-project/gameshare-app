package com.zpi.backend.category;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class NewCategoryDTO {
    private String name;

    public Category toCategory(){
        return new Category(name);
    }
}
