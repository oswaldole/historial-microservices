# Historial - Microservices Architecture

Workshop Activity Tracking System refactored into a modern microservices architecture.

## Architecture Overview

This project uses a microservices architecture with the following components:

### Backend Services (Java 21 + Spring Boot 3.5)

1. **Auth Service** (Port 8081)
   - User authentication and authorization
   - JWT token generation and validation
   - User management

2. **Activity Service** (Port 8082)
   - Manage all workshop activities (failures, routines, workshop work)
   - Activity categorization (Hot Zone, Cold Zone)
   - Activity history and CRUD operations

3. **Report Service** (Port 8083)
   - Generate reports and analytics
   - Export functionality
   - Statistics and metrics

4. **API Gateway** (Port 8080)
   - Single entry point for all client requests
   - Route requests to appropriate microservices
   - Authentication verification

### Frontend (React + Vite)

- **Frontend** (Port 3000)
  - Modern React application
  - Role-based UI (admin/usuario)
  - Responsive design

### Databases

- **auth-db**: PostgreSQL for user data
- **activity-db**: PostgreSQL for activities
- **report-db**: PostgreSQL for reports and analytics

## Technology Stack

### Backend
- Java 21
- Spring Boot 3.5
- Spring Cloud Gateway
- Spring Security + JWT
- Spring Data JPA
- PostgreSQL
- Maven

### Frontend
- React 18
- Vite
- React Router
- Axios
- TailwindCSS
- Shadcn/ui

### Infrastructure
- Docker & Docker Compose
- PostgreSQL
- Nginx (optional for production)

## Quick Start

### Prerequisites

- Java 21
- Node.js 18+
- Docker & Docker Compose
- Maven 3.9+

### Running with Docker Compose

```bash
# Clone the repository
cd historial-microservices

# Start all services
docker-compose up -d

# Stop all services
docker-compose down
```

### Running Services Individually

#### Backend Services

```bash
# Auth Service
cd auth-service
mvn spring-boot:run

# Activity Service
cd activity-service
mvn spring-boot:run

# Report Service
cd report-service
mvn spring-boot:run

# API Gateway
cd api-gateway
mvn spring-boot:run
```

#### Frontend

```bash
cd frontend
npm install
npm run dev
```

## API Documentation

After starting the services, API documentation is available at:

- Auth Service: http://localhost:8081/swagger-ui.html
- Activity Service: http://localhost:8082/swagger-ui.html
- Report Service: http://localhost:8083/swagger-ui.html

## Default Credentials

- Admin: Ficha: `1001`, Cedula: `12345678`
- Usuario: Ficha: `2001`, Cedula: `87654321`

## Project Structure

```
historial-microservices/
├── auth-service/          # Authentication microservice
├── activity-service/      # Activity management microservice
├── report-service/        # Reporting microservice
├── api-gateway/          # API Gateway
├── frontend/             # React frontend
├── docker/               # Docker configurations
├── docs/                 # Documentation
└── docker-compose.yml    # Orchestration file
```

## Development

See individual service README files for detailed development instructions.

## License

MIT
