package com.zpi.backend.category.DTO;

import com.zpi.backend.category.Category;
import com.zpi.backend.languages.LanguageCodes;
import lombok.Data;

@Data
public class CategoryDTO {
    private final Long id;
    private String name;

    public CategoryDTO() {
        this.id = null;
    }
    public CategoryDTO(Long id) {
        this.id = id;
    }

    public CategoryDTO(Category category,String language) {
        this.id = category.getId();
        if (language.equals(LanguageCodes.ENGLISH)) {
            this.name = category.getName();
        }
        else if (language.equals(LanguageCodes.POLISH)) {
            this.name = category.getName_pl();
        }

    }
}
