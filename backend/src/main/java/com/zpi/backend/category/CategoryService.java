package com.zpi.backend.category;

import com.zpi.backend.exceptionHandlers.BadRequestException;
import com.zpi.backend.validators.ValueChecker;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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

    public List<Category> getCategoriesByIDs(List<Long> categoriesIds) throws CategoryDoesNotExistException {
        List<Category> categories = new ArrayList<>();
        for (long categoryId:categoriesIds) {
            Optional<Category> categoryOptional = categoryRepository.findById(categoryId);
            if (categoryOptional.isPresent())
                categories.add(categoryOptional.get());
            else
                throw new CategoryDoesNotExistException("Category (id="+categoryId+") does not exist.");
        }
        return categories;
    }
}
