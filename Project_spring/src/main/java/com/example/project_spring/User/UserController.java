package com.example.project_spring.User;

import lombok.*;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService us;

    @PostMapping("/sign/manager")
    public void SignUpManager(@RequestBody SignUpRequestDTO dto) {
        us.saveManager(dto);
    }

    @PostMapping("/sign/admin")
    public void SignUpAdmin(@RequestBody SignUpRequestDTO dto) {
        us.saveAdmin(dto);
    }

    @PostMapping("/login")
    public LoginResponseDTO login(@RequestBody LoginRequestDTO dto) {
        return us.login(dto);
    }





}
