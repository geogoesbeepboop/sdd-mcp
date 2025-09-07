# Command: /sync-docs

## Goal
Update project-level documentation in docs/ to reflect newly implemented features, ensuring documentation stays current with the codebase.

## User Interaction Flow
1. Analyze completed specs and their implementations
2. Identify documentation that needs updating
3. Generate updates for relevant doc files
4. Confirm changes with user

## Inputs Required
- `scope`: current-spec | all-completed | specific-file
- `doc_targets`: Which docs to update (api, database, architecture, design)
- `update_mode`: append | merge | regenerate

## Outputs Generated
- Updated `docs/api.md` with new endpoints
- Updated `docs/database.md` with schema changes
- Updated `docs/architecture.md` with new components
- Updated `docs/design.md` with UI patterns (if applicable)

## Instructions for Copilot

### Step 1: Detect Context

1. **Determine documentation scope:**
   - Check `.github/context.md` for ACTIVE_SPEC
   - If ACTIVE_SPEC specified, focus on current spec
   - If user requested "all-completed", scan all specs with completed tasks
   - If no specs have completed tasks, suggest running /implement first

2. **Analyze implementation status:**
   - For each target spec, load `tasks.md`
   - Identify tasks marked as completed (checked boxes)
   - Extract what was actually built vs. what was planned
   - Note any deviations or additional work mentioned in task notes

3. **Load existing documentation:**
   - Read current `docs/api.md`, `docs/database.md`, `docs/architecture.md`, `docs/design.md`
   - Identify existing content structure and patterns
   - Note last update timestamps and what specs contributed to each doc

### Step 2: Gather Information

1. **Confirm scope and approach:**
   - "I found [X] specs with completed implementations. Should I update docs for:"
     - **Current spec only**: [SPEC-name] ([Y] completed tasks)
     - **All completed specs**: [list of specs with completion counts]
     - **Specific specs**: Let me choose which ones

2. **Identify documentation changes:**
   - Analyze completed tasks to extract:
     - **API changes**: New endpoints, modified routes, authentication changes
     - **Database changes**: New tables, schema modifications, migrations
     - **Architecture changes**: New services, changed patterns, integrations
     - **UI/Design changes**: New components, design patterns, user flows

3. **Present update plan:**
   ```
   Found changes to document:
   
   📡 API: [X] new endpoints, [Y] modifications from [specs]
   🗄️  Database: [X] new tables, [Y] schema changes from [specs] 
   🏗️  Architecture: [X] new components, [Y] pattern changes from [specs]
   🎨 Design: [X] new UI components, [Y] design updates from [specs]
   ```

4. **Confirm update strategy:**
   - "Which documentation should I update? (api/database/architecture/design/all)"
   - "How should I handle updates?"
     - **Merge**: Add new content, preserve existing (recommended)
     - **Append**: Add new sections at the end
     - **Regenerate**: Rebuild entire document from scratch (destructive)


### Step 3: Process and Validate

1. **Extract implementation details:**
   - **API changes**: Parse completed tasks for new endpoints, routes, authentication
     - Extract HTTP methods, paths, request/response formats
     - Identify middleware, validation, error handling patterns
     - Note any breaking changes or version impacts
   
   - **Database changes**: Analyze completed migrations and schema tasks
     - New tables with full schema definitions
     - Modified columns, indexes, relationships
     - Data migration notes and constraints
   
   - **Architecture changes**: Identify new services, components, patterns
     - New service boundaries and responsibilities
     - Changed communication patterns
     - Integration points and dependencies
   
   - **Design changes**: Extract UI components and user experience updates
     - New components with props and usage
     - Design system updates
     - User flow changes

2. **Validate content quality:**
   - Ensure all information comes from completed tasks only
   - Cross-reference with actual implementation files when possible
   - Check for consistency with existing documentation style
   - Verify technical accuracy of extracted information

3. **Resolve conflicts and duplications:**
   - Identify overlapping content with existing docs
   - Handle conflicts between different specs
   - Merge related changes logically
   - Preserve important existing content

### Step 4: Generate Output

1. **Update documentation files:**
   - **Merge strategy**: Integrate new content into existing structure
     - Add new sections while preserving existing ones
     - Update modified sections with clear change markers
     - Maintain consistent formatting and style
   
   - **Append strategy**: Add new content at document end
     - Create clearly marked new sections
     - Include spec attribution and date stamps
     - Maintain logical document flow
   
   - **Regenerate strategy**: Rebuild complete document
     - Include all historical and new content
     - Apply consistent structure and formatting
     - Archive previous version for reference

2. **Add traceability information:**
   - Mark new content with spec source: `*Added: YYYY-MM-DD from SPEC-YYYYMMDD-slug*`
   - Include completion timestamps
   - Note any assumptions or limitations
   - Reference related tasks or implementations

3. **Validate updated documentation:**
   - Check that all targeted changes are included
   - Verify formatting and structure consistency
   - Ensure no broken references or links
   - Confirm readability and logical flow

