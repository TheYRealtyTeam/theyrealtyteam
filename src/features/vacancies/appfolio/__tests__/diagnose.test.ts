import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { diagnoseAppfolioRendering, generateMarkdownReport } from '../diagnose';

describe('AppFolio Diagnostics', () => {
  let container: HTMLDivElement;

  beforeEach(() => {
    container = document.createElement('div');
    container.id = 'appfolio-root';
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  it('detects iframe rendering', async () => {
    const iframe = document.createElement('iframe');
    iframe.src = 'https://example.com';
    container.appendChild(iframe);

    const result = await diagnoseAppfolioRendering('appfolio-root');

    expect(result.renderingMode).toBe('iframe');
    expect(result.containerInfo.hasIframe).toBe(true);
    expect(result.selectors.iframes).toBeDefined();
    expect(result.selectors.iframes?.length).toBeGreaterThan(0);
  });

  it('detects direct DOM rendering', async () => {
    const div = document.createElement('div');
    div.className = 'appfolio-listing';
    div.id = 'listing-1';
    container.appendChild(div);

    const result = await diagnoseAppfolioRendering('appfolio-root');

    expect(result.renderingMode).toBe('direct-dom');
    expect(result.containerInfo.childElementCount).toBe(1);
    expect(result.selectors.directElements).toBeDefined();
    expect(result.selectors.directElements?.length).toBeGreaterThan(0);
  });

  it('detects shadow DOM rendering', async () => {
    const host = document.createElement('div');
    host.attachShadow({ mode: 'open' });
    container.appendChild(host);

    const result = await diagnoseAppfolioRendering('appfolio-root');

    expect(result.renderingMode).toBe('shadow-dom');
    expect(result.containerInfo.hasShadowRoot).toBe(true);
    expect(result.selectors.shadowHosts).toBeDefined();
  });

  it('handles missing container gracefully', async () => {
    const result = await diagnoseAppfolioRendering('non-existent-container');

    expect(result.renderingMode).toBe('unknown');
    expect(result.evidence).toContain('Container not found');
  });

  it('generates valid markdown report', async () => {
    const div = document.createElement('div');
    div.className = 'test-element';
    container.appendChild(div);

    const diagnostics = await diagnoseAppfolioRendering('appfolio-root');
    const markdown = generateMarkdownReport(diagnostics);

    expect(markdown).toContain('# AppFolio Rendering Analysis');
    expect(markdown).toContain('**Rendering Mode:**');
    expect(markdown).toContain('## Container Information');
    expect(markdown).toContain('## Evidence');
    expect(markdown).toContain('## Styling Recommendations');
  });

  it('includes timestamp in diagnostics', async () => {
    const result = await diagnoseAppfolioRendering('appfolio-root');

    expect(result.timestamp).toBeDefined();
    expect(new Date(result.timestamp).getTime()).toBeGreaterThan(0);
  });

  it('collects top-level class names for direct DOM', async () => {
    const div1 = document.createElement('div');
    div1.className = 'appfolio-card property-listing';
    const div2 = document.createElement('div');
    div2.className = 'appfolio-filter';
    container.appendChild(div1);
    container.appendChild(div2);

    const result = await diagnoseAppfolioRendering('appfolio-root');

    expect(result.containerInfo.topLevelClasses).toContain('appfolio-card');
    expect(result.containerInfo.topLevelClasses).toContain('property-listing');
    expect(result.containerInfo.topLevelClasses).toContain('appfolio-filter');
  });
});
