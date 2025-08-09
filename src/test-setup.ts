import "@testing-library/jest-dom";

// Mock requestAnimationFrame and cancelAnimationFrame
(
  globalThis as unknown as {
    requestAnimationFrame: (callback: FrameRequestCallback) => number;
  }
).requestAnimationFrame = (callback: FrameRequestCallback) => {
  return setTimeout(() => callback(Date.now()), 16);
};

(
  globalThis as unknown as { cancelAnimationFrame: (id: number) => void }
).cancelAnimationFrame = (id: number) => {
  if (typeof clearTimeout !== "undefined") {
    clearTimeout(id);
  }
};

// Mock matchMedia for reduced motion tests
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock IntersectionObserver
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(globalThis as any).IntersectionObserver = class IntersectionObserver {
  constructor() {}
  observe() {
    return null;
  }
  disconnect() {
    return null;
  }
  unobserve() {
    return null;
  }
};

// Mock ResizeObserver
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(globalThis as any).ResizeObserver = class ResizeObserver {
  constructor() {}
  observe() {
    return null;
  }
  disconnect() {
    return null;
  }
  unobserve() {
    return null;
  }
};

// Mock console methods to reduce test noise
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(globalThis as any).console = {
  ...console,
  warn: jest.fn(),
  error: jest.fn(),
};
