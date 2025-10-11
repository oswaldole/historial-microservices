# Testing Infrastructure

This document describes the testing infrastructure and guidelines for writing tests in the Auth Service.

## Overview

The test infrastructure is organized into the following components:

### Base Test Classes

All base test classes are located in `com.historial.auth.base` package:

#### 1. **BaseUnitTest**
- For pure unit tests without Spring context
- Uses Mockito for mocking
- Fast execution, no database
- **Usage**: Extend this for service layer and utility class tests

```java
class MyServiceTest extends BaseUnitTest {
    @Mock
    private MyRepository repository;

    @InjectMocks
    private MyService service;

    @Test
    void shouldDoSomething() {
        // test code
    }
}
```

#### 2. **BaseControllerTest**
- For testing REST endpoints with MockMvc
- Full Spring context loaded
- Provides `mockMvc` and `objectMapper`
- **Usage**: Extend this for controller/API tests

```java
class MyControllerTest extends BaseControllerTest {
    @Test
    void shouldReturnOk() throws Exception {
        mockMvc.perform(get("/api/endpoint"))
            .andExpect(status().isOk());
    }
}
```

#### 3. **BaseRepositoryTest**
- For testing JPA repositories
- Uses H2 in-memory database
- Loads only data layer
- **Usage**: Extend this for repository tests

```java
class MyRepositoryTest extends BaseRepositoryTest {
    @Autowired
    private MyRepository repository;

    @Test
    void shouldSaveEntity() {
        // test code
    }
}
```

#### 4. **BaseIntegrationTest**
- For end-to-end integration tests
- Full Spring context with all beans
- Uses H2 database
- Transactional (auto-rollback)
- **Usage**: Extend this for integration tests

```java
class MyIntegrationTest extends BaseIntegrationTest {
    @Autowired
    private MyService service;

    @Test
    void shouldWorkEndToEnd() {
        // test code
    }
}
```

## Test Utilities

### TestDataBuilder
Factory class for creating test data:

```java
// Users
User user = TestDataBuilder.buildUser();
User admin = TestDataBuilder.buildAdminUser();

// DTOs
RegisterRequest registerRequest = TestDataBuilder.buildRegisterRequest();
LoginRequest loginRequest = TestDataBuilder.buildLoginRequest();
```

### JwtTestUtil
Utility for JWT token testing:

```java
// Generate tokens
String token = JwtTestUtil.generateToken("username");
String expiredToken = JwtTestUtil.generateExpiredToken("username");

// Validate tokens
String username = JwtTestUtil.extractUsername(token);
boolean isExpired = JwtTestUtil.isTokenExpired(token);
```

### MockSecurityContext
Utility for mocking Spring Security context:

```java
// Setup security context
MockSecurityContext.mockUserContext("testuser");
MockSecurityContext.mockAdminContext("admin");

// Cleanup
MockSecurityContext.clearSecurityContext();
```

## Test Configuration

### application-test.yml
- H2 in-memory database configuration
- Debug logging enabled
- JWT settings for testing

### cleanup.sql
- Runs after each test to clean database
- Ensures test isolation

## Writing Tests

### 1. Unit Tests (Service Layer)

```java
class UserServiceTest extends BaseUnitTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private UserService userService;

    @Test
    void shouldRegisterUser() {
        // Given
        RegisterRequest request = TestDataBuilder.buildRegisterRequest();
        User user = TestDataBuilder.buildUser();

        when(userRepository.existsByUsername(anyString())).thenReturn(false);
        when(passwordEncoder.encode(anyString())).thenReturn("encoded");
        when(userRepository.save(any(User.class))).thenReturn(user);

        // When
        User result = userService.register(request);

        // Then
        assertThat(result).isNotNull();
        assertThat(result.getUsername()).isEqualTo(user.getUsername());
        verify(userRepository).save(any(User.class));
    }
}
```

### 2. Controller Tests

```java
class AuthControllerTest extends BaseControllerTest {

    @MockBean
    private AuthService authService;

    @Test
    void shouldLoginSuccessfully() throws Exception {
        // Given
        LoginRequest request = TestDataBuilder.buildLoginRequest();
        String token = JwtTestUtil.generateToken("testuser");

        when(authService.login(any())).thenReturn(token);

        // When & Then
        mockMvc.perform(post("/api/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(toJson(request)))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.token").value(token));
    }
}
```

### 3. Repository Tests

```java
class UserRepositoryTest extends BaseRepositoryTest {

    @Autowired
    private UserRepository userRepository;

    @Test
    void shouldFindByUsername() {
        // Given
        User user = TestDataBuilder.buildUser();
        userRepository.save(user);

        // When
        Optional<User> result = userRepository.findByUsername(user.getUsername());

        // Then
        assertThat(result).isPresent();
        assertThat(result.get().getUsername()).isEqualTo(user.getUsername());
    }
}
```

### 4. Integration Tests

```java
@WithMockUser(roles = "USER")
class UserIntegrationTest extends BaseIntegrationTest {

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @Test
    void shouldRegisterAndLogin() {
        // Given
        RegisterRequest registerRequest = TestDataBuilder.buildRegisterRequest();

        // When
        User user = userService.register(registerRequest);

        // Then
        assertThat(user).isNotNull();
        assertThat(userRepository.findByUsername(user.getUsername())).isPresent();
    }
}
```

## Running Tests

### Run all tests:
```bash
mvn test
```

### Run specific test class:
```bash
mvn test -Dtest=UserServiceTest
```

### Run with coverage:
```bash
mvn test jacoco:report
```

## Best Practices

1. **Test Isolation**: Each test should be independent
2. **Naming**: Use descriptive test method names (should...)
3. **AAA Pattern**: Arrange, Act, Assert
4. **Mock Wisely**: Only mock external dependencies
5. **Data Builders**: Use TestDataBuilder for consistent test data
6. **Clean Up**: Tests clean up automatically via @Transactional
7. **Fast Tests**: Keep unit tests fast (<100ms)
8. **Coverage**: Aim for >80% code coverage

## Test Categories

- **Unit Tests**: Test individual components in isolation
- **Integration Tests**: Test components working together
- **Controller Tests**: Test REST API endpoints
- **Repository Tests**: Test database operations
- **Security Tests**: Test authentication and authorization

## Common Patterns

### Testing Exceptions
```java
@Test
void shouldThrowExceptionWhenUserNotFound() {
    when(userRepository.findById(anyLong()))
        .thenReturn(Optional.empty());

    assertThatThrownBy(() -> userService.getUser(1L))
        .isInstanceOf(UserNotFoundException.class)
        .hasMessage("User not found");
}
```

### Testing Security
```java
@Test
@WithMockUser(roles = "ADMIN")
void shouldAllowAdminAccess() throws Exception {
    mockMvc.perform(get("/api/admin/users"))
        .andExpect(status().isOk());
}

@Test
@WithMockUser(roles = "USER")
void shouldDenyUserAccess() throws Exception {
    mockMvc.perform(get("/api/admin/users"))
        .andExpect(status().isForbidden());
}
```

### Testing JWT
```java
@Test
void shouldValidateToken() {
    // Given
    String token = JwtTestUtil.generateToken("testuser");
    UserDetails userDetails = mock(UserDetails.class);
    when(userDetails.getUsername()).thenReturn("testuser");

    // When
    boolean isValid = jwtService.isTokenValid(token, userDetails);

    // Then
    assertThat(isValid).isTrue();
}
```
