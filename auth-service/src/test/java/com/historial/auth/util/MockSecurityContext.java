package com.historial.auth.util;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collections;

/**
 * Utility class for mocking Spring Security context in tests.
 */
public class MockSecurityContext {

    private MockSecurityContext() {
        // Utility class
    }

    /**
     * Sets up a mock security context with the given username and role
     */
    public static void mockSecurityContext(String username, String role) {
        UserDetails userDetails = User.builder()
                .username(username)
                .password("password")
                .authorities(Collections.singletonList(new SimpleGrantedAuthority("ROLE_" + role)))
                .build();

        UsernamePasswordAuthenticationToken authentication =
                new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());

        SecurityContext securityContext = SecurityContextHolder.createEmptyContext();
        securityContext.setAuthentication(authentication);
        SecurityContextHolder.setContext(securityContext);
    }

    /**
     * Sets up a mock security context with USER role
     */
    public static void mockUserContext(String username) {
        mockSecurityContext(username, "USER");
    }

    /**
     * Sets up a mock security context with ADMIN role
     */
    public static void mockAdminContext(String username) {
        mockSecurityContext(username, "ADMIN");
    }

    /**
     * Clears the security context
     */
    public static void clearSecurityContext() {
        SecurityContextHolder.clearContext();
    }
}
