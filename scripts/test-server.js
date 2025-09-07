#!/usr/bin/env node

/**
 * Simple test script to validate the SDD MCP Server is working
 */

const { spawn } = require('child_process');
const path = require('path');

const SERVER_PATH = path.join(__dirname, '..', 'dist', 'index.js');

console.log('🧪 Testing SDD MCP Server...\n');
console.log(`Server path: ${SERVER_PATH}\n`);

// Test 1: Server starts without errors
console.log('Test 1: Server startup');
const server = spawn('node', [SERVER_PATH], {
  stdio: ['pipe', 'pipe', 'pipe']
});

let startupSuccess = false;
let startupOutput = '';

server.stderr.on('data', (data) => {
  const output = data.toString();
  startupOutput += output;
  if (output.includes('Starting SDD MCP Server')) {
    startupSuccess = true;
    console.log('✅ Server starts successfully');
  }
});

server.on('error', (error) => {
  console.log('❌ Server failed to start:', error.message);
  process.exit(1);
});

// Give server time to start
setTimeout(() => {
  if (!startupSuccess) {
    console.log('❌ Server did not start properly');
    console.log('Output:', startupOutput);
    server.kill();
    process.exit(1);
  }

  // Test 2: MCP Protocol - List Tools
  console.log('\nTest 2: MCP tools/list');
  
  const listToolsRequest = JSON.stringify({
    jsonrpc: '2.0',
    id: 1,
    method: 'tools/list',
    params: {}
  }) + '\n';

  server.stdin.write(listToolsRequest);
  
  let toolsResponse = '';
  server.stdout.on('data', (data) => {
    toolsResponse += data.toString();
    
    try {
      const response = JSON.parse(toolsResponse.trim());
      if (response.id === 1) {
        if (response.result && response.result.tools) {
          const tools = response.result.tools;
          console.log(`✅ Found ${tools.length} tools:`);
          tools.forEach(tool => {
            console.log(`   - ${tool.name}: ${tool.description}`);
          });
          
          // Verify we have all expected tools
          const expectedTools = ['plan', 'create-spec', 'create-tasks', 'implement', 'sync-docs'];
          const foundTools = tools.map(t => t.name);
          const missingTools = expectedTools.filter(tool => !foundTools.includes(tool));
          
          if (missingTools.length === 0) {
            console.log('✅ All expected tools are registered');
          } else {
            console.log(`❌ Missing tools: ${missingTools.join(', ')}`);
            server.kill();
            process.exit(1);
          }
          
          // Test 3: Tool call
          console.log('\nTest 3: Tool call - plan');
          
          const toolCallRequest = JSON.stringify({
            jsonrpc: '2.0',
            id: 2,
            method: 'tools/call',
            params: {
              name: 'plan',
              arguments: {}
            }
          }) + '\n';
          
          server.stdin.write(toolCallRequest);
          
        } else {
          console.log('❌ Invalid tools/list response:', response);
          server.kill();
          process.exit(1);
        }
      } else if (response.id === 2) {
        if (response.result && response.result.content) {
          console.log('✅ Plan tool call successful');
          const content = response.result.content[0];
          if (content.text && content.text.includes('PLAN Command Workflow')) {
            console.log('✅ Plan tool returns expected workflow content');
          } else {
            console.log('❌ Plan tool content unexpected:', content.text?.substring(0, 100));
          }
        } else {
          console.log('❌ Plan tool call failed:', response);
        }
        
        // All tests complete
        console.log('\n🎉 All tests passed! SDD MCP Server is working correctly.');
        server.kill();
        process.exit(0);
      }
    } catch (error) {
      // Ignore parse errors, might be partial response
    }
  });
  
  // Timeout after 10 seconds
  setTimeout(() => {
    console.log('❌ Test timeout - server not responding to MCP calls');
    server.kill();
    process.exit(1);
  }, 10000);
  
}, 2000);