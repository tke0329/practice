package com.example.project_spring.Menu;

import com.example.project_spring.Category.*;

import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.*;

@Repository
public interface MenuRepository extends JpaRepository <MenuEntity, Long> {
    List<MenuEntity> findAllByDeletedFalse();
    List<MenuEntity> findAllByDeletedFalseAndCategory_CategoryName(CategoryName categoryName);


}
