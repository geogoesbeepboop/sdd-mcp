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

1. **Check project readiness:**
   - Verify `.github/product.md` exists (if not, suggest running /plan first)
   - Load product information for context
   - Note current date for SPEC-YYYYMMDD format
   - Check if `specs/` directory exists (create if needed)

2. **Check for existing active spec:**
   - Load `.github/context.md` to see if there's already an ACTIVE_SPEC
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
   - Cross-reference with existing architecture (docs/architecture.md)
   - Check for conflicts with existing features or specs
   - Ensure proposed technical changes are feasible with current tech stack
   - Flag any dependencies on external systems or unbuilt features

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

3. **Validate and confirm:**
   - Verify all files were created successfully
   - Check that lite.md is under token limit
   - Ensure spec folder structure is correct
   - Confirm context file was updated

4. **Report completion:**
   - List all created files
   - Show the new ACTIVE_SPEC setting
   - Suggest next step: "Spec created successfully. Use /create-tasks to break this into implementable tasks."

## File Templates

### spec.md
```markdown
# Feature: [Feature Name]

## Problem Statement
[2-3 sentences describing the problem and who experiences it]

## Solution Overview
[Brief description of the proposed solution]

## User Stories
- As a [type of user], I want [goal], so that [benefit]
- As a [type of user], I want [goal], so that [benefit]

## Acceptance Criteria
- [ ] Given [context], when [action], then [outcome]
- [ ] System validates [what] and returns [what] when [condition]
- [ ] User can [action] and sees [result]
- [ ] Performance: [metric] completes within [threshold]

## Technical Requirements

### API Changes
[List endpoints with methods, paths, request/response shapes]

### Database Changes
[Table modifications, new fields, relationships]

### UI/UX Changes
[Screens, components, interactions]

## Edge Cases & Error Handling
- [Scenario]: [How system responds]
- [Error case]: [Error message and recovery]

## Dependencies
- Requires: [Other features or systems]
- Blocks: [What depends on this]

## Out of Scope
- [Explicitly what we're NOT doing]

## Success Metrics
- [Measurable outcome with target]
- [User behavior that indicates success]

## Implementation Notes
[Any technical decisions or constraints]

## Status
- Created: YYYY-MM-DD
- Status: DRAFT
- Last Updated: YYYY-MM-DD

### lite.md
```markdown
# [Feature Name]

## Core Requirement
[1-2 sentences, the absolute essence]

## Must Implement
1. [Critical requirement - specific and actionable]
2. [Critical requirement - specific and actionable]
3. [Critical requirement - specific and actionable]

## Technical Changes
- API: [endpoint + method + purpose]
- DB: [table.field + change type]
- UI: [component/screen + action]

## Success Checklist
- [ ] [Single most important validation]
- [ ] [Secondary validation]
```

## Error Handling and Edge Cases

### Common Issues and Solutions

1. **Project Not Initialized**
   - Missing `.github/product.md`
   - Solution: "Your project isn't configured for spec-driven development. Please run /plan first."

2. **Invalid Feature Name**
   - Contains special characters or is too generic
   - Solution: Suggest alternatives, ask for clarification

3. **Conflicting Spec Names**
   - Folder SPEC-YYYYMMDD-slug already exists
   - Solution: Append incrementing number or ask for different name

4. **Incomplete Information**
   - User provides vague or incomplete requirements
   - Solution: Ask follow-up questions, provide examples

5. **Technical Conflicts**
   - Proposed changes conflict with existing architecture
   - Solution: Explain conflicts, suggest alternatives

### Validation Failures

- **Empty problem statement**: Must provide clear problem description
- **No acceptance criteria**: Must provide measurable success conditions
- **Missing technical scope**: Must identify what parts of system will change
- **Unrealistic timeline**: Warn if scope seems too large for single spec

### File Creation Issues

- **Permission errors**: Cannot create specs/ directory or files
- **Disk space**: Not enough space for files
- **Existing files**: Handle overwrites carefully

### Recovery Actions

- If spec creation fails partway: clean up partial files
- Provide clear error messages with suggested fixes
- Allow user to retry with corrections
- Never leave project in inconsistent state