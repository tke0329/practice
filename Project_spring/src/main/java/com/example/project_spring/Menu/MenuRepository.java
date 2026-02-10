package com.example.project_spring.Menu;

import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.*;

@Repository
public interface MenuRepository extends JpaRepository <MenuEntity, Long> {
    List<MenuEntity> findAllByDeletedFalse();
}
