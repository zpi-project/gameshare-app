package com.zpi.backend.test_utils;

import com.zpi.backend.category.Category;
import com.zpi.backend.category.DTO.NewCategoryDTO;

import java.util.ArrayList;
import java.util.List;

public class CategoryTestUtils {
    public static List<Category> createCategories() {
        List<Category> categories = new ArrayList<>();
        categories.add(createCategory("category1",1L));
        categories.add(createCategory("category2",2L));
        categories.add(createCategory("category3",3L));
        return categories;
    }

    public static Category createCategory(String name,Long id) {
        Category category = new Category();
        category.setName(name);
        category.setId(id);
        return category;
    }

}
