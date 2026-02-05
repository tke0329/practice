package com.example.project_spring.Menu;

import jakarta.transaction.Transactional;
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

    public void deleteMenu(Long id) {
        MenuEntity me = mr.findById(id)
                .orElseThrow(() -> new RuntimeException("해당 메뉴를 찾을 수 없습니다."));
        mr.delete(me);
    }

    @Transactional
    public void updateMenu(MenuRequestDTO dto, Long id) {
        MenuEntity me = mr.findById(id)
                .orElseThrow(() -> new RuntimeException("해당 메뉴를 찾을 수 없습니다."));

        me.update(dto.menuName(), dto.price(), dto.stock());


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
