# Command: /plan

## Goal
Initialize or configure a project for spec-driven development by analyzing the codebase, gathering product context, and establishing the foundational documentation structure needed before feature development.

## Detection Logic
The agent must systematically detect project state in this order:
1. Check if `.github/product.md` exists → Existing spec-driven project (CONFIGURED)
2. Check if any codebase repos exist and contains code → Existing project, new to spec-driven (EXISTING)  
3. Check if workspace is empty or only contains basic files → New project (NEW)
4. Check if `.github/` exists but `product.md` is missing → Partially configured (PARTIAL)

## User Interaction Flow
1. Detect project state (new/existing/configured)
2. Analyze existing code structure (if applicable)
3. Gather product information (mission/vision/roadmap)
4. Document technical stack and architecture
5. Create foundational files
6. Set initial context

## Inputs Required
- `project_type`: new | existing | reconfigure
- `product_name`: Name of the product/project
- `mission`: 1-3 sentence mission statement
- `tech_stack`: Technologies and frameworks used throughout the entire project
- `roadmap`: features to implement by an ordered, timeline basis
- `repos_info`: Repository structure and purpose

## Outputs Generated
- `.github/product.md`: Product vision, roadmap, and context
- `.github/best-practices.md`: Coding standards based on tech stack
- `.github/context.md`: Initial context (empty spec reference)
- `docs/architecture.md`: System architecture documentation
- `docs/api.md`: API structure (if applicable)
- `docs/database.md`: Database schema (if applicable)
- `docs/design.md`: Database schema (if applicable)

## Instructions for Copilot

### Step 1: Detect Context
Execute these checks in order and stop at first match:

1. **Check for existing spec-driven setup:**
   - Look for `.github/product.md`
   - If exists: STATE = CONFIGURED
   
2. **Check for existing code:**
   - Look for `repos/` directory with subdirectories
   - Scan for common files: `package.json`, `pom.xml`, `requirements.txt`, `Cargo.toml`
   - If found: STATE = EXISTING
   
3. **Check for partial setup:**
   - Look for `.github/` directory without `product.md`
   - If found: STATE = PARTIAL
   
4. **Otherwise:**
   - STATE = NEW

Report detected state to user: "I detected this is a [STATE] project."
### Step 2: Gather Information

**For NEW projects**, ask in this order:
1. "What's the name of your product?"
2. "What's the mission? (What problem does it solve in 1-3 sentences)"
3. "What's your vision? (Where is this product heading? What does success look like?)"
4. "What are the key features this product will provide? (3-5 main features)"
5. "What's your tech stack? Include specific versions and justification for major choices."
6. "How will your repositories be structured? (monorepo, multi-repo, microservices, etc. and why?)"
7. "What are your key architectural constraints or requirements? (performance, scale, security, compliance, etc.)"
8. "What's your roadmap? (Ordered phases with specific deliverables and rough timeline)"
9. "Do you have any specific API design preferences? (REST, GraphQL, response patterns, error handling approach)"
10. "Are there any specific business rules or domain logic I should be aware of?"

**For EXISTING projects**:
1. First, analyze all codebase repos automatically:
   - Identify programming languages, frameworks, and versions
   - Find package files to determine dependencies and tech stack
   - Scan for API route files, controllers, and endpoint patterns
   - Analyze database schemas, models, and migration files
   - Identify testing frameworks and patterns
   - Look for configuration files and deployment patterns
   - Analyze code structure and architectural patterns
   - Identify repository purposes and service boundaries
2. Present detailed findings: "I found [X repos] with these technologies: [detailed list]. Architecture patterns discovered: [patterns]. API structure: [endpoints/patterns]. Database: [schema overview]. Is this analysis accurate?"
3. Ask for clarification: "Please add any missing context about the analysis."
4. Ask: "What's the product mission and vision? (What problem does it solve and where is it heading?)"
5. Ask: "What are the key business features this system provides?"
6. Ask: "What architectural decisions or constraints should I document? (performance requirements, scaling needs, security considerations, etc.)"
7. Ask: "Are there specific coding patterns or conventions I should capture from the codebase?"
8. Ask: "What's your current development workflow? (testing approach, deployment process, code review practices)"
9. Ask: "What's your roadmap for this project? (upcoming features, technical debt, refactoring plans)"
10. Ask: "Are there any domain-specific business rules or logic I should understand?"

