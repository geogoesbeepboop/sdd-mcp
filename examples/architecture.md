
# PromptsHQ Architecture
This document provides a deep dive into the technical architecture of PromptsHQ.

## Backend
- Spring Boot application
- Layered patterns: @Controller, @Service, @Repository, @Entity, @Config
- Database: MySQL/SQL, managed by Hibernate ORM (@Entity classes auto-create/update tables)
- DB connection configured in `application.properties`
- All controllers return `ResponseEntity<GenericAPIResponse<T>>` for consistent API responses (see best-practices.md for usage)
- DTOs (common, request, response) stored in `dto/` folder
- Utility functions in appropriate `utils` files
- LLM API integration as a modular dependency
- Exposes REST endpoints for prompt/file management and AI features

## Frontend
- Vite + React + TypeScript + MUI
- Consumes backend APIs
- Provides UI for file retrieval, submission, editing, and AI-powered generation

## Deployment
- Frontend is built and bundled into the backend WAR
- Single executable for production deployment

## Data Flow
1. User interacts with frontend
2. Frontend calls backend REST APIs
3. Backend processes requests, interacts with LLM APIs if needed, and manages files
4. Responses returned to frontend

_See `/.github/product.md` for product vision, mission, and roadmap._