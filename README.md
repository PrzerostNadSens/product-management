# Product Management System

This project is a web application for managing products. It includes both backend and frontend functionalities, using NestJS for the backend and Next.js for the frontend. The application allows users to add, update, delete, and view products, with data stored in a PostgreSQL database managed through Prisma ORM.

## Technologies Used

- **Backend:** NestJS
- **Frontend:** Next.js
- **Database:** PostgreSQL
- **ORM:** Prisma

## Getting Started

### Prerequisites

- Docker
- Docker Compose

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/PrzerostNadSens/product-management.git
   cd product-management-system
   ```

2. Set up environment variables:

   Create a `.env` file in the root directory with the following content:

   ```env
   DATABASE_URL=postgresql://dev:dev@postgres:5432/test
   BACKEND_URL=http://backend:3000/api
   ```

3. Build and run the Docker containers:

   ```bash
   docker-compose up --build
   ```

4. Access the application:

   - **Frontend:** [http://localhost:3001](http://localhost:3001)

## API Documentation

The API documentation is available through Swagger at [http://localhost:3000/docs](http://localhost:3000/docs).
