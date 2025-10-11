package com.historial.auth.util;

import com.historial.auth.dto.LoginRequest;
import com.historial.auth.dto.UserRequest;
import com.historial.auth.model.User;

import java.time.LocalDateTime;

/**
 * Utility class for building test data objects.
 * Provides factory methods for creating test entities and DTOs.
 */
public class TestDataBuilder {

    private TestDataBuilder() {
        // Utility class
    }

    // ==================== User Builders ====================

    public static User buildUser() {
        return buildUser("12345", "1234567890", "Test", "User");
    }

    public static User buildUser(String numFicha, String cedula, String nombre, String apellido) {
        return User.builder()
                .numFicha(numFicha)
                .cedula(cedula)
                .nombre(nombre)
                .apellido(apellido)
                .role(User.Role.USUARIO)
                .isActive(true)
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();
    }

    public static User buildAdminUser() {
        return buildAdminUser("ADMIN001", "9876543210", "Admin", "User");
    }

    public static User buildAdminUser(String numFicha, String cedula, String nombre, String apellido) {
        return User.builder()
                .numFicha(numFicha)
                .cedula(cedula)
                .nombre(nombre)
                .apellido(apellido)
                .role(User.Role.ADMIN)
                .isActive(true)
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();
    }

    // ==================== DTO Builders ====================

    public static UserRequest buildUserRequest() {
        return buildUserRequest("12345", "1234567890", "Test", "User", User.Role.USUARIO);
    }

    public static UserRequest buildUserRequest(String numFicha, String cedula, String nombre, String apellido, User.Role role) {
        return UserRequest.builder()
                .numFicha(numFicha)
                .cedula(cedula)
                .nombre(nombre)
                .apellido(apellido)
                .role(role)
                .build();
    }

    public static LoginRequest buildLoginRequest() {
        return buildLoginRequest("12345", "1234567890");
    }

    public static LoginRequest buildLoginRequest(String numFicha, String cedula) {
        return LoginRequest.builder()
                .numFicha(numFicha)
                .cedula(cedula)
                .build();
    }
}
