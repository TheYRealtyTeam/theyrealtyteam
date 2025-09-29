// src/features/vacancies/appfolio/init.ts
declare global {
  interface Window {
    Appfolio?: {
      Listing: (opts: Record<string, unknown>) => void;
    };
  }
}

const ROOT_SELECTOR = '#appfolio-root';

function sleep(ms: number) {
  return new Promise((res) => setTimeout(res, ms));
}

function getRoot(): HTMLElement | null {
  return document.querySelector(ROOT_SELECTOR) as HTMLElement | null;
}

function moveIframeIntoRoot(): boolean {
  const root = getRoot();
  if (!root) return false;

  // Prefer iframe under our root; otherwise match AppFolio iframes by src/id.
  const iframe =
    root.querySelector('iframe') ||
    document.querySelector('iframe[src*="listings.cdn.appfolio.com"], iframe[id^="af_iframe_"]');

  if (iframe && iframe.parentElement !== root) {
    root.appendChild(iframe);
    return true;
  }
  return !!iframe;
}

async function waitForAppfolioApi(timeoutMs = 6000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    if (window.Appfolio?.Listing) return true;
    await sleep(100);
  }
  return false;
}

export async function initAppFolio() {
  const root = getRoot();
  if (!root) return;

  const apiReady = await waitForAppfolioApi();
  if (!apiReady) return;

  // Initialize with responsive height and newest-first sorting
  try {
    window.Appfolio!.Listing({
      hostUrl: 'theyteam.appfolio.com',
      themeColor: '#676767',
      width: '100%',
      height: 'auto',
      defaultOrder: 'date_posted',
    });
  } catch {
    // If init throws, we will still try to locate and move the iframe below.
  }

  // Retry up to 10 times (every 100ms) to ensure the iframe ends up in our container
  for (let i = 0; i < 10; i++) {
    await sleep(100);
    if (moveIframeIntoRoot()) break;
  }
}
