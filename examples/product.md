# PromptsHQ

## Mission
PromptsHQ is a centralized hub and AI helper for users to retrieve, submit, edit, and produce common files used with AI, such as custom copilot-instructions.md files, prompt skeletons, and text-to-mermaid diagram creation. It leverages LLM APIs for AI-powered features while also providing a "library" for sharing and managing useful files.

## Vision
To become the go-to platform for managing, sharing, and generating prompts, instructions, and documentation that enhance copilot agent workflows.

## Key Features
- Retrieve, submit, edit, and share prompt files and instructions
- AI-powered generation and editing of prompts, diagrams, and documentation
- Library functionality for storing and searching useful files
- Webapp interface for easy access and management

## Tech Stack (see /docs/architecture.md for details)
- Backend: Java, Spring Boot
- Database: MySQL/SQL
- ORM: Hibernate
- AI Integration: LLM API clients
- Frontend: Vite, React, TypeScript, MUI
- Deployment: Single executable WAR file

## Repository Structure
- Monorepo: Backend (Spring Boot) and Frontend (Vite/React) bundled together
- Single codebase for both frontend and backend

## Roadmap
1. Core backend service and API for file management
2. AI integration for prompt/document generation
3. Frontend webapp for user interaction
4. Bundled deployment as a single WAR
5. Community features for sharing and collaboration

---
For deep dives, see:
- Architecture: `/docs/architecture.md`
- API: `/docs/api.md`
- Database: `/docs/database.md`
