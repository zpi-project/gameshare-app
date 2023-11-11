package com.zpi.backend.category;

import com.zpi.backend.dto.Amount;
import com.zpi.backend.exception_handlers.BadRequestException;
import io.swagger.v3.oas.annotations.Operation;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@CrossOrigin("${FRONTEND_HOST}:${FRONTEND_PORT}")
@RequestMapping("/categories")
@RestController
public class CategoryController {
    CategoryService categoryService;

    @Operation(
            summary = "Add a new category",
            description = "Add a new Category to database."
    )
    @PostMapping
    public ResponseEntity<Category> addCategory(@RequestBody NewCategoryDTO newCategory) throws CategoryAlreadyExistsException, BadRequestException {
        System.out.println("... called addCategory");
        Category category = categoryService.addCategory(newCategory);
        return ResponseEntity.status(HttpStatus.OK)
                .body(category);
    }

    @Operation(
            summary = "Get categories",
            description = "Returns all Categories from the database."
    )
    @GetMapping
    public ResponseEntity<List<Category>> getCategories(){
        System.out.println("... called getCategories");
        List<Category> categories = categoryService.getCategories();
        return ResponseEntity.status(HttpStatus.OK)
                .body(categories);
    }

    @Operation(
            summary = "Get category by id",
            description = "Returns a category identified by its id from the database."
    )
    @RequestMapping(method = RequestMethod.GET, value = "/{id}")
    public ResponseEntity<Category> getCategory(@PathVariable long id) throws CategoryDoesNotExistException {
        System.out.println("... called getCategory");
        Category category = categoryService.getCategory(id);
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
