package com.zpi.backend.category;

import com.zpi.backend.exceptionHandlers.BadRequestException;
import com.zpi.backend.validators.ValueChecker;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService {
    @Autowired
    CategoryRepository categoryRepository;
    ValueChecker valueChecker = new ValueChecker();

    public Category addCategory(NewCategoryDTO newCategoryDTO) throws CategoryAlreadyExistsException, BadRequestException {
        if (valueChecker.isStringNotCorrect(newCategoryDTO.getName()))
            throw new BadRequestException("Name field is empty or null.");
        if (categoryRepository.existsCategoryByName(newCategoryDTO.getName()))
            throw new CategoryAlreadyExistsException(newCategoryDTO.getName());
        Category newCategory = newCategoryDTO.toCategory();
        categoryRepository.save(newCategory);
        return newCategory;
    }

    public List<Category> getCategories(){
        return categoryRepository.findAll();
    }
}
