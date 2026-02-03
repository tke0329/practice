package com.example.project_spring.Menu;

import lombok.*;
import jakarta.persistence.*;

@Entity
@Getter
@Setter
public class MenuEntity {

    @Id
    @GeneratedValue
    Long id;
    String menuName;
    int price;
    int stock;

    public MenuEntity() {}

    public MenuEntity(String menuName, int price, int stock) {
        this.id = id;
        this.menuName = menuName;
        this.price = price;
        this.stock = stock;
    }


}
