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

    @PostMapping("/menu")
    public ResponseEntity<String> addMenu(@RequestBody MenuRequestDTO dto) {

        ms.saveMenu(dto);

        return ResponseEntity.ok("메뉴 저장 완료!");
    }

}
