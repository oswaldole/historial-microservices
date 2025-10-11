package com.historial.auth.service;

import com.historial.auth.dto.LoginRequest;
import com.historial.auth.dto.LoginResponse;
import com.historial.auth.dto.UserRequest;
import com.historial.auth.dto.UserResponse;
import com.historial.auth.model.User;
import com.historial.auth.repository.UserRepository;
import com.historial.auth.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public LoginResponse login(LoginRequest request) {
        try {
            // Authenticate user
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getNumFicha(),
                            request.getCedula()
                    )
            );

            // Find user
            User user = userRepository.findByNumFicha(request.getNumFicha())
                    .orElseThrow(() -> new RuntimeException("User not found"));

            // Generate JWT token with additional claims
            Map<String, Object> extraClaims = new HashMap<>();
            extraClaims.put("role", user.getRole().name());
            extraClaims.put("nombre", user.getNombre());
            extraClaims.put("apellido", user.getApellido());

            String jwtToken = jwtService.generateToken(extraClaims, user);

            return LoginResponse.builder()
                    .error(false)
                    .token(jwtToken)
                    .tipo(user.getRole().name().toLowerCase())
                    .numFicha(user.getNumFicha())
                    .nombre(user.getNombre())
                    .apellido(user.getApellido())
                    .message("Login successful")
                    .build();

        } catch (AuthenticationException e) {
            return LoginResponse.builder()
                    .error(true)
                    .message("Invalid credentials")
                    .build();
        }
    }

    public UserResponse registerUser(UserRequest request) {
        if (userRepository.existsByNumFicha(request.getNumFicha())) {
            throw new RuntimeException("User already exists with ficha: " + request.getNumFicha());
        }

        User user = User.builder()
                .numFicha(request.getNumFicha())
                .cedula(request.getCedula())
                .nombre(request.getNombre())
                .apellido(request.getApellido())
                .role(request.getRole())
                .isActive(true)
                .build();

        User savedUser = userRepository.save(user);
        return UserResponse.fromUser(savedUser);
    }

    public List<UserResponse> getAllUsers() {
        return userRepository.findAll().stream()
                .map(UserResponse::fromUser)
                .collect(Collectors.toList());
    }

    public UserResponse getUserById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));
        return UserResponse.fromUser(user);
    }

    public UserResponse updateUser(Long id, UserRequest request) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));

        user.setNombre(request.getNombre());
        user.setApellido(request.getApellido());
        user.setRole(request.getRole());

        User updatedUser = userRepository.save(user);
        return UserResponse.fromUser(updatedUser);
    }

    public void deleteUser(Long id) {
        if (!userRepository.existsById(id)) {
            throw new RuntimeException("User not found with id: " + id);
        }
        userRepository.deleteById(id);
    }

    public boolean validateToken(String token) {
        try {
            String username = jwtService.extractUsername(token);
            User user = userRepository.findByNumFicha(username)
                    .orElseThrow(() -> new RuntimeException("User not found"));
            return jwtService.isTokenValid(token, user);
        } catch (Exception e) {
            return false;
        }
    }
}
