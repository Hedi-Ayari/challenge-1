
# Invoice Management System

A full-stack invoice management application built with React, TypeScript, NestJS, and PostgreSQL.

## Tech Stack

### Frontend (Client)
- **React 18** with TypeScript
- **Vite** for build tooling
- **Redux Toolkit** for state management
- **React Query** for server state management
- **Axios** for API requests
- **Tailwind CSS** for styling
- **Shadcn/ui** for UI components
- **Zod** for validation

### Backend (Server)
- **NestJS** with TypeScript
- **Prisma ORM** for database management
- **PostgreSQL** database
- **JWT** authentication with Passport
- **Class Validator** for DTOs
- **Swagger** for API documentation
- **Docker** for database setup

## Getting Started

### Prerequisites
- Node.js 18+ 
- Docker and Docker Compose
- PostgreSQL
- npm or yarn

### Setup Instructions

1. **Clone the repository**
```bash
git clone <repository-url>
cd invoice-management-system
```

2. **Start the database**
```bash
docker-compose up -d
```

3. **Setup Backend**
```bash
cd server
npm install
```

4. **Generate Prisma client and run migrations**
```bash
npm run db:generate
npm run db:migrate
```

5. **Seed the database**
```bash
npm run db:seed
```

6. **Start the backend server**
```bash
npm run start:dev
```
The backend will be available at `http://localhost:3001`

7. **Setup Frontend** (in a new terminal)
```bash
cd ../client  
npm install
```

8. **Start the frontend**
```bash
npm run dev
```
The frontend will be available at `http://localhost:8080`

## Demo Credentials

**Email:** demo@example.com  
**Password:** password123

## API Documentation

Once the backend is running, visit `http://localhost:3001/api` for Swagger documentation.

## API Endpoints

### Authentication
- `POST /auth/login` - Authenticate user and get JWT token

### Invoices
- `GET /invoices` - Get all invoices for authenticated user
- `GET /invoices/:id` - Get specific invoice details
- `PATCH /invoices/:id/status` - Update invoice payment status

## Database Schema

### User
- id: String (Primary Key)
- email: String (Unique)
- password: String (Hashed)
- name: String

### Invoice
- id: String (Primary Key)
- vendor_name: String
- amount: Float
- due_date: DateTime
- description: String
- paid: Boolean
- user_id: String (Foreign Key)

## Project Structure

```
/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── store/         # Redux store and slices
│   │   ├── services/      # API services
│   │   └── utils/         # Utility functions
├── server/                # Backend NestJS application
│   ├── src/
│   │   ├── auth/          # Authentication module
│   │   ├── invoices/      # Invoices module
│   │   ├── users/         # Users module
│   │   └── prisma/        # Prisma service
│   └── prisma/            # Database schema and migrations
└── docker-compose.yml     # Database setup
```

## Development Commands

### Backend
```bash
npm run start:dev      # Start development server
npm run build          # Build for production
npm run db:migrate     # Run database migrations
npm run db:seed        # Seed database with demo data
npm test              # Run tests
```

### Frontend
```bash
npm run dev           # Start development server
npm run build         # Build for production
npm run preview       # Preview production build
```

## Features

- ✅ User authentication with JWT
- ✅ Invoice listing with filtering and search
- ✅ Invoice details modal
- ✅ Update invoice payment status
- ✅ Responsive design
- ✅ Real-time state management
- ✅ Error handling
- ✅ Type-safe API calls
- ✅ Database seeding
- ✅ API documentation

## Environment Variables

### Backend (.env)
```
DATABASE_URL="postgresql://postgres:password@localhost:5432/invoicedb?schema=public"
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
```

## Troubleshooting

1. **Database connection issues**: Ensure Docker is running and PostgreSQL container is up
2. **Port conflicts**: Make sure ports 3001 (backend) and 8080 (frontend) are available
3. **Prisma issues**: Try `npm run db:generate` to regenerate the Prisma client

