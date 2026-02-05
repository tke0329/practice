package com.example.project_spring.Menu;

import lombok.*;
import jakarta.persistence.*;

@Entity
@Getter
@Setter
public class MenuEntity {

    @Id
    @GeneratedValue
    private Long id;
    private String menuName;
    private int price;
    private int stock;

    public MenuEntity() {}

    public MenuEntity(String menuName, int price, int stock) {
        this.id = id;
        this.menuName = menuName;
        this.price = price;
        this.stock = stock;
    }

    public void update(String menuName, int price, int stock) {

        if(price < 0) throw new IllegalArgumentException("가격은 0원 이상이어야 합니다");

        this.menuName = menuName;
        this.price = price;
        this.stock = stock;

    }


}