4. **Update project tracking:**
   - Note documentation updates in `.github/context.md`
   - Update LAST_UPDATED timestamp
   - Track which specs have been documented

5. **Report completion:**
   ```
   📚 Documentation Sync Complete
   ============================
   Updated from: [list of specs]
   
   Files Updated:
   ✓ docs/api.md - Added [X] endpoints, updated [Y] sections
   ✓ docs/database.md - Added [X] tables, [Y] modifications
   ✓ docs/architecture.md - Added [X] components
   
   Files Unchanged:
   - docs/design.md - No UI changes in processed specs
   
   Next Steps:
   - Review updated documentation for accuracy
   - Consider running /plan to update roadmap
   - Ready to create next spec with /create-spec

## Error Handling and Edge Cases

### Common Issues and Solutions

1. **No Completed Implementations**
   - No specs have tasks marked as completed
   - Solution: "No completed implementations found. Run /implement to complete some tasks first."

2. **Missing Documentation Files**
   - Target doc files don't exist in docs/ directory
   - Solution: Create missing files with appropriate templates from /plan

3. **Inconsistent Task Completion**
   - Tasks marked complete but implementation details are unclear
   - Solution: Ask for clarification, suggest reviewing task completion

4. **Conflicting Documentation**
   - Multiple specs make conflicting changes to same documentation
   - Solution: Present conflicts, ask user to prioritize or resolve

5. **Large Documentation Updates**
   - Too many changes to process efficiently
   - Solution: Suggest updating in phases, prioritize critical changes

### Content Extraction Issues

- **Incomplete task information**: Tasks lack sufficient detail to generate docs
- **Technical inconsistencies**: Implementation doesn't match spec description
- **Missing context**: Cannot understand relationship between changes
- **Outdated information**: Existing docs contain obsolete information

### File Management Issues

- **Permission errors**: Cannot write to docs/ directory
- **Concurrent edits**: Documentation files modified during sync
- **Backup failures**: Cannot preserve existing content before updates
- **Large file sizes**: Documentation files too large to process efficiently

### Quality and Validation Issues

- **Inaccurate content**: Generated documentation doesn't reflect actual implementation
- **Formatting problems**: Updated docs have inconsistent structure
- **Broken references**: Links or cross-references become invalid
- **Style inconsistencies**: New content doesn't match existing documentation style

### Recovery Actions

- **Partial sync failures**: Complete what's possible, report what failed
- **Content conflicts**: Preserve both versions, mark for manual resolution
- **Validation failures**: Generate docs with warnings, suggest manual review
- **Permission issues**: Suggest alternative output locations or fix permissions

### Sync Strategy Recommendations

- **For first-time sync**: Use regenerate strategy for clean, consistent docs
- **For incremental updates**: Use merge strategy to preserve existing content  
- **For major changes**: Use append strategy to clearly show what's new
- **For conflicting updates**: Generate separate sections, ask user to merge
   ```

## File Templates

### api.md updates
```markdown
# API Documentation

## Existing Endpoints
[Keep existing content]

## [Feature Name] Endpoints
*Added: YYYY-MM-DD from SPEC-YYYYMMDD-slug*

### POST /api/feature
Creates a new feature instance.

**Request:**
```json
{
  "field1": "string",
  "field2": "number"
}
Response:
json{
  "success": true,
  "data": {
    "id": "string",
    "field1": "string"
  }
}
Errors:

400: Invalid input
401: Unauthorized


### database.md updates
```markdown
# Database Schema

## Existing Tables
[Keep existing content]

## [Feature] Tables
*Added: YYYY-MM-DD from SPEC-YYYYMMDD-slug*

### table_name
| Column | Type | Constraints | Description |
|--------|------|------------|-------------|
| id | UUID | PRIMARY KEY | Unique identifier |
| field_name | VARCHAR(255) | NOT NULL | Description |
| created_at | TIMESTAMP | NOT NULL | Creation timestamp |

**Relationships:**
- Foreign key to `other_table.id`

**Indexes:**
- `idx_table_field` on (field_name)
architecture.md updates
markdown# System Architecture

## Existing Components
[Keep existing content]

## [Feature Name] Components
*Added: YYYY-MM-DD from SPEC-YYYYMMDD-slug*

### Service: FeatureService
- **Location**: `repos/backend/services/featureService.js`
- **Purpose**: Handles business logic for feature
- **Dependencies**: DatabaseService, AuthService
- **Exposed Methods**:
  - `process(data)`: Main processing logic
  - `validate(input)`: Input validation

### Data Flow
1. User request → API endpoint
2. Validation middleware
3. FeatureService processing
4. Database operation
5. Response formatting
After Sync Summary
markdownDocumentation Sync Complete
==========================
Updated from: SPEC-YYYYMMDD-slug

Files Updated:
✓ docs/api.md - Added 3 endpoints
✓ docs/database.md - Added 2 tables
✓ docs/architecture.md - Added FeatureService

Files Unchanged:
- docs/design.md - No UI changes in this spec

Next Steps:
- Review the updated documentation
- Run /plan to update roadmap if needed
- Create next spec with /create-spec