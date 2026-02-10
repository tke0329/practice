package com.example.project_spring.Order;

import java.time.*;
import java.util.*;

public record OrderResponseDTO (
    Long id,
    LocalDateTime orderDate,
    OrderStatus status,
    List<OrderItemResponseDTO> orderItems
){}
