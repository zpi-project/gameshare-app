package com.zpi.backend.category.DTO;

import lombok.Data;

@Data
public class CategoryDTO {
    private final Long id;

    public CategoryDTO() {
        this.id = null;
    }
    public CategoryDTO(Long id) {
        this.id = id;
    }
}
