package com.example.project_spring.Order;

import lombok.*;
import jakarta.persistence.Entity;
import jakarta.persistence.*;

import java.time.*;
import java.util.*;

@Entity
@Setter
@Getter @NoArgsConstructor
public class OrderEntity {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private Long id;

    private LocalDateTime orderDate;

    @Enumerated(EnumType.STRING)
    private OrderStatus status;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
    private List<OrderItemEntity> orderItems = new ArrayList<>();


    public void addOrderItem(OrderItemEntity item) {
        this.orderItems.add(item);
        item.setOrder(this);
    }




}
