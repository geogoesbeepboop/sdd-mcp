# Command: /create-tasks

## Goal
Transform a specification into an ordered, implementable task list that serves as the execution checklist for the /implement command.

## User Interaction Flow
1. Load the active spec (or ask which spec to use)
2. Analyze spec to identify discrete implementation units
3. Generate ordered task list with clear dependencies
4. Confirm task breakdown with user

## Inputs Required
- `spec_folder`: Active spec or user-specified SPEC-YYYYMMDD-slug
- `implementation_approach`: frontend-first | backend-first | full-stack-parallel
- `task_granularity`: fine (30min-2hr tasks) | medium (2-4hr) | coarse (4-8hr)

## Outputs Generated
- `specs/SPEC-*/tasks.md`: Ordered task list with checkboxes and implementation details

## Instructions for Copilot

### Step 1: Detect Context

1. **Validate active spec:**
   - Check `.github/context.md` for ACTIVE_SPEC
   - If ACTIVE_SPEC is "none" or missing, list available specs in `specs/` directory
   - If no specs exist, suggest: "No specs found. Run /create-spec to create your first specification."

2. **Load spec information:**
   - Load the active spec's `lite.md` for efficient processing
   - If lite.md doesn't exist, fall back to `spec.md`
   - Extract key information: feature name, technical scope, acceptance criteria

3. **Check for existing tasks:**
   - Look for existing `tasks.md` in the spec folder
   - If exists, ask: "Tasks already exist for this spec. Do you want to: (a) recreate tasks, (b) modify existing tasks, or (c) view current progress?"

### Step 2: Gather Information

1. **Confirm spec and approach:**
   - "I found spec: [SPEC-name]. Should I create tasks for this spec?"
   - "What's your implementation approach?"
     - **Backend-first**: Database → API → Frontend
     - **Frontend-first**: UI mockups → API contracts → Backend  
     - **Parallel**: Frontend and backend development simultaneously
     - **Risk-first**: Tackle uncertain/complex parts first

2. **Determine task granularity:**
   - "How granular should tasks be?"
     - **Fine (30min-2hr)**: Individual functions, single components
     - **Medium (2-4hr)**: Complete features, full API endpoints
     - **Coarse (4-8hr)**: Major subsystems, complete user flows
   
3. **Identify constraints and preferences:**
   - "Any specific ordering preferences or dependencies I should know about?"
   - "Are there any blockers or external dependencies (APIs, services, approvals)?"
   - "Should any tasks be done by specific team members or require special skills?"

### Step 3: Process and Validate

1. **Analyze spec requirements and break into task categories:**
   - **Setup tasks**: Database migrations, config files, environment setup, boilerplate code
   - **Core feature tasks**: Main business logic, primary user flows, core functionality
   - **Integration tasks**: API connections, service communication, data flow
   - **Testing tasks**: Unit tests, integration tests, validation
   - **Polish tasks**: Error handling, edge cases, performance optimization
   - **Documentation tasks**: Code comments, API docs, user guides

2. **Generate effort estimates:**
   - Use granularity preference to estimate task duration
   - Consider team skill level and familiarity with tech stack
   - Add buffer for testing and debugging (typically 25-50% of development time)
   - Flag tasks that might require external dependencies or approvals

3. **Order tasks by priority:**
   - **Dependencies first**: What must be built before other tasks can start
   - **Risk management**: Tackle uncertain or complex parts early 
   - **Value delivery**: Core user path before edge cases and polish
   - **Parallel opportunities**: Identify tasks that can be worked on simultaneously

4. **Validate task breakdown:**
   - Ensure every acceptance criteria from spec is covered
   - Check that technical scope items are addressed
   - Verify no task is too large (should be completable in estimated timeframe)
   - Confirm dependencies are logical and necessary

### Step 4: Generate Output

1. **Create tasks.md file:**
   - Generate comprehensive task list in spec folder
   - Include overview with approach, effort estimate, and status
   - Organize tasks by phases with clear dependencies
   - Provide implementation order guidelines

2. **Validate task file:**
   - Ensure all tasks have required fields (file, action, details, acceptance)
   - Verify effort estimates add up reasonably
   - Check that dependencies are clearly marked
   - Confirm task numbering and formatting is consistent

3. **Update project tracking:**
   - Note in `.github/context.md` that tasks have been created
   - Update LAST_UPDATED timestamp

4. **Report completion:**
   - List total number of tasks created
   - Show estimated total effort
   - Highlight any high-risk or complex tasks
   - Suggest next step: "Tasks created successfully. Use /implement to start execution."

## File Templates

