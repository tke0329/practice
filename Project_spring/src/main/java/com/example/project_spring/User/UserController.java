package com.example.project_spring.User;

import lombok.*;
import com.example.project_spring.Common.*;
import com.example.project_spring.Security.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.annotation.*;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService us;

//  Session 방식에서 json 이 아닌 redirect 방식으로
    @GetMapping("/me")
    public LoginResponseDTO me(@AuthenticationPrincipal CustomUserDetails user) {

        if(user == null) {
            throw new UnAuthorizedException("로그인이 필요합니다.");
        }

        return new LoginResponseDTO(user.getUsername(), user.getUser().getRole());
    }

    @PostMapping("/sign/manager")
    public void SignUpManager(@RequestBody SignUpRequestDTO dto) {
        us.saveManager(dto);
    }


    @PostMapping("/sign/admin")
    public void SignUpAdmin(@RequestBody SignUpRequestDTO dto) {
        us.saveAdmin(dto);
    }

//    @PostMapping("/login")
//    public LoginResponseDTO login(@RequestBody LoginRequestDTO dto) {
//        return us.login(dto);
//    }





}
