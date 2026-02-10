package com.example.project_spring.Menu;

import com.example.project_spring.Category.*;
import com.example.project_spring.User.*;
import lombok.*;
import jakarta.persistence.*;

@Entity
@Getter @Setter
public class MenuEntity {

    @Id
    @GeneratedValue
    private Long id;
    private String menuName;
    private int price;
    private int stock;
    private boolean deleted = false;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private CategoryEntity category;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private UserEntity writer;

    public MenuEntity() {}

    public MenuEntity(String menuName, int price, int stock, CategoryEntity category, UserEntity writer) {
        this.menuName = menuName;
        this.price = price;
        this.stock = stock;
        this.category = category;
        this.writer = writer;
    }

    public void update(String menuName, int price, int stock) {
        if(price < 0) throw new IllegalArgumentException("가격은 0원 이상이어야 합니다");
        this.menuName = menuName;
        this.price = price;
        this.stock = stock;
    }

    public void removeStock(int quantity) {
        int restStock = this.stock - quantity;
        if(restStock < 0) {
            throw new RuntimeException("재고가 부족합니다.");
        }
        this.stock = restStock;
    }

    public void setCategory(CategoryEntity category) {
        this.category = category;
        category.getMenus().add(this);
    }




}