**For PARTIAL projects**:
1. Load existing `.github/` files and analyze what's already configured
2. "I found partial setup with [existing files]. What needs to be completed or updated?"
3. Follow up with missing information from NEW or EXISTING flows above

**For CONFIGURED projects**:
1. Load `.github/product.md` and analyze current setup
2. "Your project is already configured for spec-driven development. What would you like to update?"
3. Present options: "Would you like to: (a) update product info, (b) add new repositories, (c) revise tech stack, or (d) update roadmap?"

### Step 3: Process and Validate

1. **Validate collected information:**
   - Ensure product name is clear and descriptive
   - Confirm mission statement is 1-3 sentences and addresses the core problem
   - Verify tech stack components are compatible
   - Check repository structure makes sense for the project type

2. **For EXISTING projects, perform deep analysis:**
   - **Technology Detection**: Scan for `package.json`, `pom.xml`, `requirements.txt`, `Cargo.toml`, `go.mod`, `composer.json`, etc.
   - **Framework Analysis**: Identify specific frameworks (Spring Boot, Express, Django, Rails, Laravel, etc.) and versions
   - **API Pattern Analysis**: 
     - Find route/controller files: `routes/`, `controllers/`, `api/`, `endpoints/`, `handlers/`
     - Extract endpoint patterns and HTTP methods
     - Identify request/response structures and DTOs
     - Detect authentication/authorization patterns
   - **Database Analysis**: 
     - Find schema files: `migrations/`, `schema/`, `models/`, `entities/`
     - Identify database type and ORM patterns
     - Extract table relationships and key fields
   - **Configuration Analysis**: 
     - Find config files: `.env.example`, `config/`, `docker-compose.yml`, `application.properties`, `settings.py`
     - Identify deployment and environment patterns
   - **Code Pattern Analysis**:
     - Extract naming conventions (camelCase, snake_case, etc.)
     - Identify architectural patterns (layered, MVC, DDD, etc.)
     - Find error handling approaches
     - Detect testing patterns and frameworks
     - Analyze logging and monitoring setup

3. **Generate architecture insights:**
   - Map service boundaries and responsibilities
   - Identify communication patterns (REST/GraphQL/gRPC/message queues)
   - Document data flow between services
   - Note deployment patterns (monolith/microservices/serverless)

4. **Validation checks:**
   - Confirm all required information is collected
   - Verify tech stack choices align with repository analysis
   - Ensure roadmap items are realistic and ordered
   - Check for any conflicting information

### Step 4: Generate Output

1. **Create directory structure:**
   - Ensure `.github/` directory exists
   - Ensure `docs/` directory exists
   - Create `specs/` directory if it doesn't exist

2. **Generate files in this order:**
   - `.github/product.md` (core product information)
   - `.github/best-practices.md` (coding standards based on tech stack)
   - `.github/context.md` (initial context file)
   - `docs/architecture.md` (system architecture)
   - `docs/api.md` (if APIs detected or planned)
   - `docs/database.md` (if databases detected or planned)

3. **Validate generated files:**
   - Ensure all templates are complete
   - Verify file paths are correct
   - Check that generated content matches provided information

4. **Validate documentation quality:**
   - Check that all required sections are present in each file
   - Ensure templates are filled with specific, project-relevant content (not generic placeholders)
   - Validate that tech stack analysis matches discovered patterns
   - Confirm architectural insights align with codebase analysis
   - Check that best practices reflect actual patterns found in code

5. **Report completion:**
   - List all files created with brief description of content quality
   - Confirm the project is ready for spec-driven development
   - Provide context fetching guidance: "Foundation docs (product.md, best-practices.md) will auto-load in new conversations. Technical docs (api.md, database.md, architecture.md) load on-demand when needed."
   - Suggest next step: "Your project is now configured. Use /create-spec to begin feature development."

## File Templates

