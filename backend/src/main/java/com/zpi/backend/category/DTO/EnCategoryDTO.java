package com.zpi.backend.category.DTO;

import com.zpi.backend.category.Category;
import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class EnCategoryDTO extends CategoryDTO{
    private final String name;

    public EnCategoryDTO(Category category){
        super(category.getId());
        this.name = category.getName();
    }
}
