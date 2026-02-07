package com.example.project_spring.Menu;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

import lombok.*;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class MenuController {

    private final MenuService ms;

    @GetMapping("/menu")
    public ResponseEntity<List<MenuResponseDTO>> getMenu() {
        List<MenuResponseDTO> list = ms.getAllMenus();
        return ResponseEntity.ok(list);
    }

    @GetMapping("/menu/{id}")
    public ResponseEntity<MenuResponseDTO> getMenuById(@PathVariable Long id) {
        MenuResponseDTO dto = ms.getMenuById(id);
        return ResponseEntity.ok(dto);
    }



    @PostMapping("/menu")
    public ResponseEntity<String> addMenu(@RequestBody MenuRequestDTO dto) {

        ms.saveMenu(dto);

        return ResponseEntity.ok("메뉴 저장 완료!");
    }

    @PutMapping("/menu/{id}")
    public ResponseEntity<String> update(@RequestBody MenuRequestDTO dto, @PathVariable Long id) {

        ms.updateMenu(dto, id);

        return ResponseEntity.ok("수정 완료!");
    }

    @DeleteMapping("/menu/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {

        ms.deleteMenu(id);

        return ResponseEntity.ok(id + " 번 메뉴 삭제 완료");

    }

}