### product.md
```markdown
# [Product Name]

## Mission
[1-3 sentence mission statement describing the core problem being solved]

## Vision
[Where the product is heading, what success looks like, the long-term impact]

## Key Features
- [Feature 1]: [Brief description of value provided]
- [Feature 2]: [Brief description of value provided]
- [Feature 3]: [Brief description of value provided]

## Tech Stack (see /docs/architecture.md for details)
- **Frontend**: [Technologies with justification for choice]
- **Backend**: [Technologies with justification for choice] 
- **Database**: [Technologies with justification for choice]
- **Infrastructure**: [Technologies with justification for choice]

## Repository Structure
[Describe monorepo vs multi-repo strategy and reasoning]
- `repos/[repo-name]`: [Purpose, responsibilities, and technology focus]
- `repos/[repo-name-2]`: [Purpose, responsibilities, and technology focus]

## Roadmap
[Ordered by priority/timeline - be specific about what each phase delivers]
1. [Phase 1 Name]: [Core deliverables and timeline]
2. [Phase 2 Name]: [Core deliverables and timeline]
3. [Phase 3 Name]: [Core deliverables and timeline]

---
For deep dives, see:
- Architecture: `/docs/architecture.md`
- API: `/docs/api.md`  
- Database: `/docs/database.md`

### best-practices.md
```markdown
# Coding Best Practices for [Product Name]

## General
- Use comments alongside your code implementations for maintainability
- Follow established patterns discovered in the codebase analysis

## [Primary Language] ([Framework if applicable])
[Auto-generated based on detected languages and frameworks - include specific rules like:]

### Code Style
- Indentation: [spaces/tabs detected from codebase]
- Naming conventions: [camelCase/snake_case/PascalCase based on existing patterns]
- File organization: [Based on discovered structure]
- Import/export conventions: [Based on existing patterns]

### Architecture Patterns
- Use layered architecture: [Specific layers found in codebase, e.g., @Controller, @Service, @Repository, @Entity]
- [Database]: [Specific ORM/database patterns found]
- Configuration management: [Based on discovered config patterns]

### API Design
- All [controller/route] methods should return `[ResponseType]` for consistent API responses
- When implementing new endpoints, always:
  - [Specific pattern 1 from examples]
  - [Specific pattern 2 from examples]
  - Use DTOs for all request and response payloads
  - Example usage: [Concrete example from codebase or framework]

### Error Handling
- [Specific error handling patterns discovered in codebase]
- Handle exceptions with [specific approach found]
- Log errors using [logging framework/pattern found]

### Testing Conventions
- [Testing framework and patterns discovered]
- Coverage expectations: [Based on existing tests]
- Test file organization: [Based on discovered structure]

## Git Workflow  
- Branch naming: `feature/[feature-name]` (extracted from SPEC-YYYYMMDD-slug)
- Commit format: `type(scope): message`
- PR naming: Clear, descriptive titles
- Merge strategy: [Based on project preference or discovered from history]

## Quality Standards
- Code review requirements: [Based on team size and complexity]
- Performance considerations: [Specific to tech stack]
- Security guidelines: [Framework-specific security patterns]

## Collaboration
- Document architectural, API and design decisions in /docs
- [Additional patterns discovered from team workflows]
```

### context.md
```markdown
# Project Context

ACTIVE_SPEC: none
LAST_UPDATED: [YYYY-MM-DD]
PROJECT_STATE: configured

## Status
Project initialized for spec-driven development.
Ready to create first specification with /create-spec.
```

### docs/architecture.md
```markdown
# [Product Name] Architecture
This document provides a deep dive into the technical architecture of [Product Name].

## Overview
[High-level description of system architecture approach - monolith, microservices, etc.]
- [Brief summary of architectural approach and reasoning]

## Components
[Auto-generated based on repository analysis and discovered patterns]

### [Primary Component Name] 
- **Framework**: [Detected framework and version]
- **Location**: `repos/[repo-name]/`
- **Purpose**: [Core business logic description]
- **Technology**: [Specific tech stack for this component]
- **Key Responsibilities**:
  - [Responsibility 1 based on code analysis]
  - [Responsibility 2 based on code analysis]
  - [Responsibility 3 based on code analysis]
- **API Endpoints**: [If applicable - basic count/types]
- **Database Tables**: [If applicable - basic count/types]

### [Secondary Component Name]
[Repeat pattern above for each discovered component]

## Data Flow
[Describe how data moves through the system with specific examples]
1. [Step 1]: [Specific process description]
2. [Step 2]: [How data transforms/moves]  
3. [Step 3]: [Final output/storage]

## Communication Patterns
[Based on discovered patterns in codebase]
- **[Pattern Type]**: [Description, when used, and discovered examples]
- **[Pattern Type]**: [Description, when used, and discovered examples]
- **[Pattern Type]**: [Description, when used, and discovered examples]

