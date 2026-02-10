package com.example.project_spring.Order;

import java.util.*;

public record OrderRequestDTO (
    List<OrderItemRequestDTO> orderItem
){}
