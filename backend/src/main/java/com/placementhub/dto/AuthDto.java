package com.placementhub.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

public class AuthDto {

    @Data
    public static class RegisterRequest {
        @NotBlank private String name;
        @Email @NotBlank private String email;
        @NotBlank private String password;
    }

    @Data
    public static class LoginRequest {
        @Email @NotBlank private String email;
        @NotBlank private String password;
    }

    @Data
    public static class AuthResponse {
        private String token;
        private String role;
        private String name;
        private String email;

        public AuthResponse(String token, String role, String name, String email) {
            this.token = token;
            this.role = role;
            this.name = name;
            this.email = email;
        }
    }
}
