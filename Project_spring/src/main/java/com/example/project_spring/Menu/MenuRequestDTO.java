package com.example.project_spring.Menu;

public record MenuRequestDTO(
        Long id,
        String menuName,
        int price,
        int stock
) {
}
