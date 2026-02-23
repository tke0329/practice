package com.example.project_spring.Menu;

import com.example.project_spring.Category.*;
import com.example.project_spring.Security.*;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.*;

import lombok.*;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class MenuController {

    private final MenuService ms;
    private final MenuRepository mr;

    @GetMapping("/menu")
    public ResponseEntity<List<MenuResponseDTO>> getMenu(@RequestParam(required = false) CategoryName category) {

        if(category == null) {
            return ResponseEntity.ok(ms.getAllMenus());
        }

        return ResponseEntity.ok(ms.getMenusByCategory(category));

    }

    @GetMapping("/menu/{id}")
    public ResponseEntity<MenuResponseDTO> getMenuById(@PathVariable Long id) {
        MenuResponseDTO dto = ms.getMenuById(id);
        return ResponseEntity.ok(dto);
    }



    @PostMapping("/menu")
    public ResponseEntity<String> addMenu(@RequestBody MenuRequestDTO dto, @AuthenticationPrincipal CustomUserDetails userDetails) {

        Long userId =  userDetails.getUser().getId();
        ms.saveMenu(dto, userId);
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
