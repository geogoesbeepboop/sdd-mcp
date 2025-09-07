// Core types for the SDD MCP Server

export interface ProjectContext {
  activeSpec: string;
  lastUpdated: string;
  projectState: 'new' | 'configured' | 'developing' | 'documented';
}

export interface CommandDefinition {
  name: string;
  goal: string;
  inputs: Record<string, InputDefinition>;
  outputs: Record<string, OutputDefinition>;
  workflow: WorkflowStep[];
}

export interface InputDefinition {
  type: 'string' | 'boolean' | 'enum';
  description: string;
  required: boolean;
  options?: string[];
  validation?: string;
}

export interface OutputDefinition {
  path: string;
  description: string;
  template?: string;
}

export interface WorkflowStep {
  name: string;
  description: string;
  actions: WorkflowAction[];
  errorHandling?: ErrorHandler[];
}

export interface WorkflowAction {
  type: 'check' | 'gather' | 'process' | 'generate' | 'validate' | 'report';
  description: string;
  implementation: string;
}

export interface ErrorHandler {
  condition: string;
  action: string;
  recovery: string;
}

export interface ProjectState {
  type: 'NEW' | 'EXISTING' | 'PARTIAL' | 'CONFIGURED';
  hasProductMd: boolean;
  hasRepos: boolean;
  hasSpecs: boolean;
  activeSpec?: string;
}

export interface SpecInfo {
  id: string;
  name: string;
  path: string;
  created: string;
  status: 'draft' | 'active' | 'completed';
  taskCount?: number;
  completedTasks?: number;
}

export interface TaskInfo {
  id: string;
  name: string;
  status: 'pending' | 'in_progress' | 'completed' | 'blocked';
  estimate: number;
  dependencies: string[];
  file: string;
  action: 'create' | 'modify' | 'delete';
  completed?: string;
  notes?: string;
}

export interface FileOperation {
  type: 'create' | 'update' | 'delete' | 'read';
  path: string;
  content?: string;
  template?: string;
  variables?: Record<string, any>;
}

export interface CommandResult {
  success: boolean;
  message: string;
  data?: any;
  nextSteps?: string[];
  errors?: string[];
}