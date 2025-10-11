package com.historial.auth.controller;

import com.historial.auth.dto.LoginRequest;
import com.historial.auth.dto.LoginResponse;
import com.historial.auth.dto.UserRequest;
import com.historial.auth.dto.UserResponse;
import com.historial.auth.service.AuthService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@Tag(name = "Authentication", description = "Authentication and user management endpoints")
public class AuthController {

    private final AuthService authService;

    @PostMapping("/login")
    @Operation(summary = "Login", description = "Authenticate user and return JWT token")
    public ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginRequest request) {
        LoginResponse response = authService.login(request);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/register")
    @Operation(summary = "Register user", description = "Register a new user")
    public ResponseEntity<UserResponse> register(@Valid @RequestBody UserRequest request) {
        UserResponse response = authService.registerUser(request);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/users")
    @Operation(summary = "Get all users", description = "Retrieve all users")
    public ResponseEntity<List<UserResponse>> getAllUsers() {
        List<UserResponse> users = authService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    @GetMapping("/users/{id}")
    @Operation(summary = "Get user by ID", description = "Retrieve user by ID")
    public ResponseEntity<UserResponse> getUserById(@PathVariable Long id) {
        UserResponse user = authService.getUserById(id);
        return ResponseEntity.ok(user);
    }

    @PutMapping("/users/{id}")
    @Operation(summary = "Update user", description = "Update user information")
    public ResponseEntity<UserResponse> updateUser(
            @PathVariable Long id,
            @Valid @RequestBody UserRequest request
    ) {
        UserResponse user = authService.updateUser(id, request);
        return ResponseEntity.ok(user);
    }

    @DeleteMapping("/users/{id}")
    @Operation(summary = "Delete user", description = "Delete user by ID")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        authService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/validate")
    @Operation(summary = "Validate token", description = "Validate JWT token")
    public ResponseEntity<Map<String, Boolean>> validateToken(@RequestBody Map<String, String> request) {
        String token = request.get("token");
        boolean isValid = authService.validateToken(token);
        return ResponseEntity.ok(Map.of("valid", isValid));
    }
}
