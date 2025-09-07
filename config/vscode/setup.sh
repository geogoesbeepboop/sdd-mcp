#!/bin/bash

# SDD MCP Server Setup Script for VS Code
# This script helps configure VS Code for the Spec-Driven Development MCP Server

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}Setting up SDD MCP Server for VS Code...${NC}"

# Get the absolute path to this project
PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
DIST_PATH="$PROJECT_DIR/dist/index.js"

echo -e "\nProject directory: $PROJECT_DIR"
echo -e "Expected server path: $DIST_PATH"

# Check if the server is built
if [ ! -f "$DIST_PATH" ]; then
    echo -e "${YELLOW}Server not built. Running npm run build...${NC}"
    cd "$PROJECT_DIR"
    npm run build
fi

# Check if VS Code settings directory exists
if [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS
    VSCODE_SETTINGS_DIR="$HOME/Library/Application Support/Code/User"
elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
    # Linux
    VSCODE_SETTINGS_DIR="$HOME/.config/Code/User"
elif [[ "$OSTYPE" == "msys" || "$OSTYPE" == "win32" ]]; then
    # Windows
    VSCODE_SETTINGS_DIR="$APPDATA/Code/User"
else
    echo -e "${RED}Unsupported operating system: $OSTYPE${NC}"
    exit 1
fi

VSCODE_SETTINGS_FILE="$VSCODE_SETTINGS_DIR/settings.json"

echo -e "\nVS Code settings file: $VSCODE_SETTINGS_FILE"

# Create VS Code settings directory if it doesn't exist
mkdir -p "$VSCODE_SETTINGS_DIR"

# Generate the settings configuration
cat > /tmp/sdd-mcp-config.json << EOF
{
  "github.copilot.advanced": {
    "agents": {
      "context-fetcher": {
        "description": "Retrieve and extract relevant information from project documentation files",
        "tools": ["read", "grep", "glob"],
        "color": "blue",
        "activation": "proactive"
      },
      "git-workflow": {
        "description": "Handle git operations, branch management, commits, and PR creation",
        "tools": ["bash", "read", "grep"],
        "color": "orange",
        "activation": "proactive"
      }
    },
    "mcp": {
      "sdd-mcp": {
        "type": "stdio",
        "command": "node",
        "args": ["$DIST_PATH"],
        "description": "Spec-Driven Development MCP Server"
      }
    }
  }
}
EOF

# Check if VS Code settings file exists
if [ -f "$VSCODE_SETTINGS_FILE" ]; then
    echo -e "${YELLOW}VS Code settings file exists. You'll need to manually merge the configuration.${NC}"
    echo -e "\nAdd this configuration to your VS Code settings.json:"
    echo -e "${GREEN}"
    cat /tmp/sdd-mcp-config.json
    echo -e "${NC}"
    echo -e "\nConfiguration saved to: /tmp/sdd-mcp-config.json"
else
    echo -e "${GREEN}Creating new VS Code settings file...${NC}"
    cp /tmp/sdd-mcp-config.json "$VSCODE_SETTINGS_FILE"
    echo -e "${GREEN}VS Code settings configured successfully!${NC}"
fi

# Clean up
rm /tmp/sdd-mcp-config.json

echo -e "\n${GREEN}Setup complete!${NC}"
echo -e "\nNext steps:"
echo -e "1. Restart VS Code to load the MCP server"
echo -e "2. Ensure GitHub Copilot is enabled"
echo -e "3. Try using /plan in a project directory to get started"
echo -e "\nFor troubleshooting, see: $PROJECT_DIR/config/vscode/README.md"