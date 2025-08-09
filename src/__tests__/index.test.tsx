/**
 * @jest-environment jsdom
 */

import { useSmoothAutoScroll, AutoScrollContainer } from "../index";

describe("Package Exports", () => {
  test("should export useSmoothAutoScroll", () => {
    expect(useSmoothAutoScroll).toBeDefined();
    expect(typeof useSmoothAutoScroll).toBe("function");
  });

  test("should export AutoScrollContainer", () => {
    expect(AutoScrollContainer).toBeDefined();
    expect(typeof AutoScrollContainer).toBe("function");
  });
});
