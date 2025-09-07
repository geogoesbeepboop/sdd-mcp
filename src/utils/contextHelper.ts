import * as fs from 'fs';
import * as path from 'path';

export interface ProjectContext {
  activeSpec: string;
  lastUpdated: string;
  projectState: 'new' | 'configured' | 'developing' | 'documented';
}

export type ProjectStateType = 'NEW' | 'EXISTING' | 'PARTIAL' | 'CONFIGURED';

export class ContextHelper {
  private contextPath: string;

  constructor(workingDirectory: string = process.cwd()) {
    this.contextPath = path.join(workingDirectory, '.github', 'context.md');
  }

  /**
   * Detect the current project state based on files present
   */
  detectProjectState(): ProjectStateType {
    const workingDir = path.dirname(path.dirname(this.contextPath));
    
    // Check for existing spec-driven setup
    const productMdPath = path.join(workingDir, '.github', 'product.md');
    if (fs.existsSync(productMdPath)) {
      return 'CONFIGURED';
    }

    // Check for existing code repositories
    const reposPath = path.join(workingDir, 'repos');
    if (fs.existsSync(reposPath)) {
      const items = fs.readdirSync(reposPath);
      if (items.length > 0) {
        return 'EXISTING';
      }
    }

    // Check for partial setup (.github exists but no product.md)
    const githubPath = path.join(workingDir, '.github');
    if (fs.existsSync(githubPath)) {
      return 'PARTIAL';
    }

    return 'NEW';
  }

  /**
   * Read current project context from .github/context.md
   */
  readContext(): ProjectContext | null {
    try {
      if (!fs.existsSync(this.contextPath)) {
        return null;
      }

      const content = fs.readFileSync(this.contextPath, 'utf-8');
      const lines = content.split('\n');
      
      let activeSpec: string = 'none';
      let lastUpdated: string = new Date().toISOString().split('T')[0] || new Date().toISOString().substring(0, 10);
      let projectState: ProjectContext['projectState'] = 'new';

      for (const line of lines) {
        if (line.startsWith('ACTIVE_SPEC:')) {
          activeSpec = line.replace('ACTIVE_SPEC:', '').trim() || 'none';
        } else if (line.startsWith('LAST_UPDATED:')) {
          lastUpdated = line.replace('LAST_UPDATED:', '').trim() || new Date().toISOString().substring(0, 10);
        } else if (line.startsWith('PROJECT_STATE:')) {
          const state = line.replace('PROJECT_STATE:', '').trim();
          if (['new', 'configured', 'developing', 'documented'].includes(state)) {
            projectState = state as ProjectContext['projectState'];
          }
        }
      }

      return {
        activeSpec,
        lastUpdated,
        projectState
      };
    } catch (error) {
      console.error('Error reading context:', error);
      return null;
    }
  }

  /**
   * Check if project is ready for spec-driven development
   */
  isProjectReady(): boolean {
    const state = this.detectProjectState();
    return state === 'CONFIGURED';
  }

  /**
   * Check if there's an active spec
   */
  hasActiveSpec(): boolean {
    const context = this.readContext();
    return context?.activeSpec !== 'none' && context?.activeSpec !== undefined;
  }

  /**
   * Get the current active spec folder name
   */
  getActiveSpec(): string | null {
    const context = this.readContext();
    const spec = context?.activeSpec;
    return spec && spec !== 'none' ? spec : null;
  }

  /**
   * Check if specs directory exists and find available specs
   */
  getAvailableSpecs(): string[] {
    try {
      const workingDir = path.dirname(path.dirname(this.contextPath));
      const specsPath = path.join(workingDir, 'specs');
      
      if (!fs.existsSync(specsPath)) {
        return [];
      }

      const items = fs.readdirSync(specsPath);
      return items.filter(item => {
        const itemPath = path.join(specsPath, item);
        return fs.statSync(itemPath).isDirectory() && item.startsWith('SPEC-');
      });
    } catch (error) {
      console.error('Error reading specs directory:', error);
      return [];
    }
  }

  /**
   * Check if a specific spec folder exists
   */
  specExists(specId: string): boolean {
    const workingDir = path.dirname(path.dirname(this.contextPath));
    const specPath = path.join(workingDir, 'specs', specId);
    return fs.existsSync(specPath);
  }

  /**
   * Get current project state as a readable string
   */
  getProjectStateDescription(): string {
    const state = this.detectProjectState();
    switch (state) {
      case 'NEW':
        return 'New project - not yet configured for spec-driven development';
      case 'EXISTING':
        return 'Existing project with code - not yet configured for spec-driven development';
      case 'PARTIAL':
        return 'Partially configured - .github directory exists but missing product.md';
      case 'CONFIGURED':
        return 'Configured for spec-driven development';
      default:
        return 'Unknown project state';
    }
  }
}