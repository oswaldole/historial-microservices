package com.historial.auth.base;

import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.transaction.annotation.Transactional;

/**
 * Base class for integration tests.
 * Provides common configuration for tests that require the full Spring context.
 */
@SpringBootTest
@ActiveProfiles("test")
@Transactional
@Sql(scripts = "/cleanup.sql", executionPhase = Sql.ExecutionPhase.AFTER_TEST_METHOD)
public abstract class BaseIntegrationTest {

    /**
     * Override this method in subclasses to perform setup before each test
     */
    protected void setUp() {
        // To be implemented by subclasses if needed
    }

    /**
     * Override this method in subclasses to perform cleanup after each test
     */
    protected void tearDown() {
        // To be implemented by subclasses if needed
    }
}
