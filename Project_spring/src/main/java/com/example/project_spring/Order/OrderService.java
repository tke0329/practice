package com.example.project_spring.Order;

import com.example.project_spring.Menu.*;

import lombok.*;

import org.springframework.stereotype.Service;
import jakarta.transaction.Transactional;
import java.util.*;
import java.time.*;

@Service
@RequiredArgsConstructor
@Transactional
public class OrderService {

    private final OrderRepository or;
    private final MenuRepository mr;


    public OrderResponseDTO addOrder(OrderRequestDTO dto) {
        OrderEntity order = new OrderEntity();

        for(OrderItemRequestDTO item : dto.orderItem()) {
            MenuEntity menu = mr.findById(item.menuId())
                    .orElseThrow(() -> new RuntimeException("해당 메뉴를 찾을 수 없습니다."));

            menu.removeStock(item.count());

            OrderItemEntity orderItem = new OrderItemEntity(
                    menu,
                    order,
                    menu.getPrice(),
                    item.count()
            );

            order.addOrderItem(orderItem);
        }
        order.setOrderDate(LocalDateTime.now());
        OrderEntity saveOrder = or.save(order);

//        List<OrderItemResponseDTO> itemList = new ArrayList<>();
//
//        for(OrderItemEntity list: saveOrder.getOrderItems()) {
//            itemList.add (new OrderItemResponseDTO(
//                    list.getMenu().getMenuName(),
//                    list.getOrderPrice(),
//                    list.getCount()
//            ));
//        }

        List<OrderItemResponseDTO> itemList = saveOrder.getOrderItems().stream()
                .map((item) -> new OrderItemResponseDTO(
                        item.getMenu().getMenuName(),
                        item.getOrderPrice(),
                        item.getCount()
                ))
                .toList();


        return new OrderResponseDTO(saveOrder.getId(), saveOrder.getOrderDate(), saveOrder.getStatus(), itemList);

    }

}
