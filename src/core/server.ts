import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';
import { WorkflowLoader } from '../utils/workflowLoader.js';
import { ContextHelper } from '../utils/contextHelper.js';

export class SDDMCPServer {
  private server: McpServer;
  private workflowLoader: WorkflowLoader;
  private contextHelper: ContextHelper;

  constructor() {
    this.server = new McpServer(
      {
        name: 'sdd-mcp',
        version: '1.0.0',
        description: 'Spec-Driven Development MCP Server for GitHub Copilot'
      },
      {
        capabilities: {
          tools: {},
          resources: {}
        }
      }
    );

    this.workflowLoader = new WorkflowLoader();
    this.contextHelper = new ContextHelper();

    this.setupTools();
    // TODO: Resources need correct format - implement later
    // this.setupResources();
  }

  private setupTools(): void {
    // Register /plan command
    this.server.tool(
      'plan',
      'Initialize or configure a project for spec-driven development',
      {
        project_type: z.enum(['new', 'existing', 'reconfigure']).optional().describe('Type of project setup'),
        project_name: z.string().optional().describe('Name of the product/project'),
        mission: z.string().optional().describe('1-3 sentence mission statement'),
        tech_stack: z.string().optional().describe('Technologies and frameworks used'),
        roadmap: z.string().optional().describe('Features to implement by timeline')
      },
      async (args) => {
        return await this.handlePlanCommand(args);
      }
    );

    // Register /create-spec command
    this.server.tool(
      'create-spec',
      'Transform user requirements into structured specifications',
      {
        feature_name: z.string().describe('Short descriptive name for the feature'),
        problem_statement: z.string().describe('What problem this solves'),
        user_stories: z.string().optional().describe('Who needs this and why'),
        acceptance_criteria: z.string().optional().describe('How we know it is working'),
        technical_scope: z.string().optional().describe('High level overview of project parts affected')
      },
      async (args) => {
        return await this.handleCreateSpecCommand(args);
      }
    );

    // Register /create-tasks command
    this.server.tool(
      'create-tasks',
      'Break specifications into implementable tasks',
      {
        spec_folder: z.string().optional().describe('Active spec or user-specified SPEC-YYYYMMDD-slug'),
        implementation_approach: z.enum(['backend-first', 'frontend-first', 'full-stack-parallel', 'risk-first']).optional().describe('Implementation strategy'),
        task_granularity: z.enum(['fine', 'medium', 'coarse']).optional().describe('Task size: fine (30min-2hr), medium (2-4hr), coarse (4-8hr)')
      },
      async (args) => {
        return await this.handleCreateTasksCommand(args);
      }
    );

    // Register /implement command
    this.server.tool(
      'implement',
      'Execute tasks with progress tracking',
      {
        task_id: z.string().optional().describe('Specific task number or "next" for next uncompleted'),
        approach: z.enum(['careful', 'fast', 'interactive']).optional().describe('Implementation approach'),
        continue: z.boolean().optional().describe('Whether to automatically proceed to next task')
      },
      async (args) => {
        return await this.handleImplementCommand(args);
      }
    );

    // Register /sync-docs command
    this.server.tool(
      'sync-docs',
      'Update project documentation based on completed work',
      {
        scope: z.enum(['current-spec', 'all-completed', 'specific-file']).optional().describe('Documentation update scope'),
        doc_targets: z.array(z.enum(['api', 'database', 'architecture', 'design'])).optional().describe('Which docs to update'),
        update_mode: z.enum(['append', 'merge', 'regenerate']).optional().describe('How to handle updates')
      },
      async (args) => {
        return await this.handleSyncDocsCommand(args);
      }
    );
  }

  // TODO: Resources need correct format - will be implemented in separate task
  // private setupResources(): void {
  //   // Resource setup implementation postponed due to format complexity
  // }

  // Command handlers that return workflow instructions to Copilot
  private async handlePlanCommand(args: any) {
    try {
      // Load the plan workflow
      const workflow = await this.workflowLoader.loadWorkflow('plan');
      if (!workflow) {
        return {
          content: [
            {
              type: 'text' as const,
              text: 'Error: Could not load plan workflow definition'
            }
          ],
          isError: true
        };
      }

      // Detect current project state
      const projectState = this.contextHelper.detectProjectState();
      const stateDescription = this.contextHelper.getProjectStateDescription();
      
      // Format response for Copilot
      const response = this.formatWorkflowResponse('plan', workflow, {
        projectState,
        stateDescription,
        projectType: args.project_type || 'detect-automatically',
        providedInputs: args
      });

      return {
        content: [
          {
            type: 'text' as const,
            text: response
          }
        ]
      };
    } catch (error) {
      return {
        content: [
          {
            type: 'text' as const,
            text: `Error in plan command: ${error instanceof Error ? error.message : String(error)}`
          }
        ],
        isError: true
      };
    }
  }

