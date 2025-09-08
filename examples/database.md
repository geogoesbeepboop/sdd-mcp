# PromptsHQ Database Overview

## Data Model
- Users
- Files (prompts, instructions, diagrams)
- File metadata (author, tags, timestamps)
- AI generation logs


## Storage
- MySQL/SQL as the primary database
- Managed by Hibernate ORM (tables auto-created/updated from @Entity classes)
- DB connection configured in `application.properties`


## Migrations
- Managed via Hibernate auto DDL
