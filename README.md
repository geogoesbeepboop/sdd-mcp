# SDD MCP Server

Spec-Driven Development MCP Server for GitHub Copilot integration.

## Overview

This MCP (Model Context Protocol) server provides spec-driven development tools to GitHub Copilot, enabling systematic feature development through structured specifications, task breakdown, and progress tracking.

## Commands

- `/plan` - Initialize or configure a project for spec-driven development
- `/create-spec` - Transform requirements into structured specifications  
- `/create-tasks` - Break specifications into implementable tasks
- `/implement` - Execute tasks with progress tracking
- `/sync-docs` - Update project documentation based on completed work

## Installation

```bash
npm install
npm run build
```

## Usage with VS Code

Add to your VS Code `settings.json`:

```json
{
  "github.copilot.advanced": {
    "mcp": {
      "sdd-mcp": {
        "type": "stdio",
        "command": "node",
        "args": ["path/to/sdd-mcp/dist/index.js"]
      }
    }
  }
}
```

## Development

```bash
npm run dev  # Watch mode
npm run build  # Build for production
```

## Architecture

The server implements five core workflow commands as MCP tools, each following a standardized structure for context detection, information gathering, processing, and output generation.