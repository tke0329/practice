package com.example.project_spring.Order;

import com.example.project_spring.Menu.*;

public record OrderItemResponseDTO (
    String menuName,
    int orderPrice,
    int count
){
}
