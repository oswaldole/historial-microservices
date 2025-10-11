package com.historial.auth.dto;

import com.historial.auth.model.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserResponse {

    private Long id;
    private String numFicha;
    private String nombre;
    private String apellido;
    private User.Role role;
    private Boolean isActive;
    private LocalDateTime createdAt;

    public static UserResponse fromUser(User user) {
        return UserResponse.builder()
                .id(user.getId())
                .numFicha(user.getNumFicha())
                .nombre(user.getNombre())
                .apellido(user.getApellido())
                .role(user.getRole())
                .isActive(user.getIsActive())
                .createdAt(user.getCreatedAt())
                .build();
    }
}
