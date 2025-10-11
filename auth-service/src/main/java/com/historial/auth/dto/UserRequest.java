package com.historial.auth.dto;

import com.historial.auth.model.User;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserRequest {

    @NotBlank(message = "Numero de ficha is required")
    private String numFicha;

    @NotBlank(message = "Cedula is required")
    private String cedula;

    @NotBlank(message = "Nombre is required")
    private String nombre;

    @NotBlank(message = "Apellido is required")
    private String apellido;

    @NotNull(message = "Role is required")
    private User.Role role;
}
