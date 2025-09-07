# Command: /plan

## Goal
Initialize or configure a project for spec-driven development by analyzing the codebase, gathering product context, and establishing the foundational documentation structure needed before feature development.

## Detection Logic
The agent must systematically detect project state in this order:
1. Check if `.github/product.md` exists → Existing spec-driven project (CONFIGURED)
2. Check if `repos/` directory exists and contains code → Existing project, new to spec-driven (EXISTING)  
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
3. "What's the roadmap or vision for the development of this project?"
4. "What's your tech stack? (e.g., React, Node.js, PostgreSQL)"
5. "How will your repositories be structured? (single repo, frontend/backend split, microservices, etc.)"

**For EXISTING projects**:
1. First, analyze repos/ automatically:
   - Identify programming languages and frameworks
   - Find package files to determine dependencies
   - Scan for API route files, database schemas, config files
   - Identify repository purposes and boundaries
2. Present findings: "I found [X repos] with these technologies: [list]. The structure appears to be: [description]. Is this accurate?"
3. Ask for clarification: "Please correct any misunderstandings and add missing context."
4. Ask: "Any important architectural decisions or constraints I should document?"
5. Ask: "What's your current roadmap or vision for this project's development?"

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
   - Scan repos/ for: `package.json`, `pom.xml`, `requirements.txt`, `Cargo.toml`, etc.
   - Find API route files: `routes/`, `controllers/`, `api/`, `endpoints/`
   - Identify database files: `migrations/`, `schema/`, `models/`
   - Look for config files: `.env.example`, `config/`, `docker-compose.yml`

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

4. **Report completion:**
   - List all files created
   - Confirm the project is ready for spec-driven development
   - Suggest next step: "Your project is now configured. Use /create-spec to begin feature development."

## File Templates

### product.md
```markdown
# [Product Name]

## Mission
[1-2 sentence mission statement]

## Roadmap
[Upcoming features, timeline, how the product will develop in phases]

## Tech Stack
- **Frontend**: [Technologies]
- **Backend**: [Technologies]
- **Database**: [Technologies]
- **Infrastructure**: [Technologies]

## Repository Structure
- `repos/[repo-name]`: [Purpose and responsibility]
- `repos/[repo-name-2]`: [Purpose and responsibility]

## Key Design Decisions
- [Decision 1]: [Rationale]
- [Decision 2]: [Rationale]

### best-practices.md
```markdown
# Development Best Practices

## Code Style

### [Language] Standards
[Auto-generated based on detected languages - include specific rules like:]
- Indentation: [spaces/tabs]
- Naming conventions: [camelCase/snake_case/PascalCase]
- File organization patterns
- Import/export conventions

## Git Workflow
- Branch naming: `feature/[feature-name]` (extracted from SPEC-YYYYMMDD-slug)
- Commit format: `type(scope): message`
- PR naming: Clear, descriptive titles
- Merge strategy: [squash/merge/rebase]

## Implementation Patterns
[Document patterns discovered in codebase:]
- Error handling approaches
- Configuration management
- Testing conventions
- API design patterns
- Database access patterns

## Quality Standards
- Code review requirements
- Testing coverage expectations
- Performance considerations
- Security guidelines
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
# System Architecture

## Overview
[High-level description of the system]

## Components
[Based on repository analysis:]

### [Component Name]
- **Location**: `repos/[repo-name]/`
- **Purpose**: [Description]
- **Technology**: [Tech stack]
- **Responsibilities**: 
  - [Responsibility 1]
  - [Responsibility 2]

## Data Flow
[Describe how data moves through the system]

## Communication Patterns
- [Pattern 1]: [Description and usage]
- [Pattern 2]: [Description and usage]

## Deployment Architecture
[Describe how components are deployed and scaled]

## Key Design Decisions
- **[Decision Topic]**: [Decision and rationale]
- **[Decision Topic]**: [Decision and rationale]
```

### docs/api.md
```markdown
# API Documentation

## Overview
[Brief description of API design approach]

## Authentication
[Authentication mechanism if applicable]

## Base URL
[API base URL and versioning strategy]

## Endpoints
[Auto-generated from route analysis - will be populated by /sync-docs]

## Error Handling
[Standard error response format]

## Rate Limiting
[Rate limiting policies if applicable]
```

### docs/database.md
```markdown
# Database Documentation

## Overview
[Database technology and approach]

## Schema Design
[High-level schema design principles]

## Tables
[Auto-generated from schema analysis - will be populated by /sync-docs]

## Relationships
[Key relationships between entities]

## Indexes and Performance
[Performance considerations and index strategy]

## Migration Strategy
[How database changes are managed]
```

## Error Handling and Edge Cases

### Common Issues and Solutions

1. **Permission Issues**
   - If unable to create `.github/` or `docs/` directories
   - Solution: Check write permissions, suggest alternative locations

2. **Conflicting Information**
   - Repository analysis contradicts user input
   - Solution: Present both findings, ask user to clarify

3. **Missing Repository Structure**
   - `repos/` exists but is empty or has unrecognized structure
   - Solution: Treat as NEW project, ask for clarification

4. **Incomplete Technology Detection**
   - Cannot determine tech stack from files
   - Solution: Ask user to specify, provide common options

5. **Large Repository Analysis**
   - Too many files to analyze efficiently
   - Solution: Focus on root files and common patterns, ask for confirmation

### Validation Failures

- **Invalid product name**: Must not contain special characters for file paths
- **Empty mission statement**: Must provide at least one sentence
- **Incompatible tech stack**: Warn about potential conflicts
- **Unclear repository structure**: Ask for clarification before proceeding

### Recovery Actions

- If file creation fails partway through, list what was created
- Provide command to resume: "Run /plan again to complete setup"
- Never overwrite existing files without user confirmation