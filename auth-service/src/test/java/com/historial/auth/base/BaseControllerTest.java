package com.historial.auth.base;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

/**
 * Base class for controller tests.
 * Provides MockMvc and ObjectMapper for testing REST endpoints.
 */
@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
public abstract class BaseControllerTest {

    @Autowired
    protected MockMvc mockMvc;

    @Autowired
    protected ObjectMapper objectMapper;

    /**
     * Converts an object to JSON string
     */
    protected String toJson(Object object) throws Exception {
        return objectMapper.writeValueAsString(object);
    }

    /**
     * Converts JSON string to object
     */
    protected <T> T fromJson(String json, Class<T> clazz) throws Exception {
        return objectMapper.readValue(json, clazz);
    }
}
