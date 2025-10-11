# Historial Frontend

React frontend application for the Historial workshop activity tracking system.

## Technology Stack

- React 18
- Vite
- React Router
- TailwindCSS
- Axios
- Lucide React (icons)

## Features

- User authentication with JWT
- Role-based access control (Admin/Usuario)
- Activity management (CRUD operations)
- Reports and analytics dashboard
- Responsive design

## Development

### Install Dependencies

```bash
npm install
```

### Start Development Server

```bash
npm run dev
```

Application will be available at http://localhost:3000

### Build for Production

```bash
npm run build
```

Output will be in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## Environment Variables

Create a `.env.local` file:

```env
VITE_API_URL=http://localhost:8080
```

## Project Structure

```
src/
├── components/       # Reusable components
│   ├── Layout.jsx
│   └── PrivateRoute.jsx
├── context/         # React Context (Auth)
│   └── AuthContext.jsx
├── pages/           # Page components
│   ├── Login.jsx
│   ├── Dashboard.jsx
│   ├── Activities.jsx
│   └── Reports.jsx
├── services/        # API services
│   ├── api.js
│   ├── authService.js
│   ├── activityService.js
│   └── reportService.js
├── App.jsx          # Main app component
├── main.jsx         # Entry point
└── index.css        # Global styles
```

## Available Routes

- `/login` - Login page
- `/dashboard` - Dashboard (protected)
- `/activities` - Activities management (protected)
- `/reports` - Reports and analytics (protected, admin only)

## API Integration

The frontend communicates with the backend through the API Gateway at `http://localhost:8080`.

All authenticated requests include the JWT token in the Authorization header.

## Docker

Build and run with Docker:

```bash
# Build
docker build -t historial-frontend .

# Run
docker run -p 3000:80 historial-frontend
```

## License

MIT
