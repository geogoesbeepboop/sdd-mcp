import * as fs from 'fs';
import * as path from 'path';

export interface WorkflowDefinition {
  name: string;
  goal: string;
  userInteractionFlow: string[];
  inputsRequired: string[];
  outputsGenerated: string[];
  instructions: string;
  fileTemplates: string;
  errorHandling: string;
  fullContent: string;
}

export class WorkflowLoader {
  private commandsPath: string;
  private loadedWorkflows: Map<string, WorkflowDefinition> = new Map();

  constructor(commandsPath: string = path.join(__dirname, '../../commands')) {
    this.commandsPath = commandsPath;
  }

  /**
   * Load a specific workflow by command name
   */
  async loadWorkflow(commandName: string): Promise<WorkflowDefinition | null> {
    // Check cache first
    if (this.loadedWorkflows.has(commandName)) {
      return this.loadedWorkflows.get(commandName)!;
    }

    const filePath = path.join(this.commandsPath, `${commandName}.md`);
    
    try {
      if (!fs.existsSync(filePath)) {
        return null;
      }

      const content = fs.readFileSync(filePath, 'utf-8');
      const workflow = this.parseWorkflow(commandName, content);
      
      // Cache the parsed workflow
      this.loadedWorkflows.set(commandName, workflow);
      return workflow;
    } catch (error) {
      console.error(`Error loading workflow ${commandName}:`, error);
      return null;
    }
  }

  /**
   * Parse markdown content into structured workflow definition
   */
  private parseWorkflow(name: string, content: string): WorkflowDefinition {
    const sections = this.extractSections(content);
    
    return {
      name,
      goal: sections['goal'] || '',
      userInteractionFlow: this.parseListSection(sections['userInteractionFlow'] || ''),
      inputsRequired: this.parseListSection(sections['inputsRequired'] || ''),
      outputsGenerated: this.parseListSection(sections['outputsGenerated'] || ''),
      instructions: sections['instructionsForCopilot'] || '',
      fileTemplates: sections['fileTemplates'] || '',
      errorHandling: sections['errorHandling'] || '',
      fullContent: content
    };
  }

  /**
   * Extract sections from markdown content
   */
  private extractSections(content: string): Record<string, string> {
    const sections: Record<string, string> = {};
    const lines = content.split('\n');
    let currentSection = '';
    let currentContent: string[] = [];

    for (const line of lines) {
      if (line.startsWith('# ') || line.startsWith('## ')) {
        // Save previous section
        if (currentSection) {
          sections[this.sectionKey(currentSection)] = currentContent.join('\n').trim();
        }
        
        // Start new section
        currentSection = line.replace(/^#+\s*/, '');
        currentContent = [];
      } else {
        currentContent.push(line);
      }
    }

    // Save final section
    if (currentSection) {
      sections[this.sectionKey(currentSection)] = currentContent.join('\n').trim();
    }

    return sections;
  }

  /**
   * Convert section title to key
   */
  private sectionKey(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .replace(/\s+/g, '')
      .replace('userinteractionflow', 'userInteractionFlow')
      .replace('inputsrequired', 'inputsRequired')
      .replace('outputsgenerated', 'outputsGenerated')
      .replace('instructionsforcopilot', 'instructionsForCopilot')
      .replace('filetemplates', 'fileTemplates')
      .replace('errorhandlingandedgecases', 'errorHandling');
  }

  /**
   * Parse list sections (like inputs, outputs, flow steps)
   */
  private parseListSection(content: string): string[] {
    return content
      .split('\n')
      .filter(line => line.trim().startsWith('-') || line.trim().match(/^\d+\./))
      .map(line => line.replace(/^[\s\-\d\.]+/, '').trim())
      .filter(item => item.length > 0);
  }

  /**
   * Get all available command names
   */
  getAvailableCommands(): string[] {
    try {
      const files = fs.readdirSync(this.commandsPath);
      return files
        .filter(file => file.endsWith('.md') && !file.startsWith('COMMAND_') && !file.startsWith('WORKFLOW_'))
        .map(file => file.replace('.md', ''));
    } catch (error) {
      console.error('Error reading commands directory:', error);
      return [];
    }
  }
}