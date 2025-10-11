package com.historial.auth.security;

import com.historial.auth.base.BaseUnitTest;
import io.jsonwebtoken.ExpiredJwtException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.test.util.ReflectionTestUtils;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

import static org.assertj.core.api.Assertions.*;

/**
 * Unit tests for JwtService
 */
@DisplayName("JWT Service Tests")
class JwtServiceTest extends BaseUnitTest {

    private JwtService jwtService;

    private static final String TEST_SECRET = "404E635266556A586E3272357538782F413F4428472B4B6250645367566B5970";
    private static final long TEST_EXPIRATION = 86400000; // 24 hours

    @Override
    protected void setUp() {
        jwtService = new JwtService();
        ReflectionTestUtils.setField(jwtService, "secretKey", TEST_SECRET);
        ReflectionTestUtils.setField(jwtService, "jwtExpiration", TEST_EXPIRATION);
    }

    @Test
    @DisplayName("Should generate valid JWT token")
    void shouldGenerateValidToken() {
        // Given
        UserDetails userDetails = createUserDetails("testuser");

        // When
        String token = jwtService.generateToken(userDetails);

        // Then
        assertThat(token).isNotNull();
        assertThat(token).isNotEmpty();
        assertThat(token.split("\\.")).hasSize(3); // JWT has 3 parts
    }

    @Test
    @DisplayName("Should extract username from token")
    void shouldExtractUsername() {
        // Given
        UserDetails userDetails = createUserDetails("testuser");
        String token = jwtService.generateToken(userDetails);

        // When
        String extractedUsername = jwtService.extractUsername(token);

        // Then
        assertThat(extractedUsername).isEqualTo("testuser");
    }

    @Test
    @DisplayName("Should validate token for correct user")
    void shouldValidateTokenForCorrectUser() {
        // Given
        UserDetails userDetails = createUserDetails("testuser");
        String token = jwtService.generateToken(userDetails);

        // When
        boolean isValid = jwtService.isTokenValid(token, userDetails);

        // Then
        assertThat(isValid).isTrue();
    }

    @Test
    @DisplayName("Should not validate token for different user")
    void shouldNotValidateTokenForDifferentUser() {
        // Given
        UserDetails userDetails1 = createUserDetails("user1");
        UserDetails userDetails2 = createUserDetails("user2");
        String token = jwtService.generateToken(userDetails1);

        // When
        boolean isValid = jwtService.isTokenValid(token, userDetails2);

        // Then
        assertThat(isValid).isFalse();
    }

    @Test
    @DisplayName("Should detect expired token")
    void shouldDetectExpiredToken() {
        // Given
        JwtService shortLivedJwtService = new JwtService();
        ReflectionTestUtils.setField(shortLivedJwtService, "secretKey", TEST_SECRET);
        ReflectionTestUtils.setField(shortLivedJwtService, "jwtExpiration", 1L); // 1ms expiration

        UserDetails userDetails = createUserDetails("testuser");
        String token = shortLivedJwtService.generateToken(userDetails);

        // Wait for token to expire
        try {
            Thread.sleep(10);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }

        // When & Then
        assertThatThrownBy(() -> jwtService.extractUsername(token))
                .isInstanceOf(ExpiredJwtException.class);
    }

    @Test
    @DisplayName("Should generate token with extra claims")
    void shouldGenerateTokenWithExtraClaims() {
        // Given
        UserDetails userDetails = createUserDetails("testuser");
        Map<String, Object> extraClaims = new HashMap<>();
        extraClaims.put("role", "ADMIN");
        extraClaims.put("email", "test@example.com");

        // When
        String token = jwtService.generateToken(extraClaims, userDetails);

        // Then
        assertThat(token).isNotNull();
        String username = jwtService.extractUsername(token);
        assertThat(username).isEqualTo("testuser");
    }

    @Test
    @DisplayName("Should extract custom claim from token")
    void shouldExtractCustomClaim() {
        // Given
        UserDetails userDetails = createUserDetails("testuser");
        Map<String, Object> extraClaims = new HashMap<>();
        extraClaims.put("role", "ADMIN");
        String token = jwtService.generateToken(extraClaims, userDetails);

        // When
        String role = jwtService.extractClaim(token, claims -> claims.get("role", String.class));

        // Then
        assertThat(role).isEqualTo("ADMIN");
    }

    private UserDetails createUserDetails(String username) {
        return org.springframework.security.core.userdetails.User.builder()
                .username(username)
                .password("password")
                .authorities(Collections.emptyList())
                .build();
    }
}
