# Historial - Microservices Architecture

Workshop Activity Tracking System refactored into a modern microservices architecture.

## Architecture Overview

This project uses a microservices architecture with the following components:

### Backend Services (Java 21 + Spring Boot 3.5)

1. **Auth Service** (Port 8081)
   - User authentication and authorization
   - JWT token generation and validation
   - User management (CRUD operations)
   - Role-based access control (ADMIN/USUARIO)

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

### Frontend (React 19 + TypeScript + Vite)

- **Frontend** (Port 3000)
  - Modern React 19.1 application with TypeScript
  - Role-based UI (admin/usuario)
  - User administration interface (admin only)
  - Responsive design with TailwindCSS

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
- React 19.1
- TypeScript 5.7
- Vite 5
- React Router 6
- Axios
- TailwindCSS 3
- Lucide Icons
- ESLint + TypeScript ESLint

### Infrastructure
- Docker & Docker Compose
- PostgreSQL
- Nginx (optional for production)

## Features

### User Roles
- **Admin**: Full access to all features including user management, reports, and activities
- **Usuario**: Access to activities and dashboard

### Key Features
- User authentication with JWT tokens
- Activity tracking (Failures, Routines, Workshop Work)
- Real-time statistics dashboard
- Comprehensive reporting system
- User administration (Admin only)
  - Create, edit, and delete users
  - Assign user roles
  - Search and filter users
- Activity categorization (Hot Zone, Cold Zone, Workshop, Others)
- Export functionality
- Responsive design for mobile and desktop

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
npm install --legacy-peer-deps  # Required for React 19 compatibility
npm run dev                      # Start development server
npm run build                    # Build for production
npm run lint                     # Run ESLint
npm run type-check               # Run TypeScript type checking
```

**Note**: The frontend is built with React 19.1 and TypeScript. Make sure all backend services are running before starting the frontend.

## API Documentation

After starting the services, API documentation is available at:

- Auth Service: http://localhost:8081/swagger-ui.html
- Activity Service: http://localhost:8082/swagger-ui.html
- Report Service: http://localhost:8083/swagger-ui.html

## Default Credentials

A default admin user is **automatically created** when the auth-service starts:

**Admin User:**
- Ficha: `1001`
- Cedula: `12345678`
- Name: Admin Sistema

**Note**: This user is defined in `auth-service/src/main/resources/data.sql` and is automatically inserted on first startup using Spring's SQL initialization feature. You can use the admin interface to create additional users after logging in.


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

## Available Endpoints

### Frontend Routes
- `/login` - User login page
- `/dashboard` - Main dashboard with activity statistics
- `/activities` - Activity management (view, create, edit, delete)
- `/reports` - Reports and analytics (admin only)
- `/users` - User management (admin only)

### API Endpoints

All API requests go through the API Gateway at `http://localhost:8080`

#### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - Register new user (admin only)
- `GET /api/auth/users` - Get all users (requires authentication)
- `GET /api/auth/users/{id}` - Get user by ID (requires authentication)
- `PUT /api/auth/users/{id}` - Update user (requires authentication)
- `DELETE /api/auth/users/{id}` - Delete user (requires authentication)

#### Activities
- `GET /api/activities` - Get all activities
- `POST /api/activities` - Create new activity
- `GET /api/activities/{id}` - Get activity by ID
- `PUT /api/activities/{id}` - Update activity
- `DELETE /api/activities/{id}` - Delete activity (admin only)

#### Reports
- `GET /api/reports/summary` - Get summary statistics
- `GET /api/reports/equipo/{equipo}` - Get reports by equipment
- `GET /api/reports/type/{tipo}` - Get reports by activity type

## Development

### Frontend Development

The frontend uses React 19.1 with TypeScript and includes:
- Strict TypeScript configuration
- ESLint with TypeScript support
- Hot module replacement with Vite
- Type-safe API calls with Axios

### Backend Development

Each microservice follows Spring Boot best practices:
- JWT-based authentication with security filter chain
- RESTful API design
- PostgreSQL with JPA/Hibernate
- OpenAPI/Swagger documentation
- CORS configuration for local development

### Environment Variables

Frontend (`.env`):
```env
VITE_API_URL=http://localhost:8080
```

Backend services use `application.yml` for configuration.

## Troubleshooting

### Frontend Issues

**ESLint errors**: Run `npm run lint` to check for issues
**Type errors**: Run `npm run type-check` to validate TypeScript
**Build issues**: Delete `node_modules` and run `npm install --legacy-peer-deps`

### Backend Issues

**Port conflicts**: Ensure ports 8080-8083 are available
**Database connection**: Verify PostgreSQL is running and accessible
**JWT errors**: Check that the auth-service is running and properly configured

## License

MIT
