import { log } from '@/lib/logger';

export interface AppfolioDiagnostics {
  renderingMode: 'iframe' | 'shadow-dom' | 'direct-dom' | 'unknown';
  evidence: string[];
  timestamp: string;
  containerInfo: {
    id: string;
    childElementCount: number;
    hasIframe: boolean;
    hasShadowRoot: boolean;
    topLevelClasses: string[];
    topLevelIds: string[];
  };
  selectors: {
    iframes?: string[];
    shadowHosts?: string[];
    directElements?: string[];
  };
}

/**
 * Diagnose how AppFolio renders its listings widget
 * Call this after the widget has loaded
 */
export async function diagnoseAppfolioRendering(
  containerId: string = 'appfolio-root'
): Promise<AppfolioDiagnostics> {
  const container = document.getElementById(containerId);
  
  if (!container) {
    log('APPFOLIO DIAGNOSE: Container not found', containerId);
    return createUnknownDiagnostics('Container not found');
  }

  log('APPFOLIO DIAGNOSE: Starting analysis...', {
    containerId,
    childCount: container.children.length
  });

  const diagnostics: AppfolioDiagnostics = {
    renderingMode: 'unknown',
    evidence: [],
    timestamp: new Date().toISOString(),
    containerInfo: {
      id: containerId,
      childElementCount: container.children.length,
      hasIframe: false,
      hasShadowRoot: false,
      topLevelClasses: [],
      topLevelIds: []
    },
    selectors: {}
  };

  // Check for iframes
  const iframes = container.querySelectorAll('iframe');
  if (iframes.length > 0) {
    diagnostics.renderingMode = 'iframe';
    diagnostics.containerInfo.hasIframe = true;
    diagnostics.selectors.iframes = Array.from(iframes).map((iframe) => {
      const src = iframe.getAttribute('src') || 'no-src';
      const id = iframe.id || 'no-id';
      return `iframe#${id}[src="${src.substring(0, 50)}..."]`;
    });
    diagnostics.evidence.push(
      `Found ${iframes.length} iframe(s)`,
      `First iframe src: ${iframes[0].src?.substring(0, 100) || 'none'}`
    );
  }

  // Check for Shadow DOM
  const elementsWithShadow: Element[] = [];
  const allElements = container.querySelectorAll('*');
  allElements.forEach((el) => {
    if (el.shadowRoot) {
      elementsWithShadow.push(el);
    }
  });

  if (elementsWithShadow.length > 0) {
    diagnostics.renderingMode = 'shadow-dom';
    diagnostics.containerInfo.hasShadowRoot = true;
    diagnostics.selectors.shadowHosts = elementsWithShadow.map((el) => {
      const tagName = el.tagName.toLowerCase();
      const id = el.id ? `#${el.id}` : '';
      const className = el.className ? `.${el.className.split(' ').join('.')}` : '';
      return `${tagName}${id}${className}`;
    });
    diagnostics.evidence.push(
      `Found ${elementsWithShadow.length} element(s) with Shadow DOM`,
      `Shadow hosts: ${diagnostics.selectors.shadowHosts.join(', ')}`
    );
  }

  // Check for direct DOM elements
  if (diagnostics.renderingMode === 'unknown' && container.children.length > 0) {
    diagnostics.renderingMode = 'direct-dom';
    
    // Collect top-level element info
    const directElements: string[] = [];
    Array.from(container.children).forEach((child) => {
      if (child.id) {
        diagnostics.containerInfo.topLevelIds.push(child.id);
      }
      if (child.className) {
        const classes = child.className.split(' ').filter(Boolean);
        diagnostics.containerInfo.topLevelClasses.push(...classes);
      }
      
      const tagName = child.tagName.toLowerCase();
      const id = child.id ? `#${child.id}` : '';
      const className = child.className ? `.${child.className.split(' ')[0]}` : '';
      directElements.push(`${tagName}${id}${className}`);
    });
    
    diagnostics.selectors.directElements = directElements;
    diagnostics.evidence.push(
      `Found ${container.children.length} direct child element(s)`,
      `Top-level elements: ${directElements.slice(0, 5).join(', ')}`,
      `Unique classes: ${[...new Set(diagnostics.containerInfo.topLevelClasses)].slice(0, 10).join(', ')}`
    );
  }

  // Additional checks for AppFolio-specific elements
  const appfolioClasses = container.querySelectorAll('[class*="appfolio"]');
  if (appfolioClasses.length > 0) {
    diagnostics.evidence.push(
      `Found ${appfolioClasses.length} elements with "appfolio" in class name`
    );
  }

  // Log findings
  log('APPFOLIO DIAGNOSE: Analysis complete', {
    mode: diagnostics.renderingMode,
    evidence: diagnostics.evidence
  });

  console.group('🔍 AppFolio Rendering Diagnostics');
  console.log('Rendering Mode:', diagnostics.renderingMode);
  console.log('Container Info:', diagnostics.containerInfo);
  console.log('Evidence:', diagnostics.evidence);
  console.log('Selectors:', diagnostics.selectors);
  console.groupEnd();

  return diagnostics;
}

