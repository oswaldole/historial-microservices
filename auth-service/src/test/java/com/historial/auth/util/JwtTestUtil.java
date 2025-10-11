package com.historial.auth.util;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

import javax.crypto.SecretKey;
import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

/**
 * Utility class for JWT testing.
 * Provides methods for creating and validating test JWT tokens.
 */
public class JwtTestUtil {

    private static final String TEST_SECRET = "404E635266556A586E3272357538782F413F4428472B4B6250645367566B5970";
    private static final long TEST_EXPIRATION = 86400000; // 24 hours

    private JwtTestUtil() {
        // Utility class
    }

    /**
     * Generates a test JWT token for a given username
     */
    public static String generateToken(String username) {
        return generateToken(username, new HashMap<>());
    }

    /**
     * Generates a test JWT token with custom claims
     */
    public static String generateToken(String username, Map<String, Object> extraClaims) {
        return Jwts.builder()
                .claims(extraClaims)
                .subject(username)
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + TEST_EXPIRATION))
                .signWith(getSigningKey())
                .compact();
    }

    /**
     * Generates an expired JWT token for testing
     */
    public static String generateExpiredToken(String username) {
        return Jwts.builder()
                .subject(username)
                .issuedAt(new Date(System.currentTimeMillis() - 100000))
                .expiration(new Date(System.currentTimeMillis() - 10000))
                .signWith(getSigningKey())
                .compact();
    }

    /**
     * Generates a token that will expire in the specified milliseconds
     */
    public static String generateTokenWithExpiration(String username, long expirationMs) {
        return Jwts.builder()
                .subject(username)
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + expirationMs))
                .signWith(getSigningKey())
                .compact();
    }

    /**
     * Extracts username from token
     */
    public static String extractUsername(String token) {
        return Jwts.parser()
                .verifyWith(getSigningKey())
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .getSubject();
    }

    /**
     * Checks if token is expired
     */
    public static boolean isTokenExpired(String token) {
        Date expiration = Jwts.parser()
                .verifyWith(getSigningKey())
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .getExpiration();
        return expiration.before(new Date());
    }

    private static SecretKey getSigningKey() {
        byte[] keyBytes = Base64.getDecoder().decode(TEST_SECRET);
        return Keys.hmacShaKeyFor(keyBytes);
    }
}
