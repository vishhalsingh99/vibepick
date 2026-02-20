const isDev = process.env.NODE_ENV === "development";

export const logger = {
  log: (...args: any[]) => {
    if (isDev) console.log(...args);
  },
  info: (...args: any[]) => {
    if (isDev) console.info(...args);
  },
  warn: (...args: any[]) => {
    if (isDev) console.warn(...args);
    else console.warn(...args); // warning production mein bhi rakh sakte ho
  },
  error: (...args: any[]) => {
    console.error(...args); // error hamesha dikhega (production + dev)
  },
  debug: (...args: any[]) => {
    if (isDev) console.debug(...args);
  },
};