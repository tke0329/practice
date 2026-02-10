package com.example.project_spring.User;

import lombok.*;

import java.util.*;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository ur;
    private final PasswordEncoder encoder;

    @Transactional
    public void saveManager(SignUpRequestDTO dto) {

        ur.findByUsername(dto.username()).ifPresent((u) ->
        {
            throw new RuntimeException("이미 존재하는 아이디입니다.");
        });

//        Optional<UserEntity> user = ur.findByUsername(dto.username());
//
//        if(user.isPresent()) {
//            throw new RuntimeException("이미 존재하는 아이디입니다.");
//        }

        String encodedPassword = encoder.encode(dto.password());

        UserEntity entity = UserEntity.createManager(dto.username(), encodedPassword);

        ur.save(entity);

    }

    @Transactional
    public void saveAdmin(SignUpRequestDTO dto) {

        ur.findByUsername(dto.username()).ifPresent((u) -> {
            throw new RuntimeException("이미 존재하는 아이디입니다.");
        });

        String encodedPassword = encoder.encode(dto.password());

        UserEntity entity = UserEntity.createAdmin(dto.username(), encodedPassword);

        ur.save(entity);

    }

    public LoginResponseDTO login(LoginRequestDTO dto) {
        UserEntity user = ur.findByUsername(dto.username())
                .orElseThrow(() -> new RuntimeException("해당 아이디를 찾을수 없습니다"));

        if(!encoder.matches(dto.password(), user.getPassword())) {
            throw new RuntimeException("비밀번호가 일치하지 않습니다.");
        }

        return new LoginResponseDTO(user.getUsername(), user.getRole());
    }


}
