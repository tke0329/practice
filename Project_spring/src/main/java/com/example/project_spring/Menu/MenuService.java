package com.example.project_spring.Menu;

import lombok.*;

import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class MenuService {

    private final MenuRepository mr;

    public void saveMenu(MenuRequestDTO dto) {
        MenuEntity me = new MenuEntity(
            dto.menuName(),
            dto.price(),
            dto.stock()
        );
        mr.save(me);
    }

    public List<MenuResponseDTO> getAllMenus() {
        return mr.findAll().stream()
                .map((m) -> new MenuResponseDTO(
                        m.getId(),
                        m.getMenuName(),
                        m.getPrice(),
                        m.getStock()))
                .toList();

    }

}