### tasks.md
```markdown
# Implementation Tasks: [Feature Name]

## Overview
Spec: SPEC-YYYYMMDD-slug
Approach: [backend-first|frontend-first|parallel]
Estimated effort: [X hours]
Status: IN_PROGRESS

## Tasks

### Phase 1: Foundation
- [ ] **Task 1.1**: [Task name]
  - **File**: `repos/[repo]/[file-path]`
  - **Action**: [Create|Modify|Delete]
  - **Estimate**: [duration in hours]
  - **Details**: [Specific implementation details]
  - **Acceptance**: [How to verify completion]
  - **Dependencies**: [List of task IDs that must complete first]
  - **Risks**: [Potential blockers or challenges]

- [ ] **Task 1.2**: [Database setup]
  - **File**: `repos/backend/migrations/[file]`
  - **Action**: Create migration
  - **Estimate**: [duration in hours]
  - **Details**: Add table/fields as per database.md specification
  - **Acceptance**: Migration runs successfully and creates expected schema
  - **Dependencies**: None
  - **Risks**: Schema conflicts with existing tables

### Phase 2: Core Implementation
- [ ] **Task 2.1**: [API endpoint implementation]
  - **File**: `repos/backend/routes/[feature].js`
  - **Action**: Create
  - **Estimate**: [duration in hours]
  - **Details**: Implement [POST /api/feature] with validation and error handling
  - **Acceptance**: Endpoint responds correctly to test payload and handles edge cases
  - **Dependencies**: Task 1.2 (database schema ready)
  - **Risks**: Complex validation requirements or authentication integration

- [ ] **Task 2.2**: [Business logic service]
  - **File**: `repos/backend/services/[feature]Service.js`
  - **Action**: Create
  - **Estimate**: [duration in hours]
  - **Details**: Implement core business logic for [requirement]
  - **Acceptance**: Unit tests pass with >90% coverage
  - **Dependencies**: Task 1.2 (database access needed)
  - **Risks**: Complex business rules or external service dependencies

### Phase 3: Frontend
- [ ] **Task 3.1**: [UI Component]
  - File: `repos/frontend/components/[Feature].jsx`
  - Action: Create
  - Details: Build component with [specific requirements]
  - Dependencies: Task 2.1 (API ready)
  - Acceptance: Component renders and handles user input

### Phase 4: Integration
- [ ] **Task 4.1**: [Connect frontend to API]
  - File: `repos/frontend/api/[feature]Api.js`
  - Action: Create
  - Details: API client functions
  - Acceptance: Data flows correctly between frontend and backend

### Phase 5: Polish
- [ ] **Task 5.1**: [Error handling]
  - Files: Multiple (list main ones)
  - Action: Enhance
  - Details: Add proper error messages and recovery
  - Acceptance: All error cases handled gracefully

- [ ] **Task 5.2**: [Update documentation]
  - File: `docs/api.md`
  - Action: Update
  - Details: Document new endpoints
  - Acceptance: Docs reflect new functionality

## Implementation Order
1. Start with: Task 1.1, 1.2 (can be parallel)
2. Then: Tasks 2.1, 2.2 (sequential)
3. Then: Tasks 3.1, 4.1 (sequential)
4. Finally: Tasks 5.1, 5.2 (can be parallel)

## Notes
- [Any special considerations]
- [Known challenges or risks]

## Progress Tracking
- Created: [Date]
- Last Updated: [Date]
- Status: NOT_STARTED
- Completed: 0/[total] tasks
- Total Estimated Effort: [X hours]
- Remaining Effort: [X hours]

## Risk Assessment
- **High Risk Tasks**: [List task IDs with significant uncertainty]
- **External Dependencies**: [List tasks requiring outside resources]
- **Critical Path**: [List task IDs that could block overall progress]

## Error Handling and Edge Cases

### Common Issues and Solutions

1. **No Active Spec Found**
   - Context shows ACTIVE_SPEC as "none"
   - Solution: List available specs, ask user to choose or create new spec

2. **Spec File Missing or Corrupted**
   - lite.md or spec.md cannot be loaded
   - Solution: Try alternative file, ask user to verify spec integrity

3. **Overly Complex Spec**
   - Spec contains too many requirements for manageable task breakdown
   - Solution: Suggest breaking into multiple specs or phases

4. **Unclear Technical Scope**
   - Spec doesn't provide enough technical detail for task creation
   - Solution: Ask clarifying questions, suggest updating spec

5. **Conflicting Dependencies**
   - Task dependencies create circular references or logical conflicts
   - Solution: Identify conflicts, ask user to clarify priorities

### Validation Failures

- **Task too large**: Individual task exceeds chosen granularity maximum
- **Missing files**: Cannot identify where implementation should go
- **Duplicate work**: Tasks overlap significantly with each other
- **Unrealistic estimates**: Total effort seems disproportionate to spec scope

### File Creation Issues

- **Permission errors**: Cannot write to spec folder
- **Existing tasks file**: Handle overwrites and merges carefully
- **Invalid file paths**: Repository paths referenced in spec don't exist

### Recovery Actions

- If task creation fails: preserve partial work, allow user to resume
- For dependency conflicts: provide visualization of task relationships
- For unclear requirements: generate tasks with placeholders and flag for review
- Always validate generated tasks before finalizing