# Spec-Driven Development Command Workflow Matrix

This document shows how all commands work together in the spec-driven development process.

## Command Flow Overview

```
┌─────────────┐    ┌──────────────┐    ┌──────────────┐    ┌─────────────┐    ┌─────────────┐
│   /plan     │───▶│ /create-spec │───▶│ /create-tasks│───▶│ /implement  │───▶│ /sync-docs  │
│             │    │              │    │              │    │             │    │             │
│ Initialize  │    │ Define       │    │ Break into   │    │ Execute     │    │ Update      │
│ Project     │    │ Feature      │    │ Tasks        │    │ Tasks       │    │ Docs        │
└─────────────┘    └──────────────┘    └──────────────┘    └─────────────┘    └─────────────┘
       ▲                                                           │                   │
       │                                                           ▼                   │
       │           ┌─────────────────────────────────────────────────────────────────┐ │
       │           │                    FEEDBACK LOOP                                  │ │
       └───────────┤  - Learnings from implementation                                 │ │
                   │  - Architectural insights                                        │ │
                   │  - Process improvements                                          │◀┘
                   │  - Updated roadmap                                               │
                   └─────────────────────────────────────────────────────────────────┘
```

## Command Relationships Matrix

| Command | Prerequisites | Creates | Updates | Enables |
|---------|---------------|---------|---------|---------|
| `/plan` | Empty project or uninitialized | `.github/product.md`<br>`.github/best-practices.md`<br>`.github/context.md`<br>`docs/architecture.md`<br>`docs/api.md`<br>`docs/database.md` | Project foundation | `/create-spec` |
| `/create-spec` | `/plan` completed | `specs/SPEC-*/spec.md`<br>`specs/SPEC-*/lite.md`<br>`specs/SPEC-*/api.md` (optional)<br>`specs/SPEC-*/database.md` (optional)<br>`specs/SPEC-*/design.md` (optional) | `.github/context.md` (ACTIVE_SPEC) | `/create-tasks` |
| `/create-tasks` | Active spec from `/create-spec` | `specs/SPEC-*/tasks.md` | `.github/context.md` (task creation note) | `/implement` |
| `/implement` | Tasks from `/create-tasks` | Code files per task definitions | `specs/SPEC-*/tasks.md` (progress)<br>`.github/context.md` (progress) | `/sync-docs` (when tasks complete) |
| `/sync-docs` | Completed tasks from `/implement` | Updated documentation | `docs/api.md`<br>`docs/database.md`<br>`docs/architecture.md`<br>`docs/design.md`<br>`.github/context.md` | New cycle with `/create-spec` |

## Context File Dependencies

### `.github/context.md` - Central State Tracker
```markdown
ACTIVE_SPEC: [SPEC-YYYYMMDD-slug or "none"]
LAST_UPDATED: [YYYY-MM-DD]
PROJECT_STATE: [new|configured|developing|documented]
```

**Used by:**
- `/create-spec`: Reads to check for existing active spec
- `/create-tasks`: Reads to find active spec
- `/implement`: Reads to load task context
- `/sync-docs`: Reads to find completed specs

**Updated by:**
- `/plan`: Sets PROJECT_STATE to "configured"
- `/create-spec`: Sets ACTIVE_SPEC and LAST_UPDATED
- `/create-tasks`: Updates LAST_UPDATED
- `/implement`: Updates LAST_UPDATED and progress
- `/sync-docs`: Updates LAST_UPDATED and PROJECT_STATE

## Typical Workflow Scenarios

### 1. New Project Setup
```
User → /plan
├── Detects: Empty project (NEW state)
├── Gathers: Product info, tech stack, repo structure  
├── Creates: Foundation files (.github/, docs/)
└── Result: Project ready for feature development

User → /create-spec
├── Detects: Configured project, no active spec
├── Gathers: Feature requirements through conversation
├── Creates: Spec files (spec.md, lite.md, etc.)
└── Result: ACTIVE_SPEC set, ready for task breakdown

User → /create-tasks  
├── Detects: Active spec exists
├── Gathers: Implementation approach, granularity
├── Creates: Detailed task breakdown (tasks.md)
└── Result: Ready for implementation

User → /implement (multiple times)
├── Detects: Tasks available, dependencies met
├── Gathers: Task selection, approach preference
├── Creates: Actual code per task requirements
└── Result: Tasks completed, progress tracked

User → /sync-docs
├── Detects: Completed tasks with implementation
├── Gathers: Documentation scope and strategy
├── Updates: Project documentation
└── Result: Docs current, ready for next feature
```

### 2. Existing Project Integration
```
User → /plan  
├── Detects: Existing code (EXISTING state)
├── Analyzes: Current repos, tech stack, structure
├── Gathers: Product context, missing information
├── Creates: Foundation files + analyzed architecture
└── Result: Existing project ready for spec-driven development
```

### 3. Iterative Development
```
Cycle 1: /create-spec → /create-tasks → /implement → /sync-docs
Cycle 2: /create-spec → /create-tasks → /implement → /sync-docs  
Cycle N: /create-spec → /create-tasks → /implement → /sync-docs

Each cycle:
- Builds on previous documentation
- References existing architecture
- Maintains consistency with established patterns
- Updates roadmap based on learnings
```

## Command Interactions

### Prerequisites and Dependencies
- **Hard Dependencies**: Command cannot run without prerequisite
- **Soft Dependencies**: Command can run but with reduced effectiveness
- **Context Dependencies**: Command needs specific project state

| From Command | To Command | Dependency Type | Reason |
|--------------|------------|-----------------|---------|
| `/plan` | `/create-spec` | Hard | Needs product context and file structure |
| `/create-spec` | `/create-tasks` | Hard | Needs specification to break down |
| `/create-tasks` | `/implement` | Hard | Needs task definitions to execute |
| `/implement` | `/sync-docs` | Soft | More effective with completed tasks |
| `/sync-docs` | `/create-spec` | Context | Updated docs inform next specs |

### Error Handling Between Commands
- Each command validates its prerequisites
- Clear error messages guide users to missing dependencies  
- Partial states are handled gracefully
- Recovery suggestions maintain workflow continuity

## Usage Patterns

### Daily Development Flow
1. Check current status: Look at `.github/context.md` or run command to see state
2. Continue work: Use `/implement` to continue current task
3. Complete features: Use `/sync-docs` when tasks are done
4. Plan next: Use `/create-spec` for next feature

### Project Onboarding
1. Setup: `/plan` for new or existing projects
2. First feature: `/create-spec` → `/create-tasks` → `/implement` → `/sync-docs`
3. Establish rhythm: Repeat spec-driven development cycle

### Maintenance and Updates
1. Update project context: Re-run `/plan` when tech stack or structure changes
2. Update documentation: Run `/sync-docs` to catch up on undocumented changes
3. Refactor workflows: Use specs to plan and track refactoring work

## MCP Server Implementation Notes

### Tool Registration
Each command will be registered as an MCP tool with:
- Clear parameter definitions
- Input validation schemas  
- Output format specifications
- Error handling capabilities

### Resource Management
Commands will register MCP resources for:
- Active spec context
- Task progress tracking
- Documentation state
- Project configuration

### Agent Integration
GitHub Copilot agents will use commands through:
- Structured tool calls
- Context-aware prompting
- Progress tracking integration
- Error handling and recovery