# Command: /implement

## Goal
Execute tasks from tasks.md by generating actual code, updating existing files, and maintaining progress tracking throughout implementation.

## User Interaction Flow
1. Load current task list and identify next task
2. Generate implementation for the task
3. Update progress in tasks.md
4. Offer to continue with next task or stop

## Inputs Required
- `task_id`: Specific task number or "next" for next uncompleted
- `approach`: careful (more validation) | fast (trust the spec) | interactive (ask questions)
- `continue`: Whether to automatically proceed to next task

## Outputs Generated
- Code files as specified in tasks.md
- Mark completed tasks with [x] status in tasks.md 
- Note any deviations or additional work done
- Write concise and clear task completion summaries
- Updated context.md with implementation status

## Instructions for Copilot

### Step 1: Detect Context

1. **Validate project state:**
   - Load ACTIVE_SPEC from `.github/context.md`
   - If ACTIVE_SPEC is "none", suggest: "No active spec found. Run /create-spec first."
   - Verify spec folder exists: `specs/[ACTIVE_SPEC]/`

2. **Load task information:**
   - Open `specs/[ACTIVE_SPEC]/tasks.md`
   - If tasks.md doesn't exist, suggest: "No tasks found. Run /create-tasks first."
   - Parse task structure and identify completed vs. pending tasks

3. **Determine next task:**
   - If task_id specified, validate it exists and check dependencies
   - If "next" requested, find first unchecked task whose dependencies are met
   - If all tasks complete, congratulate and suggest /sync-docs

### Step 2: Gather Information

1. **Show current progress:**
   ```
   Current spec: [SPEC-name]
   Progress: X/Y tasks complete (Z% done)
   Estimated remaining effort: [X hours]
   Next ready task: Task N.N - [Task name]
   ```

2. **Validate task readiness:**
   - Check all dependencies are completed
   - Verify required files/directories exist 
   - Identify any external blockers mentioned in task risks

3. **Confirm implementation approach:**
   - "Should I implement Task N.N: [name], or specify a different task?"
   - "What's your preferred approach?"
     - **Careful**: Extra validation, ask questions, thorough testing
     - **Fast**: Trust the spec, minimal validation, focus on speed  
     - **Interactive**: Ask for confirmation at each major step
   - "Any specific considerations or constraints for this implementation?"
   - "Should I continue automatically with the next task after completion?"

### Step 3: Process and Validate

1. **Load task context:**
   - Read complete task details (file, action, estimate, requirements, acceptance criteria)
   - Load relevant spec sections if more context needed
   - Check existing codebase patterns and conventions (from best-practices.md)
   - Verify all dependency tasks are marked as completed

2. **Pre-implementation validation:**
   - Confirm file paths exist or can be created
   - Check for any conflicts with existing code
   - Validate that required imports/dependencies are available
   - Review task risks and prepare mitigation strategies

3. **Implementation preparation:**
   - Load existing file if modifying (never create from scratch if file exists)
   - Identify integration points with existing code
   - Plan testing approach based on acceptance criteria
   - Estimate if task scope matches actual requirements (flag if mismatched)

### Step 4: Generate Output

1. **Execute the implementation:**

   **For CREATE actions:**
   - Generate complete, production-ready code following project conventions
   - Include proper error handling, logging, and validation
   - Add necessary imports and dependencies
   - Include inline comments explaining complex logic
   - Follow existing code patterns and architecture

   **For MODIFY actions:**
   - Load existing file and understand current structure
   - Make minimal, surgical changes that fulfill requirements
   - Preserve existing functionality and patterns
   - Show clear diff of what changed and why

   **For DELETE actions:**
   - Identify all references to code being removed
   - Update imports, calls, and dependencies
   - Ensure no broken references remain

2. **Validate implementation:**
   - Check that all acceptance criteria are met
   - Verify code compiles/runs without errors
   - Test basic functionality if possible
   - Ensure integration points work correctly

3. **Update progress tracking:**
   - Mark task as completed in tasks.md: `- [x] **Task N.N**: [name]`
   - Add completion timestamp: `**Completed**: YYYY-MM-DD HH:MM`  
   - Note any deviations: `**Notes**: [important decisions or changes]`
   - Update progress counters and remaining effort estimates

4. **Report completion:**
   ```
   ✓ Task N.N completed: [name]
   ✓ [Action]: [file-path]
   ✓ Updated: tasks.md (X/Y tasks now complete, Z% done)
   ✓ Remaining effort: [X hours]
   
   Next ready task: Task M.M - [name]
   Continue with next task? (yes/no/different task)
   ```

5. **Handle continuation:**
   - If user wants to continue, immediately start next task
   - If stopping, update context with current progress
   - If all tasks complete, congratulate and suggest next steps
File Templates
Implementation Notes Template
When updating tasks.md after completion:
markdown- [x] **Task 2.1**: [Task name]
  - File: `repos/[repo]/[file-path]`
  - Action: [Create|Modify|Delete]
  - Details: [Specific implementation details]
  - Acceptance: [How to verify completion]
  - **Completed**: YYYY-MM-DD HH:MM
  - **Notes**: [Any deviations or important decisions made]

## Error Handling and Edge Cases

### Common Issues and Solutions

1. **Missing Dependencies**
   - Task dependencies are not marked as completed
   - Solution: List incomplete dependencies, suggest completing them first

2. **File Path Issues**
   - Target file path doesn't exist or has permission problems
   - Solution: Create missing directories, check permissions, suggest alternatives

3. **Code Integration Conflicts**
   - Existing code structure conflicts with task requirements
   - Solution: Analyze conflicts, ask user for guidance, suggest refactoring

4. **Incomplete Task Description**
   - Task lacks sufficient detail for implementation
   - Solution: Ask clarifying questions, suggest updating task or spec

5. **External Dependencies**
   - Task requires external services, APIs, or approvals that aren't ready
   - Solution: Flag as blocked, suggest workarounds or placeholder implementations

### Implementation Failures

- **Compilation errors**: Code doesn't compile or has syntax issues
- **Test failures**: Implementation doesn't meet acceptance criteria
- **Integration failures**: Code doesn't integrate properly with existing system
- **Performance issues**: Implementation doesn't meet performance requirements

### Progress Tracking Issues

- **Corrupted tasks.md**: Cannot parse or update task file
- **Context inconsistency**: Progress doesn't match actual file state
- **Concurrent modifications**: Multiple implementations happening simultaneously

### Recovery Actions

- **Partial implementations**: Save progress, mark task as in-progress with notes
- **Failed implementations**: Revert changes if possible, document lessons learned
- **Blocked tasks**: Mark as blocked with clear reasons and suggested resolution
- **Task scope changes**: Update task description if requirements have evolved

### Validation and Quality Checks

- **Code review prompts**: Suggest areas that need human review
- **Testing recommendations**: Identify what tests should be added
- **Documentation gaps**: Flag missing or outdated documentation
- **Security considerations**: Highlight potential security implications