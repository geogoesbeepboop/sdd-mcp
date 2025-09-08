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

**Follow the context-fetcher strategy from agents/context-fetcher.md:**

1. **Validate project state and active spec:**
   - Auto-fetch foundation documents: `.github/context.md`, `.github/product.md`, `.github/best-practices.md`
   - From loaded context.md, check ACTIVE_SPEC
   - If ACTIVE_SPEC is "none" or missing, list available specs in `specs/` directory
   - If no specs exist, suggest: "No specs found. Run /create-spec to create your first specification."

2. **Load spec and contextual documentation:**
   - Load the active spec's `lite.md` for efficient processing (spec-specific fetching)
   - If lite.md doesn't exist, fall back to `spec.md`
   - **Contextually fetch** relevant technical docs based on spec content:
     - If spec involves API work: Load `docs/api.md` for endpoint patterns
     - If spec involves database: Load `docs/database.md` for schema patterns  
     - If spec involves architecture changes: Load `docs/architecture.md` for component patterns
     - If spec involves UI/design: Load `docs/design.md` for component patterns
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

1. **Analyze spec requirements using loaded context and break into task categories:**
   - **Setup tasks**: Database migrations (following patterns from loaded database.md), config files, environment setup, boilerplate code (following best-practices.md patterns)
   - **Core feature tasks**: Main business logic (following architecture.md patterns), primary user flows, core functionality aligned with product.md mission
   - **Integration tasks**: API connections (following api.md patterns), service communication (following architecture.md patterns), data flow
   - **Testing tasks**: Unit tests, integration tests, validation (following testing patterns from best-practices.md)
   - **Polish tasks**: Error handling (following patterns from best-practices.md), edge cases, performance optimization
   - **Documentation tasks**: Code comments, API docs updates, user guides

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

4. **Validate task breakdown using loaded context:**
   - Ensure every acceptance criteria from spec is covered by specific tasks
   - Check that technical scope items are addressed using patterns from loaded technical docs
   - Verify implementation approach aligns with loaded architecture.md and best-practices.md
   - Confirm no task is too large (should be completable in estimated timeframe)
   - Validate dependencies are logical, necessary, and follow architectural patterns
   - Check that error handling and testing tasks follow loaded best-practices.md patterns

### Step 4: Generate Output

1. **Create tasks.md file:**
   - Generate comprehensive task list in spec folder
   - Include overview with approach, effort estimate, and status
   - Organize tasks by phases with clear dependencies
   - Provide implementation order guidelines

2. **Validate task quality:**
   - **Specificity Check**: Ensure tasks contain specific file paths and actions, not generic placeholders
   - **Context Alignment**: Validate tasks reference loaded technical patterns and architectural decisions
   - **Completeness Check**: Confirm all acceptance criteria are covered by specific tasks
   - **Feasibility Check**: Verify task breakdown is realistic with loaded tech stack and best practices
   - **Quality Score**: Rate tasks on specificity, alignment, completeness, and feasibility (minimum 3/5 on each)

3. **Validate task file structure:**
   - Ensure all tasks have required fields (file, action, details, acceptance)
   - Verify effort estimates add up reasonably and match selected granularity
   - Check that dependencies are clearly marked and follow logical sequence
   - Confirm task numbering and formatting is consistent with project standards

4. **Update project tracking:**
   - Note in `.github/context.md` that tasks have been created
   - Update LAST_UPDATED timestamp
   - Record which foundation and technical docs were used for task generation

5. **Report completion with quality assessment:**
   - List total number of tasks created by category (setup/core/integration/testing/polish/docs)
   - Show estimated total effort and breakdown by phase
   - Report quality scores and highlight any areas needing improvement
   - Highlight any high-risk or complex tasks with mitigation strategies
   - Provide context guidance: "Foundation docs remain loaded. Technical docs will be referenced during implementation."
   - Suggest next step: "Tasks created successfully. Use /implement to start execution."

## File Templates

