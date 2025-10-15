# Testing Infrastructure Setup

This document provides an overview of the testing infrastructure that has been set up across all microservices.

## What's Been Set Up

### 1. Test Dependencies (All Services)

#### Auth Service
- ✅ Spring Boot Test (JUnit 5, Mockito, AssertJ)
- ✅ Spring Security Test
- ✅ H2 In-Memory Database

#### Activity Service
- ✅ Spring Boot Test (JUnit 5, Mockito, AssertJ)
- ✅ H2 In-Memory Database

#### Report Service
- ✅ Spring Boot Test (JUnit 5, Mockito, AssertJ)
- ✅ MockWebServer (for testing REST clients)

### 2. Base Test Classes (Auth Service)

Located in `auth-service/src/test/java/com/historial/auth/base/`:

- **BaseUnitTest** - For pure unit tests with Mockito
- **BaseControllerTest** - For REST API testing with MockMvc
- **BaseRepositoryTest** - For database/JPA tests
- **BaseIntegrationTest** - For full integration tests

### 3. Test Utilities (Auth Service)

Located in `auth-service/src/test/java/com/historial/auth/util/`:

- **TestDataBuilder** - Factory methods for creating test entities and DTOs
- **JwtTestUtil** - JWT token generation and validation for tests
- **MockSecurityContext** - Mock Spring Security context

### 4. Test Configuration

- **application-test.yml** - H2 database configuration for tests
- **cleanup.sql** - Database cleanup script (runs after each test)

### 5. Documentation

- **README.md** - Comprehensive testing guide with examples
- **Example Test** - JwtServiceTest demonstrating all patterns

## Quick Start

### Writing Your First Test

#### 1. Unit Test (Service Layer)

```java
class MyServiceTest extends BaseUnitTest {

    @Mock
    private MyRepository repository;

    @InjectMocks
    private MyService service;

    @Test
    void shouldDoSomething() {
        // Given
        when(repository.findById(1L)).thenReturn(Optional.of(entity));

        // When
        Result result = service.doSomething(1L);

        // Then
        assertThat(result).isNotNull();
    }
}
```

#### 2. Controller Test

```java
class MyControllerTest extends BaseControllerTest {

    @MockBean
    private MyService service;

    @Test
    void shouldReturnOk() throws Exception {
        mockMvc.perform(get("/api/endpoint"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.data").exists());
    }
}
```

#### 3. Repository Test

```java
class MyRepositoryTest extends BaseRepositoryTest {

    @Autowired
    private MyRepository repository;

    @Test
    void shouldFindEntity() {
        Entity entity = repository.save(new Entity());

        Optional<Entity> found = repository.findById(entity.getId());

        assertThat(found).isPresent();
    }
}
```

## Running Tests

### Run all tests:
```bash
mvn test
```

### Run specific service tests:
```bash
cd auth-service
mvn test
```

### Run with coverage:
```bash
mvn test jacoco:report
```

### Run specific test class:
```bash
mvn test -Dtest=JwtServiceTest
```

## Test Structure

```
src/test/
├── java/
│   └── com/historial/{service}/
│       ├── base/              # Base test classes
│       │   ├── BaseUnitTest.java
│       │   ├── BaseControllerTest.java
│       │   ├── BaseRepositoryTest.java
│       │   └── BaseIntegrationTest.java
│       ├── util/              # Test utilities
│       │   ├── TestDataBuilder.java
│       │   ├── JwtTestUtil.java
│       │   └── MockSecurityContext.java
│       ├── controller/        # Controller tests
│       ├── service/           # Service tests
│       ├── repository/        # Repository tests
│       └── integration/       # Integration tests
└── resources/
    ├── application-test.yml   # Test configuration
    └── cleanup.sql           # Cleanup script
```

## Next Steps

### For Each Service, Create Tests For:

#### Auth Service
- [ ] UserService tests
- [ ] AuthController tests
- [ ] UserRepository tests
- [ ] Security configuration tests
- [ ] JWT authentication flow tests

#### Activity Service
- [ ] ActivityService tests
- [ ] ActivityController tests
- [ ] ActivityRepository tests
- [ ] Activity filtering/search tests

#### Report Service
- [ ] ReportService tests
- [ ] ReportController tests
- [ ] External service integration tests (Activity Service)

#### API Gateway
- [ ] Route configuration tests
- [ ] Filter tests (if applicable)
- [ ] CORS configuration tests

## Testing Best Practices

1. **Test Isolation**: Each test should be independent
2. **Naming Convention**: Use descriptive names (shouldDoSomething)
3. **AAA Pattern**: Arrange, Act, Assert
4. **Mock External Dependencies**: Only mock what's outside your control
5. **Use Test Builders**: Leverage TestDataBuilder for consistency
6. **Fast Tests**: Keep unit tests fast (<100ms)
7. **Coverage Goal**: Aim for >80% code coverage
8. **Test Edge Cases**: Don't just test happy paths

## Common Testing Scenarios

### Testing Security Endpoints
```java
@Test
@WithMockUser(roles = "ADMIN")
void shouldAllowAdminAccess() throws Exception {
    mockMvc.perform(get("/api/admin/users"))
        .andExpect(status().isOk());
}
```

### Testing Exception Handling
```java
@Test
void shouldThrowNotFoundException() {
    when(repository.findById(1L)).thenReturn(Optional.empty());

    assertThatThrownBy(() -> service.get(1L))
        .isInstanceOf(NotFoundException.class)
        .hasMessage("Entity not found");
}
```

### Testing JWT Authentication
```java
@Test
void shouldAuthenticateWithValidToken() {
    String token = JwtTestUtil.generateToken("testuser");

    boolean isValid = jwtService.isTokenValid(token, userDetails);

    assertThat(isValid).isTrue();
}
```

## Tools and Libraries

- **JUnit 5**: Test framework
- **Mockito**: Mocking framework
- **AssertJ**: Fluent assertions
- **Spring Boot Test**: Spring testing support
- **H2**: In-memory database
- **MockMvc**: REST API testing
- **Spring Security Test**: Security testing support

## Replicating to Other Services

To apply this infrastructure to other services:

1. Copy the base classes from `auth-service/src/test/java/com/historial/auth/base/`
2. Copy the utilities (adapt as needed)
3. Copy test configuration files
4. Add test dependencies to pom.xml
5. Update package names accordingly

## Coverage Report

After running tests with coverage:

```bash
mvn test jacoco:report
```

View the report at: `target/site/jacoco/index.html`

## Resources

- [JUnit 5 Documentation](https://junit.org/junit5/docs/current/user-guide/)
- [Mockito Documentation](https://javadoc.io/doc/org.mockito/mockito-core/latest/org/mockito/Mockito.html)
- [AssertJ Documentation](https://assertj.github.io/doc/)
- [Spring Boot Testing](https://docs.spring.io/spring-boot/docs/current/reference/html/features.html#features.testing)

---

**Testing Infrastructure Setup Complete! ✅**

You now have a solid foundation for writing comprehensive unit, integration, and API tests across all your microservices.
