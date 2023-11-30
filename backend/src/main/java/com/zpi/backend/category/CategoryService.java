package com.zpi.backend.category;

import com.zpi.backend.category.DTO.CategoryDTO;
import com.zpi.backend.category.DTO.NewCategoryDTO;
import com.zpi.backend.category.exception.CategoryAlreadyExistsException;
import com.zpi.backend.category.exception.CategoryDoesNotExistException;
import com.zpi.backend.exception_handlers.BadRequestException;
import com.zpi.backend.languages.LanguageCodes;
import com.zpi.backend.role.RoleService;
import com.zpi.backend.user.exception.UserDoesNotExistException;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class CategoryService {
    CategoryRepository categoryRepository;
    RoleService roleService;

    public Category addCategory(Authentication authentication, NewCategoryDTO newCategoryDTO) throws CategoryAlreadyExistsException, BadRequestException, UserDoesNotExistException {
        newCategoryDTO.validate();
        roleService.checkIfAdmin(authentication);
        if (categoryRepository.existsCategoryByName(newCategoryDTO.getName()))
            throw new CategoryAlreadyExistsException(newCategoryDTO.getName());
        Category newCategory = newCategoryDTO.toCategory();
        categoryRepository.save(newCategory);
        return newCategory;
    }

    public List<CategoryDTO> getCategories(String language){
        List<Category> categories =  categoryRepository.findAll(Sort.by("name"));
        List<CategoryDTO> categoriesDTO = new ArrayList<>();
        for (Category category:categories) {
            if (language.equals(LanguageCodes.ENGLISH)) {
                categoriesDTO.add(new CategoryDTO(category,language));
            }
            else if (language.equals(LanguageCodes.POLISH)) {
                categoriesDTO.add(new CategoryDTO(category,language));
            }

        }
        return categoriesDTO;
    }

    public CategoryDTO getCategoryDTO(long id, String language) throws CategoryDoesNotExistException, BadRequestException {
        Optional<Category> categoryOptional = categoryRepository.findById(id);
        if (categoryOptional.isEmpty()) throw new CategoryDoesNotExistException("Category (id = "+id+") does not exist.");
        Category category = categoryOptional.get();
        if (language.equals(LanguageCodes.ENGLISH)) {
            return new CategoryDTO(category,language);
        }
        else if (language.equals(LanguageCodes.POLISH)) {
            return new CategoryDTO(category,language);
        }
        else
            throw new BadRequestException("Language "+language+" is not supported.");
    }

    public Category getCategory(long id) throws CategoryDoesNotExistException {
        Optional<Category> categoryOptional = categoryRepository.findById(id);
        if (categoryOptional.isEmpty()) throw new CategoryDoesNotExistException("Category (id = "+id+") does not exist.");
        return categoryOptional.get();
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

    public long getAmount(){
        return categoryRepository.count();
    }
}
