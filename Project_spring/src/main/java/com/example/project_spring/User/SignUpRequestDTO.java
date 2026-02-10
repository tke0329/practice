package com.example.project_spring.User;

public record SignUpRequestDTO (
        String username,
        String password,
        Role role
){

}