## Deployment Strategy
[Based on discovered deployment patterns and configuration files]
- [Deployment approach]: [Description and reasoning]
- [Build process]: [Based on discovered scripts/configs]
- [Environment management]: [Based on discovered config patterns]

## Key Design Decisions
- **[Technology Choice]**: [Decision and rationale based on analysis]
- **[Architecture Pattern]**: [Decision and rationale based on analysis]
- **[Integration Approach]**: [Decision and rationale based on analysis]

## Performance Considerations
[Based on tech stack and discovered patterns]
- [Performance aspect 1]: [Approach and reasoning]
- [Performance aspect 2]: [Approach and reasoning]

## Security Architecture
[Based on discovered security patterns]
- [Security aspect 1]: [Implementation approach]
- [Security aspect 2]: [Implementation approach]

_See `/.github/product.md` for product vision, mission, and roadmap._
```

### docs/api.md
```markdown
# [Product Name] API Overview

## Overview
[API design approach based on discovered patterns - REST/GraphQL/etc.]
- [Brief description of API philosophy and design decisions]

## Core Endpoints
[Auto-generated from route/controller analysis where possible]
- `[HTTP_METHOD] [/endpoint-pattern]` - [Brief description] (returns `[ResponseType]`)
- `[HTTP_METHOD] [/endpoint-pattern]` - [Brief description] (returns `[ResponseType]`)
- `[HTTP_METHOD] [/endpoint-pattern]` - [Brief description] (returns `[ResponseType]`)

## Authentication
[Based on discovered auth patterns in codebase]
- [Authentication mechanism found or recommended]
- [Token handling approach]
- [Authorization levels if discovered]

## Request/Response Format
[Based on discovered patterns and best practices from codebase]
- All API responses use `[ResponseWrapper]` for consistency
- Request format: [Based on discovered DTO patterns]
- Response format: [Based on discovered response patterns]
- Example request/response: [Concrete example from framework/codebase]

## Error Handling
[Based on discovered error handling patterns]
- Error response format: [Specific structure found or recommended]
- HTTP status codes: [Standards used in project]
- Error categorization: [Based on discovered patterns]

## Validation
[Based on discovered validation patterns]
- Input validation: [Framework/approach discovered]
- Data sanitization: [Approach found in codebase]

## DTOs
- All request/response objects are defined as DTOs in the `[dto-location]` folder
- [Additional DTO patterns discovered]

## Documentation
[Based on discovered documentation approach]
- [API documentation tool/approach found]
- [Interactive documentation availability]
```

### docs/database.md
```markdown
# [Product Name] Database Overview

## Overview
[Database technology and approach based on discovered patterns]
- [Database type and version discovered]
- [ORM/database access pattern discovered]
- [Connection management approach]

## Data Model
[High-level data entities and their purposes based on discovered models/entities]
- [Entity 1]: [Purpose and key attributes]
- [Entity 2]: [Purpose and key attributes]  
- [Entity 3]: [Purpose and key attributes]
- [Entity 4]: [Purpose and key attributes]

## Schema Design Principles
[Based on discovered patterns and database best practices]
- [Design principle 1 based on analysis]
- [Design principle 2 based on analysis]
- [Design principle 3 based on analysis]

## Tables
[Auto-generated from schema analysis when /sync-docs runs - this section populated automatically]

## Key Relationships
[Based on discovered foreign keys, joins, and entity relationships]
- [Entity A] → [Entity B]: [Relationship type and purpose]
- [Entity B] → [Entity C]: [Relationship type and purpose]
- [Entity C] → [Entity D]: [Relationship type and purpose]

## Storage Strategy
[Based on discovered database configuration and requirements]
- [Storage approach]: [Implementation and reasoning]
- [Backup strategy]: [Based on discovered or recommended patterns]
- [Data retention]: [Based on business requirements if discovered]

## Performance & Indexing
[Based on discovered indexes and performance patterns]
- [Performance consideration 1]: [Approach and reasoning]
- [Performance consideration 2]: [Approach and reasoning]
- [Index strategy]: [Based on discovered or recommended patterns]

## Migration Management
[Based on discovered migration patterns]
- [Migration tool/approach discovered]: [Description]
- [Migration process]: [Based on discovered workflow]
- [Version control]: [How schema changes are tracked]

## Security
[Based on discovered security patterns]
- [Data encryption]: [Approach if discovered]
- [Access control]: [Database-level security patterns]
- [Sensitive data handling]: [Patterns for PII, etc.]
```