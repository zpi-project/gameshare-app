package com.zpi.backend.category.DTO;

import com.zpi.backend.category.Category;
import com.zpi.backend.exception_handlers.BadRequestException;
import com.zpi.backend.validators.ValueChecker;
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

    public boolean validate() throws BadRequestException {
        if (ValueChecker.isStringEmpty(name))
            throw new BadRequestException("Name cannot be empty");
        return true;
    }
}