  private async handleCreateSpecCommand(args: any) {
    try {
      // Check if project is ready for spec creation
      if (!this.contextHelper.isProjectReady()) {
        return {
          content: [
            {
              type: 'text' as const,
              text: 'Error: Project is not configured for spec-driven development. Please run /plan first.\n\n' +
                   `Current state: ${this.contextHelper.getProjectStateDescription()}`
            }
          ],
          isError: true
        };
      }

      // Load the create-spec workflow
      const workflow = await this.workflowLoader.loadWorkflow('create-spec');
      if (!workflow) {
        return {
          content: [
            {
              type: 'text' as const,
              text: 'Error: Could not load create-spec workflow definition'
            }
          ],
          isError: true
        };
      }

      // Get current project context
      const context = this.contextHelper.readContext();
      const hasActiveSpec = this.contextHelper.hasActiveSpec();
      const availableSpecs = this.contextHelper.getAvailableSpecs();

      // Format response for Copilot
      const response = this.formatWorkflowResponse('create-spec', workflow, {
        projectState: 'CONFIGURED',
        stateDescription: this.contextHelper.getProjectStateDescription(),
        hasActiveSpec,
        currentActiveSpec: context?.activeSpec,
        availableSpecs,
        providedInputs: args
      });

      return {
        content: [
          {
            type: 'text' as const,
            text: response
          }
        ]
      };
    } catch (error) {
      return {
        content: [
          {
            type: 'text' as const,
            text: `Error in create-spec command: ${error instanceof Error ? error.message : String(error)}`
          }
        ],
        isError: true
      };
    }
  }

  private async handleCreateTasksCommand(args: any) {
    try {
      // Check for active spec
      const activeSpec = this.contextHelper.getActiveSpec();
      if (!activeSpec) {
        return {
          content: [
            {
              type: 'text' as const,
              text: 'Error: No active spec found. Please run /create-spec first to create a specification.'
            }
          ],
          isError: true
        };
      }

      const workflow = await this.workflowLoader.loadWorkflow('create-tasks');
      if (!workflow) {
        return {
          content: [
            {
              type: 'text' as const,
              text: 'Error: Could not load create-tasks workflow definition'
            }
          ],
          isError: true
        };
      }

      const response = this.formatWorkflowResponse('create-tasks', workflow, {
        projectState: 'CONFIGURED',
        stateDescription: this.contextHelper.getProjectStateDescription(),
        activeSpec,
        availableSpecs: this.contextHelper.getAvailableSpecs(),
        providedInputs: args
      });

      return {
        content: [
          {
            type: 'text' as const,
            text: response
          }
        ]
      };
    } catch (error) {
      return {
        content: [
          {
            type: 'text' as const,
            text: `Error in create-tasks command: ${error instanceof Error ? error.message : String(error)}`
          }
        ],
        isError: true
      };
    }
  }

  private async handleImplementCommand(args: any) {
    try {
      const activeSpec = this.contextHelper.getActiveSpec();
      if (!activeSpec) {
        return {
          content: [
            {
              type: 'text' as const,
              text: 'Error: No active spec found. Please run /create-spec first.'
            }
          ],
          isError: true
        };
      }

      const workflow = await this.workflowLoader.loadWorkflow('implement');
      if (!workflow) {
        return {
          content: [
            {
              type: 'text' as const,
              text: 'Error: Could not load implement workflow definition'
            }
          ],
          isError: true
        };
      }

      const response = this.formatWorkflowResponse('implement', workflow, {
        projectState: 'DEVELOPING',
        stateDescription: 'Ready for task implementation',
        activeSpec,
        providedInputs: args
      });

      return {
        content: [
          {
            type: 'text' as const,
            text: response
          }
        ]
      };
    } catch (error) {
      return {
        content: [
          {
            type: 'text' as const,
            text: `Error in implement command: ${error instanceof Error ? error.message : String(error)}`
          }
        ],
        isError: true
      };
    }
  }

  private async handleSyncDocsCommand(args: any) {
    try {
      const workflow = await this.workflowLoader.loadWorkflow('sync-docs');
      if (!workflow) {
        return {
          content: [
            {
              type: 'text' as const,
              text: 'Error: Could not load sync-docs workflow definition'
            }
          ],
          isError: true
        };
      }

      const availableSpecs = this.contextHelper.getAvailableSpecs();
      const activeSpec = this.contextHelper.getActiveSpec();

      const response = this.formatWorkflowResponse('sync-docs', workflow, {
        projectState: 'DOCUMENTED',
        stateDescription: 'Ready for documentation sync',
        availableSpecs,
        activeSpec,
        providedInputs: args
      });

      return {
        content: [
          {
            type: 'text' as const,
            text: response
          }
        ]
      };
    } catch (error) {
      return {
        content: [
          {
            type: 'text' as const,
            text: `Error in sync-docs command: ${error instanceof Error ? error.message : String(error)}`
          }
        ],
        isError: true
      };
    }
  }

  /**
   * Format workflow instructions for GitHub Copilot consumption
   */
  private formatWorkflowResponse(commandName: string, workflow: any, context: any): string {
    const header = `# ${commandName.toUpperCase()} Command Workflow\n\n`;
    
    const currentState = `## Current Project State\n` +
      `- **State**: ${context.projectState}\n` +
      `- **Description**: ${context.stateDescription}\n\n`;
    
    const goal = `## Goal\n${workflow.goal}\n\n`;
    
    const instructions = `## Instructions to Execute\n${workflow.instructions}\n\n`;
    
    const templates = workflow.fileTemplates ? `## File Templates\n${workflow.fileTemplates}\n\n` : '';
    
    const errorHandling = workflow.errorHandling ? `## Error Handling\n${workflow.errorHandling}\n\n` : '';
    
    const providedInputs = context.providedInputs && Object.keys(context.providedInputs).length > 0 
      ? `## User Provided Inputs\n${JSON.stringify(context.providedInputs, null, 2)}\n\n`
      : '';

    return header + currentState + goal + providedInputs + instructions + templates + errorHandling;
  }

  public async run(): Promise<void> {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
  }
}