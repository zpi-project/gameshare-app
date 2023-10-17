package com.zpi.backend.category;

import com.zpi.backend.exceptionHandlers.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("${FRONTEND_HOST}:${FRONTEND_PORT}")
@RequestMapping("/categories")
@RestController
public class CategoryController {
    @Autowired
    CategoryService categoryService;
    @PostMapping
    public ResponseEntity addCategory(@RequestBody NewCategoryDTO newCategory) throws CategoryAlreadyExistsException, BadRequestException {
        System.out.println("... called addCategory");
        Category category = categoryService.addCategory(newCategory);
        return ResponseEntity.status(HttpStatus.OK)
                .body(category);
    }

    @GetMapping
    public ResponseEntity<List<Category>> getCategories(){
        System.out.println("... called getCategory");
        List<Category> categories = categoryService.getCategories();
        return ResponseEntity.status(HttpStatus.OK)
                .body(categories);
    }
}
