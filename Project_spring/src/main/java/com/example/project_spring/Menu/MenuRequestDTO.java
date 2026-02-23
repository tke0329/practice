package com.example.project_spring.Menu;

import com.example.project_spring.Category.*;

public record MenuRequestDTO(
        Long id,
        String menuName,
        int price,
        int stock,
        CategoryName category
) {
}
