package com.zpi.backend.category.DTO;

import com.zpi.backend.category.Category;
import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class PlCategoryDTO extends CategoryDTO{
    private String name_pl;

    public PlCategoryDTO(Category category){
        super(category.getId());
        this.name_pl = category.getName_pl();
    }
}
