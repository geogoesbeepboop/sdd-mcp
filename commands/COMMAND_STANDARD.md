# Command Structure Standard

This document defines the standardized structure that all spec-driven development commands must follow.

## Required Sections

### 1. Header
```markdown
# Command: /[command-name]
```

### 2. Goal
```markdown
## Goal
[Single sentence describing what this command accomplishes]
```

### 3. User Interaction Flow
```markdown
## User Interaction Flow
1. [High-level step 1]
2. [High-level step 2]
3. [High-level step 3]
...
```

### 4. Inputs Required
```markdown
## Inputs Required
- `parameter_name`: Description and format/constraints
- `parameter_name_2`: Description and format/constraints
```

### 5. Outputs Generated
```markdown
## Outputs Generated
- `path/to/file.ext`: What this file contains and purpose
- `path/to/file2.ext`: What this file contains and purpose
```

### 6. Instructions for Copilot
```markdown
## Instructions for Copilot

### Step 1: Detect Context
[Systematic detection logic with validation checks]

### Step 2: Gather Information
[Information gathering approach with specific questions]

### Step 3: Process and Validate
[Information processing and validation requirements]

### Step 4: Generate Output
[Output generation with validation and completion reporting]
```

### 7. File Templates
```markdown
## File Templates

### template-name.ext
```[language]
[Complete template with placeholders]
```
```

### 8. Error Handling and Edge Cases
```markdown
## Error Handling and Edge Cases

### Common Issues and Solutions
1. **Issue Name**
   - Description of when this occurs
   - Solution: How to handle or resolve

### Validation Failures
- **Failure type**: Description and handling

### Recovery Actions
- How to recover from partial failures
- How to maintain consistency
```

## Consistency Requirements

### Context Management
- All commands must check `.github/context.md` for current state
- All commands must validate prerequisites before proceeding
- All commands must update context appropriately after completion

### Error Handling
- Must include comprehensive error scenarios
- Must provide clear resolution steps
- Must never leave project in inconsistent state

### Progress Tracking
- Commands that modify state must report what changed
- Commands must suggest logical next steps
- Commands must provide completion confirmation

### User Communication
- Questions must be specific and actionable
- Options must be clearly explained
- Progress must be visible and trackable

### File Operations
- Must validate file paths before operations
- Must handle permission and access errors
- Must preserve existing content when appropriate
- Must provide atomic operations where possible

## Validation Checklist

For each command, verify:

- [ ] Follows standard section structure
- [ ] Has comprehensive error handling
- [ ] Validates prerequisites and context
- [ ] Provides clear user interaction flow
- [ ] Includes complete file templates
- [ ] Updates project context appropriately
- [ ] Reports completion status clearly
- [ ] Suggests logical next steps
- [ ] Handles edge cases gracefully
- [ ] Maintains project consistency