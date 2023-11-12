package com.zpi.backend.category;

import com.zpi.backend.category.Exception.CategoryAlreadyExistsException;
import com.zpi.backend.category.Exception.CategoryDoesNotExistException;
import com.zpi.backend.exception_handlers.BadRequestException;
import com.zpi.backend.role.RoleService;
import com.zpi.backend.user.Exception.UserDoesNotExistException;
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

    public List<Category> getCategories(){
        return categoryRepository.findAll(Sort.by("name"));
    }

    public Category getCategory(long id) throws CategoryDoesNotExistException {
        Optional<Category> categoryOptional = categoryRepository.findById(id);
        if (categoryOptional.isEmpty()) throw new CategoryDoesNotExistException("Category (id = "+id+") does not exist.");
        else return categoryOptional.get();
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
