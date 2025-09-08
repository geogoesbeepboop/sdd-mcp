# Command: /create-spec

## Goal
Transform user requirements into a structured specification with both full (spec.md) and lite (lite.md) versions, establishing the foundation for spec driven development.

## User Interaction Flow
1. Check project readiness (must have product.md from /plan)
2. Gather feature requirements through conversational discovery
3. Validate and structure the collected information
4. Generate both full and lite specification documents  
5. Update project context to point to new active spec
6. Confirm spec creation and suggest next steps

## Inputs Required
- `feature_name`: Short descriptive name for the feature
- `problem_statement`: What problem this solves
- `user_stories`: Who needs this and why
- `acceptance_criteria`: How we know it's working
- `technical_scope`: What's the high level overview of the parts of the project that will be affected

## Outputs Generated
- `specs/SPEC-YYYYMMDD-{slug}/spec.md`: Full canonical specification
- `specs/SPEC-YYYYMMDD-{slug}/lite.md`: Token-optimized version of spec.md
- `specs/SPEC-YYYYMMDD-{slug}/api.md`: API changes (if applicable)
- `specs/SPEC-YYYYMMDD-{slug}/database.md`: Database changes (if applicable)
- `specs/SPEC-YYYYMMDD-{slug}/design.md`: UI/UX requirements (if applicable)
- `.github/context.md`: Updated with new active spec

## Instructions for Copilot

### Step 1: Detect Context

**Follow the context-fetcher strategy from agents/context-fetcher.md:**

1. **Check project readiness:**
   - Verify `.github/product.md` exists (if not, suggest running /plan first)
   - Auto-fetch foundation documents: `.github/product.md`, `.github/best-practices.md`, `.github/context.md`
   - Note current date for SPEC-YYYYMMDD format
   - Check if `specs/` directory exists (create if needed)

2. **Load project context following smart fetching rules:**
   - **Always fetch**: Foundation documents (product.md, best-practices.md, context.md)
   - **Contextually fetch**: Based on feature type mentioned by user
     - If API-related feature: Load `docs/api.md`
     - If data/schema feature: Load `docs/database.md`
     - If architectural change: Load `docs/architecture.md`
     - If UI/design feature: Load `docs/design.md`
   - **Never re-fetch**: Documents already in conversation history

3. **Check for existing active spec:**
   - From loaded `.github/context.md`, check if there's already an ACTIVE_SPEC
   - If active spec exists, ask: "You have an active spec [name]. Do you want to: (a) create a new spec, (b) modify existing spec, or (c) complete current spec first?"

### Step 2: Gather Information

Start conversational discovery:
1. "What feature are we building? Give me a short name and description."
2. "What problem does this solve? Who's asking for it?"
3. "Walk me through how a user would use this feature - what's the happy path?"
4. "What are the edge cases or error scenarios we need to handle?"
5. "What needs to change in the system? (API endpoints, database, UI)"
6. "How do we measure success? What metrics or behaviors indicate it's working?"

For technical changes, drill deeper:
- If API changes: "What endpoints? Request/response shapes?"
- If database changes: "New tables or modifications? What fields?"
- If UI changes: "What screens/components? Any specific design requirements?"

### Step 3: Process and Validate

1. **Synthesize and structure information:**
   - Create clear user stories from problem statement
   - Extract measurable acceptance criteria from requirements
   - Identify all system touchpoints and affected components
   - Generate a URL-friendly slug from feature name (lowercase, hyphens, no special chars)

2. **Validate completeness:**
   - Ensure feature name is descriptive and unique
   - Confirm problem statement clearly defines the issue and users affected
   - Verify acceptance criteria are testable and specific
   - Check technical scope covers all necessary changes
   - Validate that requirements align with product mission (from product.md)

3. **Technical validation:**
   - Cross-reference with existing architecture (from loaded docs/architecture.md if available)
   - Check for conflicts with existing features or specs
   - Ensure proposed technical changes align with tech stack and best practices (from loaded foundation docs)
   - Flag any dependencies on external systems or unbuilt features
   - Validate against coding patterns and architectural decisions from best-practices.md

4. **Generate spec identifiers:**
   - Format: SPEC-YYYYMMDD-[slug]
   - Ensure folder name doesn't already exist
   - If conflict, append incrementing number: SPEC-YYYYMMDD-[slug]-2

### Step 4: Generate Output

1. **Create spec directory and files:**
   - Create folder `specs/SPEC-YYYYMMDD-{slug}/`
   - Generate `spec.md` with complete specification
   - Generate `lite.md` with condensed version (under 1200 tokens)
   - Create additional files as needed: `api.md`, `database.md`, `design.md`

2. **Update project context:**
   - Update `.github/context.md` with new ACTIVE_SPEC
   - Set LAST_UPDATED to current date
   - Add spec to project tracking

3. **Validate specification quality:**
   - **Specificity Check**: Ensure spec contains project-specific details, not generic placeholders
   - **Alignment Check**: Validate technical requirements align with loaded architecture and best practices
   - **Completeness Check**: Confirm all acceptance criteria are testable and specific
   - **Feasibility Check**: Verify proposed changes are realistic with current tech stack
   - **Quality Score**: Rate spec on specificity, alignment, completeness, and feasibility (minimum 3/5 on each)

4. **Validate and confirm files:**
   - Verify all files were created successfully
   - Check that lite.md is under 1200 tokens and captures essential requirements
   - Ensure spec folder structure follows project conventions
   - Confirm context file was updated with new ACTIVE_SPEC

