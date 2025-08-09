import React from "react";
import { renderHook, act } from "@testing-library/react";
import { render, screen } from "@testing-library/react";
import { useSmoothAutoScroll } from "../useSmoothAutoScroll";
import { AutoScrollContainer } from "../AutoScrollContainer";

// Simple mock refs helper
const createMockRefs = () => {
  const containerElement = document.createElement("div");
  const innerElement = document.createElement("div");

  const containerRef = { current: containerElement };
  const innerRef = { current: innerElement };

  return { containerRef, innerRef, containerElement, innerElement };
};

describe("Core Functionality Tests", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe("Hook Initialization", () => {
    test("should return control functions", () => {
      const { containerRef, innerRef } = createMockRefs();

      const { result } = renderHook(() =>
        useSmoothAutoScroll({
          containerRef,
          innerRef,
          pxPerSecond: 50,
        })
      );

      expect(result.current.pause).toBeInstanceOf(Function);
      expect(result.current.resume).toBeInstanceOf(Function);
      expect(result.current.reset).toBeInstanceOf(Function);
    });

    test("should return state getters", () => {
      const { containerRef, innerRef } = createMockRefs();

      const { result } = renderHook(() =>
        useSmoothAutoScroll({
          containerRef,
          innerRef,
          pxPerSecond: 50,
        })
      );

      expect(typeof result.current.paused).toBe("boolean");

      expect(typeof result.current.currentDirection).toBe("string");
      expect(typeof result.current.hasStarted).toBe("boolean");
    });

    test("should handle disabled state", () => {
      const { containerRef, innerRef } = createMockRefs();
      const onStart = jest.fn();

      renderHook(() =>
        useSmoothAutoScroll({
          enabled: false,
          containerRef,
          innerRef,
          pxPerSecond: 50,
          onStart,
        })
      );

      act(() => {
        jest.advanceTimersByTime(1000);
      });

      expect(onStart).not.toHaveBeenCalled();
    });
  });

  describe("Control Functions", () => {
    test("should pause and resume", () => {
      const { containerRef, innerRef } = createMockRefs();
      const onPause = jest.fn();
      const onResume = jest.fn();

      const { result } = renderHook(() =>
        useSmoothAutoScroll({
          containerRef,
          innerRef,
          pxPerSecond: 50,
          onPause,
          onResume,
        })
      );

      expect(result.current.paused).toBe(false);

      act(() => {
        result.current.pause();
      });

      expect(result.current.paused).toBe(true);
      expect(onPause).toHaveBeenCalledTimes(1);

      act(() => {
        result.current.resume();
      });

      expect(result.current.paused).toBe(false);
      expect(onResume).toHaveBeenCalledTimes(1);
    });

    test("should reset state", () => {
      const { containerRef, innerRef, innerElement } = createMockRefs();

      const { result } = renderHook(() =>
        useSmoothAutoScroll({
          containerRef,
          innerRef,
          pxPerSecond: 50,
        })
      );

      // Pause first to change state
      act(() => {
        result.current.pause();
      });

      expect(result.current.paused).toBe(true);

      act(() => {
        result.current.reset();
      });

      expect(result.current.hasStarted).toBe(false);

      expect(innerElement.style.transform).toBe("");
    });
  });

  describe("Event Handling", () => {
    test("should add event listeners", () => {
      const { containerRef, innerRef, containerElement } = createMockRefs();
      const addEventListenerSpy = jest.spyOn(
        containerElement,
        "addEventListener"
      );

      renderHook(() =>
        useSmoothAutoScroll({
          containerRef,
          innerRef,
          pxPerSecond: 50,
          pauseEvents: ["wheel"],
          resumeEvents: ["mouseleave"],
        })
      );

      expect(addEventListenerSpy).toHaveBeenCalledWith(
        "wheel",
        expect.any(Function),
        expect.any(Object)
      );
      expect(addEventListenerSpy).toHaveBeenCalledWith(
        "mouseleave",
        expect.any(Function),
        expect.any(Object)
      );
    });

    test("should remove event listeners on unmount", () => {
      const { containerRef, innerRef, containerElement } = createMockRefs();
      const removeEventListenerSpy = jest.spyOn(
        containerElement,
        "removeEventListener"
      );

      const { unmount } = renderHook(() =>
        useSmoothAutoScroll({
          containerRef,
          innerRef,
          pxPerSecond: 50,
          pauseEvents: ["wheel"],
        })
      );

      unmount();

      expect(removeEventListenerSpy).toHaveBeenCalledWith(
        "wheel",
        expect.any(Function)
      );
    });

    test("should handle user events", () => {
      const { containerRef, innerRef, containerElement } = createMockRefs();
      const onPause = jest.fn();

      const { result } = renderHook(() =>
        useSmoothAutoScroll({
          containerRef,
          innerRef,
          pxPerSecond: 50,
          pauseEvents: ["wheel"],
          onPause,
        })
      );

      expect(result.current.paused).toBe(false);

      act(() => {
        containerElement.dispatchEvent(new Event("wheel"));
      });

      expect(result.current.paused).toBe(true);
      expect(onPause).toHaveBeenCalledTimes(1);
    });
  });

  describe("Reduced Motion Support", () => {
    test("should respect reduced motion preference", () => {
      // Mock matchMedia to return reduced motion preference
      const mockMatchMedia = jest.fn().mockImplementation(() => ({
        matches: true,
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
      }));

      Object.defineProperty(window, "matchMedia", {
        writable: true,
        value: mockMatchMedia,
      });

      const { containerRef, innerRef } = createMockRefs();
      const onStart = jest.fn();

      renderHook(() =>
        useSmoothAutoScroll({
          containerRef,
          innerRef,
          pxPerSecond: 50,
          respectReducedMotion: true,
          onStart,
        })
      );

      act(() => {
        jest.advanceTimersByTime(1000);
      });

      // Should not start when reduced motion is preferred
      expect(onStart).not.toHaveBeenCalled();
    });
  });

  describe("Error Handling", () => {
    test("should handle null refs gracefully", () => {
      const containerRef = { current: null };
      const innerRef = { current: null };

      expect(() => {
        renderHook(() =>
          useSmoothAutoScroll({
            containerRef,
            innerRef,
            pxPerSecond: 50,
          })
        );
      }).not.toThrow();
    });
  });

  describe("AutoScrollContainer Component", () => {
    test("should render children", () => {
      render(
        <AutoScrollContainer pxPerSecond={50}>
          <div data-testid="child">Test Content</div>
        </AutoScrollContainer>
      );

      expect(screen.getByTestId("child")).toBeInTheDocument();
    });

    test("should apply className and styles", () => {
      render(
        <AutoScrollContainer
          pxPerSecond={50}
          className="test-class"
          style={{ backgroundColor: "red" }}
        >
          <div data-testid="child">Content</div>
        </AutoScrollContainer>
      );

      const child = screen.getByTestId("child");
      const container = child.parentElement?.parentElement;

      expect(container).toHaveClass("test-class");
      expect(container).toHaveStyle("background-color: red");
    });

    test("should create proper DOM structure", () => {
      render(
        <AutoScrollContainer pxPerSecond={50}>
          <div data-testid="content">Test Content</div>
        </AutoScrollContainer>
      );

      const content = screen.getByTestId("content");
      const innerDiv = content.parentElement;
      const outerDiv = innerDiv?.parentElement;

      expect(outerDiv).toBeInTheDocument();
      expect(innerDiv).toBeInTheDocument();
      expect(content).toBeInTheDocument();
    });
  });

  describe("Configuration Options", () => {
    test("should accept all configuration options", () => {
      const { containerRef, innerRef } = createMockRefs();
      const callbacks = {
        onStart: jest.fn(),
        onPause: jest.fn(),
        onResume: jest.fn(),
        onReachEnd: jest.fn(),
        onReachTop: jest.fn(),
        onDirectionChange: jest.fn(),
      };

      expect(() => {
        renderHook(() =>
          useSmoothAutoScroll({
            containerRef,
            innerRef,
            pxPerSecond: 100,
            enabled: true,
            direction: "down",

            bottomTolerance: 5,
            topTolerance: 10,
            capDtMs: 16.67,
            smoothingFactor: 0.2,
            accelerationTime: 2000,

            resumeDelay: 500,
            pauseOnHover: true,
            pauseOnFocus: true,
            startOffset: 20,
            endOffset: 30,
            respectReducedMotion: false,

            pauseEvents: ["wheel", "touchstart"],
            resumeEvents: ["mouseleave", "touchend"],
            ...callbacks,
          })
        );
      }).not.toThrow();
    });

    test("should handle edge case values", () => {
      const { containerRef, innerRef } = createMockRefs();

      expect(() => {
        renderHook(() =>
          useSmoothAutoScroll({
            containerRef,
            innerRef,
            pxPerSecond: 0, // Zero speed
            accelerationTime: 0, // Instant acceleration
          })
        );
      }).not.toThrow();
    });
  });
});
