package com.example.project_spring.Security;

import com.example.project_spring.User.*;

import lombok.*;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.GrantedAuthority;

import java.util.*;

@Getter
public class CustomUserDetails implements UserDetails{

    private final String username;
    private final String password;
    private final Long userId;
    private final Collection<? extends GrantedAuthority> authorities;

    public CustomUserDetails(UserEntity entity) {
        this.username = entity.getUsername();
        this.password = entity.getPassword();
        this.userId = entity.getId();
        this.authorities = List.of(
                new SimpleGrantedAuthority(entity.getRole().name())
        );
    }
}