function createUnknownDiagnostics(reason: string): AppfolioDiagnostics {
  return {
    renderingMode: 'unknown',
    evidence: [reason],
    timestamp: new Date().toISOString(),
    containerInfo: {
      id: 'unknown',
      childElementCount: 0,
      hasIframe: false,
      hasShadowRoot: false,
      topLevelClasses: [],
      topLevelIds: []
    },
    selectors: {}
  };
}

/**
 * Generate markdown report from diagnostics
 */
export function generateMarkdownReport(diagnostics: AppfolioDiagnostics): string {
  const md: string[] = [];
  
  md.push('# AppFolio Rendering Analysis\n');
  md.push(`**Analysis Date:** ${new Date(diagnostics.timestamp).toLocaleString()}\n`);
  md.push(`**Rendering Mode:** \`${diagnostics.renderingMode}\`\n`);
  
  md.push('## Container Information\n');
  md.push('```json');
  md.push(JSON.stringify(diagnostics.containerInfo, null, 2));
  md.push('```\n');
  
  md.push('## Evidence\n');
  diagnostics.evidence.forEach((item) => {
    md.push(`- ${item}`);
  });
  md.push('');
  
  md.push('## Detected Selectors\n');
  
  if (diagnostics.selectors.iframes && diagnostics.selectors.iframes.length > 0) {
    md.push('### Iframes\n');
    md.push('```');
    diagnostics.selectors.iframes.forEach((selector) => {
      md.push(selector);
    });
    md.push('```\n');
  }
  
  if (diagnostics.selectors.shadowHosts && diagnostics.selectors.shadowHosts.length > 0) {
    md.push('### Shadow DOM Hosts\n');
    md.push('```');
    diagnostics.selectors.shadowHosts.forEach((selector) => {
      md.push(selector);
    });
    md.push('```\n');
  }
  
  if (diagnostics.selectors.directElements && diagnostics.selectors.directElements.length > 0) {
    md.push('### Direct DOM Elements\n');
    md.push('```');
    diagnostics.selectors.directElements.slice(0, 20).forEach((selector) => {
      md.push(selector);
    });
    if (diagnostics.selectors.directElements.length > 20) {
      md.push(`... and ${diagnostics.selectors.directElements.length - 20} more`);
    }
    md.push('```\n');
  }
  
  md.push('## Styling Recommendations\n');
  
  switch (diagnostics.renderingMode) {
    case 'iframe':
      md.push('- ⚠️ **Limited styling options**: Content is in an iframe');
      md.push('- Cannot directly style internal elements');
      md.push('- Can only style the iframe wrapper itself');
      md.push('- Consider: Using AppFolio API to render custom cards');
      break;
    case 'shadow-dom':
      md.push('- ⚠️ **Partial styling options**: Content uses Shadow DOM');
      md.push('- CSS custom properties (variables) may penetrate shadow boundary');
      md.push('- Direct element styling not possible');
      md.push('- Consider: Theme-based approach with CSS variables');
      break;
    case 'direct-dom':
      md.push('- ✅ **Full styling options**: Content in regular DOM');
      md.push('- Can target elements with CSS selectors');
      md.push('- Can add custom classes or wrappers');
      md.push('- Recommended: Scope styles carefully to avoid conflicts');
      break;
    default:
      md.push('- ❓ **Unknown rendering method**');
      md.push('- Widget may not have loaded yet');
      md.push('- Try running diagnosis after widget initialization');
  }
  
  return md.join('\n');
}
