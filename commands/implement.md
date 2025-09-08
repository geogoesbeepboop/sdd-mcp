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

**Follow the context-fetcher strategy from agents/context-fetcher.md:**

1. **Validate project state and load foundation context:**
   - Auto-fetch foundation documents: `.github/context.md`, `.github/product.md`, `.github/best-practices.md`
   - From loaded context.md, get ACTIVE_SPEC
   - If ACTIVE_SPEC is "none", suggest: "No active spec found. Run /create-spec first."
   - Verify spec folder exists: `specs/[ACTIVE_SPEC]/`

2. **Load task and spec information (spec-specific fetching):**
   - Load `specs/[ACTIVE_SPEC]/tasks.md` (always fetch when working on specific feature)
   - If tasks.md doesn't exist, suggest: "No tasks found. Run /create-tasks first."
   - Load `specs/[ACTIVE_SPEC]/lite.md` for quick reference to requirements
   - Parse task structure and identify completed vs. pending tasks

3. **Contextually fetch technical documentation based on next task:**
   - **For API tasks**: Load `docs/api.md` for endpoint patterns and standards
   - **For database tasks**: Load `docs/database.md` for schema patterns
   - **For architecture tasks**: Load `docs/architecture.md` for component patterns
   - **For UI/frontend tasks**: Load `docs/design.md` for component patterns
   - **Never re-fetch**: Documents already in conversation history

4. **Determine next task:**
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

1. **Load task context using loaded documentation:**
   - Read complete task details (file, action, estimate, requirements, acceptance criteria)
   - Reference loaded spec lite.md for requirement context if needed
   - Apply loaded best-practices.md patterns and conventions for implementation approach
   - Cross-reference with loaded technical docs (api.md, database.md, architecture.md, design.md) as relevant
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
   - Generate complete, production-ready code following loaded best-practices.md patterns
   - Implement error handling using patterns from loaded best-practices.md
   - Add logging using established patterns from loaded technical docs
   - Include validation following loaded api.md or database.md patterns as appropriate
   - Add necessary imports and dependencies following project structure from loaded architecture.md
   - Include inline comments explaining complex logic (following best-practices.md commenting standards)
   - Follow loaded architectural patterns and design decisions

   **For MODIFY actions:**
   - Load existing file and understand current structure and patterns
   - Make minimal, surgical changes that fulfill requirements while maintaining loaded best-practices.md standards
   - Preserve existing functionality and architectural patterns from loaded docs
   - Ensure changes align with loaded technical documentation patterns
   - Show clear diff of what changed and why, referencing which loaded patterns were applied

   **For DELETE actions:**
   - Identify all references to code being removed using loaded architecture.md understanding
   - Update imports, calls, and dependencies following loaded project structure patterns
   - Ensure no broken references remain and system integrity follows loaded architectural principles
   - Update related documentation if needed

2. **Validate implementation:**
   - Check that all acceptance criteria are met
   - Verify code compiles/runs without errors
   - Test basic functionality if possible
   - Ensure integration points work correctly

3. **Validate implementation quality:**
   - **Pattern Compliance**: Check implementation follows loaded best-practices.md patterns
   - **Architecture Alignment**: Verify code aligns with loaded architecture.md principles
   - **Integration Quality**: Confirm implementation integrates properly with loaded technical doc patterns
   - **Completeness**: Ensure all task acceptance criteria are fully satisfied
   - **Quality Score**: Rate implementation on compliance, alignment, integration, and completeness (minimum 3/5 on each)

4. **Update progress tracking:**
   - Mark task as completed in tasks.md: `- [x] **Task N.N**: [name]`
   - Add completion timestamp: `**Completed**: YYYY-MM-DD HH:MM`  
   - Note any deviations: `**Notes**: [important decisions or pattern applications]`
   - Record quality scores: `**Quality**: [Pattern/Architecture/Integration/Completeness scores]`
   - Update progress counters and remaining effort estimates

5. **Report completion with quality assessment:**
   ```
   ✓ Task N.N completed: [name]
   ✓ [Action]: [file-path] (following [specific patterns from loaded docs])
   ✓ Quality Score: [scores] (all ≥3/5 required)
   ✓ Updated: tasks.md (X/Y tasks now complete, Z% done)
   ✓ Remaining effort: [X hours]
   
   Context Status: Foundation docs remain loaded. Technical docs fetched as needed.
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