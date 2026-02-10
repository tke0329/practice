package com.example.project_spring.Menu;

import com.example.project_spring.Category.*;
import com.example.project_spring.User.*;

import lombok.*;

import jakarta.transaction.Transactional;

import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class MenuService {

    private final MenuRepository mr;
    private final CategoryRepository cr;
    private final UserRepository ur;


    public void saveMenu(MenuRequestDTO dto) {
        CategoryEntity category = cr.findByCategoryName(dto.category().name())
                .orElseThrow(() -> new RuntimeException("해당 카테고리를 찾을 수 없습니다"));

        UserEntity user = ur.findByUsername(dto.writerName())
                .orElseThrow(() -> new RuntimeException("해당 아이디를 찾을 수 없습니다."));

        MenuEntity me = new MenuEntity(
                dto.menuName(),
                dto.price(),
                dto.stock(),
                category,
                user
        );
        mr.save(me);
    }

    public MenuResponseDTO getMenuById(Long id) {
        MenuEntity me = mr.findById(id)
                .orElseThrow(() -> new RuntimeException("오류가 존나 터짐 아이디 없음 ㄹ ㅇ"));
        return new MenuResponseDTO(
                me.getId(),
                me.getMenuName(),
                me.getPrice(),
                me.getStock()
        );
    }

    @Transactional
    public void deleteMenu(Long id) {
        MenuEntity me = mr.findById(id)
                .orElseThrow(() -> new RuntimeException("해당 메뉴를 찾을 수 없습니다."));
        me.setDeleted(true);
    }

    @Transactional
    public void updateMenu(MenuRequestDTO dto, Long id) {
        MenuEntity me = mr.findById(id)
                .orElseThrow(() -> new RuntimeException("해당 메뉴를 찾을 수 없습니다."));

        me.update(dto.menuName(), dto.price(), dto.stock());


    }

    public List<MenuResponseDTO> getAllMenus() {
        return mr.findAllByDeletedFalse().stream()
                .map((m) -> new MenuResponseDTO(
                        m.getId(),
                        m.getMenuName(),
                        m.getPrice(),
                        m.getStock()))
                .toList();

    }

}
