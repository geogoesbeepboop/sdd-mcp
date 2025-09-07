#!/usr/bin/env node

import { SDDMCPServer } from './core/server.js';

async function main() {
  try {
    const server = new SDDMCPServer();
    console.error('Starting SDD MCP Server...');
    await server.run();
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

// Handle process termination
process.on('SIGINT', () => {
  console.error('Shutting down server...');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.error('Shutting down server...');
  process.exit(0);
});

main().catch((error) => {
  console.error('Unhandled error:', error);
  process.exit(1);
});