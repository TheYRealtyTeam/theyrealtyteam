/**
 * Development logger utility
 * Logs only in development mode to reduce production console spam
 */

export const log = (...args: any[]) => {
  if (import.meta.env.DEV) {
    console.log(...args);
  }
};

export const warn = (...args: any[]) => {
  if (import.meta.env.DEV) {
    console.warn(...args);
  }
};

export const error = (...args: any[]) => {
  console.error(...args);
};
