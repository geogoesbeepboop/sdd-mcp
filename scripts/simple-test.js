#!/usr/bin/env node

/**
 * Simple interactive test for SDD MCP Server
 */

const { spawn } = require('child_process');
const path = require('path');

const SERVER_PATH = path.join(__dirname, '..', 'dist', 'index.js');

console.log('🧪 Simple Test: Starting SDD MCP Server...');
console.log(`Server path: ${SERVER_PATH}`);

const server = spawn('node', [SERVER_PATH], {
  stdio: ['pipe', 'pipe', 'pipe']
});

server.stderr.on('data', (data) => {
  console.log('STDERR:', data.toString());
});

server.stdout.on('data', (data) => {
  console.log('STDOUT:', data.toString());
});

server.on('error', (error) => {
  console.log('❌ Server error:', error.message);
  process.exit(1);
});

// Send a simple tools/list request after 2 seconds
setTimeout(() => {
  console.log('📤 Sending tools/list request...');
  const request = {
    jsonrpc: '2.0',
    id: 1,
    method: 'tools/list',
    params: {}
  };
  server.stdin.write(JSON.stringify(request) + '\n');
  
  // Kill after 5 seconds
  setTimeout(() => {
    console.log('⏰ Timeout - killing server');
    server.kill();
    process.exit(0);
  }, 5000);
}, 2000);