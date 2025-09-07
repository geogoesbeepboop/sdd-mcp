# VS Code Configuration for SDD MCP Server

## Setup Instructions

1. **Install the SDD MCP Server**:
   ```bash
   npm install -g sdd-mcp
   # OR if running from source:
   cd /path/to/sdd-mcp && npm run build
   ```

2. **Update VS Code Settings**:
   - Open VS Code Settings (JSON)
   - Add the configuration from `settings.json` to your VS Code `settings.json`
   - **IMPORTANT**: Update the absolute path in the `args` array to point to your `dist/index.js` file

3. **Restart VS Code** to load the MCP server

## Configuration Details

### MCP Server Configuration
```json
"github.copilot.advanced": {
  "mcp": {
    "sdd-mcp": {
      "type": "stdio",
      "command": "node",
      "args": ["/absolute/path/to/sdd-mcp/dist/index.js"]
    }
  }
}
```

### Agent Profiles
The configuration includes two specialized agents:

- **context-fetcher**: Proactively retrieves project documentation
- **git-workflow**: Handles git operations and workflow management

## Available MCP Tools

Once configured, GitHub Copilot will have access to these spec-driven development tools:

- `/plan` - Initialize or configure project for spec-driven development
- `/create-spec` - Transform requirements into structured specifications  
- `/create-tasks` - Break specifications into implementable tasks
- `/implement` - Execute tasks with progress tracking
- `/sync-docs` - Update project documentation

## Usage Example

1. **Initialize Project**: 
   ```
   Use /plan to set up spec-driven development
   ```

2. **Create Feature Specification**:
   ```
   Use /create-spec with feature_name: "user authentication" and problem_statement: "Users need secure login"
   ```

3. **Break Into Tasks**:
   ```
   Use /create-tasks with implementation_approach: "backend-first"
   ```

4. **Implement Features**:
   ```
   Use /implement to execute tasks systematically
   ```

5. **Update Documentation**:
   ```
   Use /sync-docs to update project documentation
   ```

## Troubleshooting

### Common Issues

1. **MCP Server Not Found**:
   - Verify the absolute path in `args` is correct
   - Ensure `dist/index.js` exists (run `npm run build`)
   - Check file permissions

2. **Commands Not Available**:
   - Restart VS Code after configuration changes
   - Check VS Code Developer Console for errors
   - Verify GitHub Copilot is enabled and updated

3. **Permission Errors**:
   - Ensure the MCP server has read/write permissions in the project directory
   - Check that Node.js is properly installed and accessible

### Debug Mode

To enable debug logging, set environment variable:
```bash
export SDD_MCP_DEBUG=true
```

Then restart VS Code to see detailed logs in the console.

## Integration with Existing Workflows

This MCP server enhances GitHub Copilot's capabilities without replacing existing functionality. It provides:

- **Structured guidance** for feature development
- **Project context awareness** 
- **Systematic workflow execution**
- **Progress tracking** across development phases

The server works alongside Copilot's existing file operations, code generation, and interaction capabilities.