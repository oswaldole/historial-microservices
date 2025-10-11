package com.historial.auth.base;

import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.ActiveProfiles;

/**
 * Base class for repository tests.
 * Uses H2 in-memory database for testing.
 */
@DataJpaTest
@ActiveProfiles("test")
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public abstract class BaseRepositoryTest {

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
