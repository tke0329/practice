package com.example.project_spring.User;

import lombok.RequiredArgsConstructor;

import com.example.project_spring.Security.CustomUserDetails;
import com.example.project_spring.Security.JwtTokenProvider;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.*;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider jwtTokenProvider;

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(@RequestBody LoginRequestDTO dto, HttpServletResponse response) {
        Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(dto.username(), dto.password())
        );

            CustomUserDetails user = (CustomUserDetails) authentication.getPrincipal();

            String accessToken = jwtTokenProvider.createAccessToken(user.getUsername(), user.getUser().getRole());
            String refreshToken = jwtTokenProvider.createRefreshToken(user.getUsername());

            response.addHeader("Set-Cookie", buildAccessCookie(accessToken).toString());
            response.addHeader("Set-Cookie", buildRefreshCookie(refreshToken).toString());

            return ResponseEntity.ok(new LoginResponseDTO(user.getUsername(), user.getUser().getRole()));

    }

    @PostMapping("/refresh")
    public ResponseEntity<Void> refresh(HttpServletResponse response, @CookieValue(name = "refreshToken", required = false) String refreshToken) {
        if(refreshToken == null || !jwtTokenProvider.validateToken(refreshToken)) {
            return ResponseEntity.status(401).build();
        }

        String username = jwtTokenProvider.getUsername(refreshToken);
        String newAccessToken = jwtTokenProvider.createAccessToken(username, null);

        response.addHeader("Set-Cookie", buildAccessCookie(newAccessToken).toString());
        return ResponseEntity.ok().build();
    }

    @PostMapping("/logout")
    public ResponseEntity<Void> logout(HttpServletResponse response) {
        response.addHeader("Set-Cookie", clearCookie("accessToken").toString());
        response.addHeader("Set-Cookie", clearCookie("refreshToken").toString());
        return ResponseEntity.ok().build();
    }

    private ResponseCookie buildAccessCookie(String token) {
        return ResponseCookie.from("accessToken", token)
                .httpOnly(true)
                .secure(false)
                .path("/")
                .sameSite("Lax")
                .maxAge(60 * 15)
                .build();
    }

    private ResponseCookie buildRefreshCookie(String token) {
        return ResponseCookie.from("refreshToken", token)
                .httpOnly(true)
                .secure(false)
                .path("/")
                .sameSite("Lax")
                .maxAge(60 * 60 * 24 * 14)
                .build();
    }

    private ResponseCookie clearCookie(String name) {
        return ResponseCookie.from(name, "")
                .httpOnly(true)
                .secure(false)
                .path("/")
                .sameSite("Lax")
                .maxAge(0)
                .build();
    }

}
