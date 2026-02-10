package com.example.project_spring.User;

import lombok.*;

import jakarta.persistence.*;

@Entity
@Getter @Setter
@NoArgsConstructor
@Table(name = "users")
public class UserEntity {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private Long id;

    @Column(unique = true)
    private String username;

    private String password;

    @Enumerated(EnumType.STRING)
    private Role role;

    public UserEntity(String username, String password, Role role) {
        this.username = username;
        this.password = password;
        this.role = role;
    }

    public static UserEntity createManager(String username, String password) {
        return new UserEntity(username, password, Role.MANAGER);
    }

    public static UserEntity createAdmin(String username, String password) {
        return new UserEntity(username, password, Role.ADMIN);
    }
}
