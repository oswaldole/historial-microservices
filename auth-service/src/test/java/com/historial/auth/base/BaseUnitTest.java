package com.historial.auth.base;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;

/**
 * Base class for unit tests.
 * Provides Mockito support without loading Spring context.
 */
@ExtendWith(MockitoExtension.class)
public abstract class BaseUnitTest {

    @BeforeEach
    public void baseSetUp() {
        setUp();
    }

    @AfterEach
    public void baseTearDown() {
        tearDown();
    }

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
