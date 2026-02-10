package com.example.project_spring.Order;

import lombok.*;

import com.example.project_spring.Menu.*;

import jakarta.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class OrderItemEntity {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "menu_id")
    private MenuEntity menu;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id")
    private OrderEntity order;

    private int orderPrice;
    private int count;

    public OrderItemEntity(MenuEntity menu, OrderEntity order, int orderPrice, int count) {
        this.menu = menu;
        this.order = order;
        this.orderPrice = orderPrice;
        this.count = count;
    }
}
