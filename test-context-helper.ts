#!/usr/bin/env node

import { ContextHelper } from './src/utils/contextHelper';

// Test the improved ContextHelper functionality
const helper = new ContextHelper();

console.log('=== Context Helper Smart Fetching Test ===\n');

console.log('1. Foundation Documents (should always fetch):');
const foundationDocs = helper.getFoundationDocuments();
foundationDocs.forEach(doc => {
  console.log(`   - ${doc.path}: ${doc.description}`);
});

console.log('\n2. On-Demand Documents (fetch only when needed):');
const onDemandDocs = helper.getOnDemandDocuments();
onDemandDocs.forEach(doc => {
  console.log(`   - ${doc.path}: ${doc.description}`);
});

console.log('\n3. Testing Contextual Relevance:');
const testIntents = [
  'Help me implement user authentication API',
  'Need to update the database schema', 
  'Working on the system architecture',
  'Building a new UI component'
];

testIntents.forEach(intent => {
  console.log(`\n   Intent: "${intent}"`);
  const relevantDocs = helper.getContextuallyRelevantDocs(intent);
  if (relevantDocs.length > 0) {
    relevantDocs.forEach(doc => {
      console.log(`     → Should fetch: ${doc.path}`);
    });
  } else {
    console.log('     → No additional technical docs needed');
  }
});

console.log('\n4. Project State Detection:');
console.log(`   Current state: ${helper.detectProjectState()}`);
console.log(`   Description: ${helper.getProjectStateDescription()}`);
console.log(`   Is ready for spec-driven dev: ${helper.isProjectReady()}`);

console.log('\n5. Document Availability:');
const docNames = ['product.md', 'best-practices.md', 'api.md', 'database.md'];
docNames.forEach(docName => {
  const exists = helper.documentExists(docName);
  const shouldAutoFetch = helper.shouldAutoFetch(docName);
  console.log(`   - ${docName}: exists=${exists}, auto-fetch=${shouldAutoFetch}`);
});

console.log('\n=== Test Complete ===');