5. **Report completion with quality assessment:**
   - List all created files with brief quality indicators
   - Show the new ACTIVE_SPEC setting
   - Report quality scores if any areas need improvement
   - Provide context fetching guidance: "Foundation docs remain loaded. Technical docs will be fetched on-demand during implementation."
   - Suggest next step: "Spec created successfully. Use /create-tasks to break this into implementable tasks."

## File Templates

### spec.md
```markdown
# Feature: [Feature Name]

## Problem Statement
[2-3 sentences describing the specific problem, who experiences it, and the business impact]
**Context**: [Reference relevant sections from loaded product.md mission/vision]

## Solution Overview
[Detailed description of the proposed solution and how it aligns with product roadmap]
**Architecture Alignment**: [Reference architectural patterns from loaded docs]

## User Stories
- As a [specific user type from product.md], I want [detailed goal], so that [specific business benefit]
- As a [specific user type from product.md], I want [detailed goal], so that [specific business benefit]
- As a [specific user type from product.md], I want [detailed goal], so that [specific business benefit]

## Acceptance Criteria
- [ ] **Core Functionality**: Given [specific context], when [precise action], then [measurable outcome]
- [ ] **Data Validation**: System validates [specific input] using [validation rules] and returns [error response] when [condition]
- [ ] **User Experience**: User can [specific action] and sees [detailed UI feedback] within [time requirement]
- [ ] **Performance**: [Specific metric] completes within [threshold] for [load conditions]
- [ ] **Error Handling**: When [error scenario] occurs, system [specific response] and user sees [recovery options]
- [ ] **Integration**: [Feature] integrates with [existing systems] maintaining [consistency requirements]

## Technical Requirements

### API Changes
[Based on loaded api.md patterns and best-practices.md standards]
- **Endpoint**: `[METHOD] /api/[resource]` 
  - **Purpose**: [Specific functionality]
  - **Request**: [Detailed request format following project patterns]
  - **Response**: [Detailed response format following project patterns]
  - **Authentication**: [Auth requirements based on existing patterns]
  - **Validation**: [Input validation rules based on best-practices.md]

### Database Changes
[Based on loaded database.md patterns and existing schema]
- **Table**: `[table_name]`
  - **Fields**: [Specific fields with types and constraints]
  - **Relationships**: [Foreign keys and associations]
  - **Indexes**: [Performance indexes needed]
  - **Migration**: [Migration strategy and rollback plan]

### UI/UX Changes
[Based on loaded design.md patterns if available]
- **Components**: [Specific components following design system]
- **User Flow**: [Detailed user interaction flow]
- **Responsive Design**: [Mobile/desktop considerations]
- **Accessibility**: [A11y requirements]

### Code Changes
[Based on loaded best-practices.md and architecture.md]
- **Services**: [Business logic services to create/modify]
- **Controllers**: [API controllers following project patterns]
- **Models**: [Data models and validation]
- **Tests**: [Testing strategy following project conventions]

## Edge Cases & Error Handling
[Following error handling patterns from best-practices.md]
- **[Specific Scenario]**: System [specific response] and logs [details] using [logging pattern]
- **[Error Case]**: User sees [specific error message] with [recovery options]
- **[Boundary Condition]**: System [handles gracefully] and [maintains data integrity]

## Dependencies
- **Technical**: [Specific technical dependencies and versions]
- **Business**: [Other features or approvals required]  
- **External**: [Third-party services or APIs]
- **Blocks**: [What specifically depends on this feature]

## Out of Scope
- [Explicitly what we're NOT doing in this spec]
- [Future enhancements that are separate specs]
- [Related features that have different requirements]

## Success Metrics
[Measurable outcomes tied to product goals from product.md]
- **Usage**: [Specific user behavior metrics with targets]
- **Performance**: [Technical performance metrics]
- **Business Impact**: [Business metrics that indicate success]

## Implementation Notes
[Technical decisions based on loaded architecture and constraints]
- **Architecture Decisions**: [Why specific approaches were chosen]
- **Performance Considerations**: [Scalability and optimization notes]
- **Security Considerations**: [Security implications and mitigations]

## Context References
- **Product Mission**: [Relevant aspects from product.md]
- **Technical Constraints**: [Relevant aspects from architecture.md]
- **Coding Standards**: [Relevant patterns from best-practices.md]

## Status
- **Created**: YYYY-MM-DD
- **Status**: DRAFT
- **Last Updated**: YYYY-MM-DD
- **Quality Score**: [Specificity/Alignment/Completeness/Feasibility scores]

### lite.md
```markdown
# [Feature Name]

## Core Requirement
[1-2 sentences capturing the essence, referencing user type from product.md]

## Must Implement
1. **[Core Feature]**: [Specific requirement following best-practices.md patterns]
2. **[Critical Integration]**: [Integration requirement based on architecture.md]
3. **[Essential Validation]**: [Validation requirement following project standards]

## Technical Changes
[Following patterns from loaded technical docs]
- **API**: `[METHOD] /api/[resource]` - [purpose] (follows [auth pattern])
- **DB**: `[table].[field]` - [change type] with [constraints]
- **UI**: `[component/screen]` - [action] following [design pattern]
- **Service**: `[service name]` - [business logic] with [error handling]

## Success Checklist
- [ ] **Primary Value**: [Single most important user outcome]
- [ ] **Technical Integration**: [Critical system integration works]
- [ ] **Quality Gates**: [Performance/security/validation passes]

## Context
- **Aligns with**: [Relevant product.md mission aspect]
- **Uses**: [Key technical patterns from best-practices.md]
- **Extends**: [Existing architecture components]
```