### tasks.md
```markdown
# Implementation Tasks: [Feature Name]

## Overview
- **Spec**: SPEC-YYYYMMDD-slug
- **Approach**: [backend-first|frontend-first|parallel|risk-first]
- **Estimated Total Effort**: [X hours]
- **Status**: NOT_STARTED
- **Context Used**: [List of loaded technical docs: api.md, database.md, architecture.md, etc.]
- **Quality Score**: [Specificity/Alignment/Completeness/Feasibility scores]

## Foundation Documents Referenced
- **Product Context**: [Key aspects from product.md used for task alignment]
- **Technical Standards**: [Key patterns from best-practices.md applied]
- **Architecture**: [Key components from architecture.md referenced]
- **Integration Patterns**: [Key patterns from technical docs used]

## Tasks

### Phase 1: Foundation & Setup
- [ ] **Task 1.1**: [Environment/Configuration Setup]
  - **File**: `repos/[repo]/[config-path]`
  - **Action**: [Create|Modify] 
  - **Estimate**: [duration] hours
  - **Details**: [Specific configuration following best-practices.md patterns]
  - **Acceptance**: [How to verify completion with specific checks]
  - **Dependencies**: None
  - **Risks**: [Specific risks and mitigation plans]
  - **Best Practices**: [Reference specific patterns from loaded best-practices.md]

- [ ] **Task 1.2**: [Database Schema Changes]
  - **File**: `repos/[backend-repo]/migrations/[migration-file]`
  - **Action**: Create migration
  - **Estimate**: [duration] hours
  - **Details**: Add [specific tables/fields] following patterns from loaded database.md
  - **Acceptance**: Migration creates expected schema matching database.md patterns
  - **Dependencies**: None
  - **Risks**: Schema conflicts with existing tables, rollback strategy needed
  - **Best Practices**: [Reference migration patterns from loaded database.md]

### Phase 2: Core Implementation
- [ ] **Task 2.1**: [API Endpoint Implementation]
  - **File**: `repos/[backend-repo]/[controller-path]`
  - **Action**: Create
  - **Estimate**: [duration] hours
  - **Details**: Implement [specific endpoint] following api.md patterns and best-practices.md standards
  - **Acceptance**: Endpoint responds correctly and handles all cases from spec acceptance criteria
  - **Dependencies**: Task 1.2 (database schema ready)
  - **Risks**: [Specific integration challenges and error handling requirements]
  - **Best Practices**: [Reference API patterns from loaded api.md and error handling from best-practices.md]

- [ ] **Task 2.2**: [Business Logic Service]
  - **File**: `repos/[backend-repo]/services/[service-file]`
  - **Action**: Create
  - **Estimate**: [duration] hours
  - **Details**: Implement core business logic following architecture.md service patterns
  - **Acceptance**: Service passes all unit tests and integrates with existing architecture
  - **Dependencies**: Task 1.2 (data layer ready)
  - **Risks**: [Business rule complexity and external dependency issues]
  - **Best Practices**: [Reference service patterns from architecture.md and testing from best-practices.md]

### Phase 3: Frontend Implementation
- [ ] **Task 3.1**: [UI Component Creation]
  - **File**: `repos/[frontend-repo]/components/[FeatureComponent]`
  - **Action**: Create
  - **Estimate**: [duration] hours
  - **Details**: Build component following design.md patterns and best-practices.md standards
  - **Acceptance**: Component renders correctly and handles all user interactions from spec
  - **Dependencies**: Task 2.1 (API endpoint available)
  - **Risks**: [Complex state management or external component library integration]
  - **Best Practices**: [Reference component patterns from design.md and coding standards from best-practices.md]

- [ ] **Task 3.2**: [API Integration Layer]
  - **File**: `repos/[frontend-repo]/api/[feature]Api.js`
  - **Action**: Create
  - **Estimate**: [duration] hours
  - **Details**: API client functions following api.md response patterns
  - **Acceptance**: Data flows correctly between frontend and backend with proper error handling
  - **Dependencies**: Task 2.1 (API endpoints implemented)
  - **Risks**: [Network error handling and data transformation challenges]
  - **Best Practices**: [Reference API integration patterns from loaded technical docs]

### Phase 4: Polish & Documentation
- [ ] **Task 4.1**: [Enhanced Error Handling]
  - **Files**: [List specific files that need error handling enhancement]
  - **Action**: Enhance
  - **Estimate**: [duration] hours
  - **Details**: Implement comprehensive error handling following best-practices.md patterns
  - **Acceptance**: All error scenarios handled gracefully with appropriate user feedback
  - **Dependencies**: [Core implementation tasks completed]
  - **Risks**: [Complex error scenarios and recovery mechanisms]
  - **Best Practices**: [Reference error handling patterns from best-practices.md]

- [ ] **Task 4.2**: [Documentation Updates]
  - **File**: `docs/api.md` (and other relevant docs)
  - **Action**: Update
  - **Estimate**: [duration] hours
  - **Details**: Document new functionality maintaining consistency with existing doc patterns
  - **Acceptance**: Documentation is accurate, complete, and follows project documentation standards
  - **Dependencies**: All implementation tasks completed
  - **Risks**: [Documentation accuracy and completeness]
  - **Best Practices**: [Reference documentation patterns from foundation docs]

## Implementation Order
1. Start with: Task 1.1, 1.2 (sequential)
2. Then: Tasks 2.1, 2.2 (sequential)
3. Then: Tasks 3.1, 3,2 (sequential)
4. Finally: Tasks 4.1, 4.2 (sequential)

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