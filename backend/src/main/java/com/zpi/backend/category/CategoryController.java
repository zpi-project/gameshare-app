package com.zpi.backend.category;

import com.zpi.backend.category.DTO.CategoryDTO;
import com.zpi.backend.category.DTO.NewCategoryDTO;
import com.zpi.backend.category.exception.CategoryAlreadyExistsException;
import com.zpi.backend.category.exception.CategoryDoesNotExistException;
import com.zpi.backend.dto.Amount;
import com.zpi.backend.exception_handlers.BadRequestException;
import com.zpi.backend.user.exception.UserDoesNotExistException;
import io.swagger.v3.oas.annotations.Operation;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
//@CrossOrigin("${FRONTEND_HOST}:${FRONTEND_PORT}")
@RequestMapping("/categories")
@RestController
public class CategoryController {
    CategoryService categoryService;

    @Operation(
            summary = "Add a new category",
            description = "Add a new Category to database."
    )
    @PreAuthorize("isAuthenticated()")
    @PostMapping
    public ResponseEntity<Category> addCategory(Authentication authentication ,@RequestBody NewCategoryDTO newCategory) throws CategoryAlreadyExistsException, BadRequestException, UserDoesNotExistException {
        System.out.println("... called addCategory");
        Category category = categoryService.addCategory(authentication,newCategory);
        return ResponseEntity.status(HttpStatus.OK)
                .body(category);
    }

    @Operation(
            summary = "Get categories",
            description = "Returns all Categories from the database."
    )
    @GetMapping
    public ResponseEntity<List<CategoryDTO>> getCategories(@RequestParam(defaultValue = "enUS") String language){
        System.out.println("... called getCategories");
        List<CategoryDTO> categories = categoryService.getCategories(language);
        return ResponseEntity.status(HttpStatus.OK)
                .body(categories);
    }

    @Operation(
            summary = "Get category by id",
            description = "Returns a category identified by its id from the database."
    )
    @RequestMapping(method = RequestMethod.GET, value = "/{id}")
    public ResponseEntity<CategoryDTO> getCategory(@PathVariable long id,@RequestParam(defaultValue = "enUS") String language) throws CategoryDoesNotExistException, BadRequestException {
        System.out.println("... called getCategory");
        CategoryDTO category = categoryService.getCategoryDTO(id,language);
        return ResponseEntity.status(HttpStatus.OK)
                .body(category);
    }

    @Operation(
            summary = "Get amount of categories",
            description = "Returns amount of Categories in database."
    )
    @RequestMapping(method = RequestMethod.GET, value = "/amount")
    public ResponseEntity<Amount> getAmount(){
        System.out.println("... called getAmountOfCategories");
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new Amount(categoryService.getAmount()));
    }
}
