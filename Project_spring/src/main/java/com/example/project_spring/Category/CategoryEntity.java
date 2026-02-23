package com.example.project_spring.Category;

import com.example.project_spring.Menu.*;

import lombok.*;
import jakarta.persistence.*;
import java.util.*;

@Entity
@Getter @Setter
@NoArgsConstructor
public class CategoryEntity {
    @GeneratedValue
    @Id
    private Long id;

    @Enumerated(EnumType.STRING)
    private CategoryName categoryName;

    @OneToMany(mappedBy= "category")
    private List<MenuEntity> menus = new ArrayList<>();



    public CategoryEntity(CategoryName categoryName) {
        this.categoryName = categoryName;
    }
}
