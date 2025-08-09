import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { AutoScrollContainer } from "../AutoScrollContainer";

// Mock the hook since we're testing the component wrapper
jest.mock("../useSmoothAutoScroll", () => ({
  useSmoothAutoScroll: jest.fn(() => ({
    pause: jest.fn(),
    resume: jest.fn(),
    reset: jest.fn(),
    changeDirection: jest.fn(),
  })),
}));

import { useSmoothAutoScroll } from "../useSmoothAutoScroll";

const mockUseSmoothAutoScroll = useSmoothAutoScroll as jest.MockedFunction<
  typeof useSmoothAutoScroll
>;

describe("AutoScrollContainer", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseSmoothAutoScroll.mockReturnValue({
      pause: jest.fn(),
      resume: jest.fn(),
      reset: jest.fn(),

      paused: false,

      currentDirection: "down",
      hasStarted: false,
    });
  });

  describe("Basic Rendering", () => {
    test("should render children correctly", () => {
      render(
        <AutoScrollContainer pxPerSecond={50}>
          <div data-testid="child">Test Content</div>
        </AutoScrollContainer>
      );

      expect(screen.getByTestId("child")).toBeInTheDocument();
      expect(screen.getByText("Test Content")).toBeInTheDocument();
    });

    test("should apply custom className", () => {
      render(
        <AutoScrollContainer pxPerSecond={50} className="custom-class">
          <div>Content</div>
        </AutoScrollContainer>
      );

      const container =
        screen.getByText("Content").parentElement?.parentElement;
      expect(container).toHaveClass("custom-class");
    });

    test("should apply custom styles", () => {
      const customStyle = { backgroundColor: "red", padding: "20px" };

      render(
        <AutoScrollContainer pxPerSecond={50} style={customStyle}>
          <div>Content</div>
        </AutoScrollContainer>
      );

      const container =
        screen.getByText("Content").parentElement?.parentElement;
      expect(container).toHaveStyle("background-color: red");
      expect(container).toHaveStyle("padding: 20px");
    });
  });

  describe("Hook Integration", () => {
    test("should call useSmoothAutoScroll with correct default props", () => {
      render(
        <AutoScrollContainer pxPerSecond={100}>
          <div>Content</div>
        </AutoScrollContainer>
      );

      expect(mockUseSmoothAutoScroll).toHaveBeenCalledWith(
        expect.objectContaining({
          enabled: true,
          pxPerSecond: 100,
          containerRef: expect.any(Object),
          innerRef: expect.any(Object),
        })
      );
    });

    test("should pass all props to useSmoothAutoScroll", () => {
      const props = {
        enabled: false,
        pxPerSecond: 75,
        direction: "up" as const,
        bottomTolerance: 5,
        topTolerance: 10,
        smoothingFactor: 0.2,
        accelerationTime: 2000,
        pauseOnHover: true,
        pauseOnFocus: true,
        resumeDelay: 500,

        startOffset: 20,
        endOffset: 30,
        respectReducedMotion: false,

        onStart: jest.fn(),
        onPause: jest.fn(),
        onResume: jest.fn(),
        onReachEnd: jest.fn(),
        onReachTop: jest.fn(),
      };

      render(
        <AutoScrollContainer {...props}>
          <div>Content</div>
        </AutoScrollContainer>
      );

      expect(mockUseSmoothAutoScroll).toHaveBeenCalledWith(
        expect.objectContaining(props)
      );
    });

    test("should use external containerRef when provided", () => {
      const externalRef = React.createRef<HTMLDivElement>();

      render(
        <AutoScrollContainer pxPerSecond={50} containerRef={externalRef}>
          <div>Content</div>
        </AutoScrollContainer>
      );

      expect(mockUseSmoothAutoScroll).toHaveBeenCalledWith(
        expect.objectContaining({
          containerRef: externalRef,
        })
      );
    });
  });

  describe("DOM Structure and Styling", () => {
    test("should create proper DOM structure", () => {
      render(
        <AutoScrollContainer pxPerSecond={50} data-testid="container">
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

    test("should apply scroll styles to outer container when no external ref", async () => {
      render(
        <AutoScrollContainer pxPerSecond={50}>
          <div data-testid="content">Content</div>
        </AutoScrollContainer>
      );

      const content = screen.getByTestId("content");
      const outerDiv = content.parentElement?.parentElement;

      await waitFor(() => {
        expect(outerDiv).toHaveStyle("overflow-y: auto");
        expect(outerDiv).toHaveStyle("will-change: transform");
      });
    });

    test("should apply animation styles to inner container", async () => {
      render(
        <AutoScrollContainer pxPerSecond={50}>
          <div data-testid="content">Content</div>
        </AutoScrollContainer>
      );

      const content = screen.getByTestId("content");
      const innerDiv = content.parentElement;

      await waitFor(() => {
        expect(innerDiv).toHaveStyle("will-change: transform");
      });

      // These styles might not be reflected in jsdom properly, so just check they exist
      expect(innerDiv?.style.willChange).toBe("transform");
    });

    test("should not apply scroll styles when external containerRef is provided", async () => {
      const externalRef = React.createRef<HTMLDivElement>();

      render(
        <AutoScrollContainer pxPerSecond={50} containerRef={externalRef}>
          <div data-testid="content">Content</div>
        </AutoScrollContainer>
      );

      const content = screen.getByTestId("content");
      const outerDiv = content.parentElement?.parentElement;

      // Should not have overflow-y auto when using external ref
      expect(outerDiv).not.toHaveStyle("overflow-y: auto");
    });
  });

  describe("Event Handling", () => {
    test("should handle pause events correctly", () => {
      const mockControls = {
        pause: jest.fn(),
        resume: jest.fn(),
        reset: jest.fn(),

        paused: false,

        currentDirection: "down" as const,
        hasStarted: false,
      };

      mockUseSmoothAutoScroll.mockReturnValue(mockControls);

      render(
        <AutoScrollContainer pxPerSecond={50} pauseEvents={["click"]}>
          <div data-testid="content">Content</div>
        </AutoScrollContainer>
      );

      // The hook should be called with the pause events
      expect(mockUseSmoothAutoScroll).toHaveBeenCalledWith(
        expect.objectContaining({
          pauseEvents: ["click"],
        })
      );
    });

    test("should handle resume events correctly", () => {
      render(
        <AutoScrollContainer pxPerSecond={50} resumeEvents={["mouseout"]}>
          <div>Content</div>
        </AutoScrollContainer>
      );

      expect(mockUseSmoothAutoScroll).toHaveBeenCalledWith(
        expect.objectContaining({
          resumeEvents: ["mouseout"],
        })
      );
    });
  });

  describe("Callback Integration", () => {
    test("should call onStart callback", () => {
      const onStart = jest.fn();

      render(
        <AutoScrollContainer pxPerSecond={50} onStart={onStart}>
          <div>Content</div>
        </AutoScrollContainer>
      );

      expect(mockUseSmoothAutoScroll).toHaveBeenCalledWith(
        expect.objectContaining({
          onStart,
        })
      );
    });

    test("should call onPause callback", () => {
      const onPause = jest.fn();

      render(
        <AutoScrollContainer pxPerSecond={50} onPause={onPause}>
          <div>Content</div>
        </AutoScrollContainer>
      );

      expect(mockUseSmoothAutoScroll).toHaveBeenCalledWith(
        expect.objectContaining({
          onPause,
        })
      );
    });

    test("should call onResume callback", () => {
      const onResume = jest.fn();

      render(
        <AutoScrollContainer pxPerSecond={50} onResume={onResume}>
          <div>Content</div>
        </AutoScrollContainer>
      );

      expect(mockUseSmoothAutoScroll).toHaveBeenCalledWith(
        expect.objectContaining({
          onResume,
        })
      );
    });

    test("should call boundary callbacks", () => {
      const onReachEnd = jest.fn();
      const onReachTop = jest.fn();

      render(
        <AutoScrollContainer
          pxPerSecond={50}
          onReachEnd={onReachEnd}
          onReachTop={onReachTop}
        >
          <div>Content</div>
        </AutoScrollContainer>
      );

      expect(mockUseSmoothAutoScroll).toHaveBeenCalledWith(
        expect.objectContaining({
          onReachEnd,
          onReachTop,
        })
      );
    });
  });

  describe("Accessibility", () => {
    test("should be accessible with screen readers", () => {
      render(
        <AutoScrollContainer pxPerSecond={50}>
          <div role="main" aria-label="Scrolling content">
            <h1>Accessible Content</h1>
            <p>This content scrolls automatically</p>
          </div>
        </AutoScrollContainer>
      );

      expect(screen.getByRole("main")).toBeInTheDocument();
      expect(screen.getByLabelText("Scrolling content")).toBeInTheDocument();
    });

    test("should respect reduced motion preference", () => {
      render(
        <AutoScrollContainer pxPerSecond={50} respectReducedMotion={true}>
          <div>Content</div>
        </AutoScrollContainer>
      );

      expect(mockUseSmoothAutoScroll).toHaveBeenCalledWith(
        expect.objectContaining({
          respectReducedMotion: true,
        })
      );
    });
  });

  describe("Performance", () => {
    test("should handle large content efficiently", () => {
      const largeContent = Array.from({ length: 1000 }, (_, i) => (
        <div key={i}>Item {i}</div>
      ));

      const { container } = render(
        <AutoScrollContainer pxPerSecond={50}>
          {largeContent}
        </AutoScrollContainer>
      );

      // Should render without performance issues
      expect(container.children.length).toBe(1);
      expect(screen.getByText("Item 0")).toBeInTheDocument();
      expect(screen.getByText("Item 999")).toBeInTheDocument();
    });

    test("should optimize with will-change properties", async () => {
      render(
        <AutoScrollContainer pxPerSecond={50}>
          <div data-testid="content">Content</div>
        </AutoScrollContainer>
      );

      const content = screen.getByTestId("content");
      const innerDiv = content.parentElement;
      const outerDiv = innerDiv?.parentElement;

      await waitFor(() => {
        expect(outerDiv).toHaveStyle("will-change: transform");
        expect(innerDiv).toHaveStyle("will-change: transform");
      });
    });
  });

  describe("Edge Cases", () => {
    test("should handle empty children", () => {
      expect(() => {
        render(
          <AutoScrollContainer pxPerSecond={50}>{null}</AutoScrollContainer>
        );
      }).not.toThrow();
    });

    test("should handle multiple children", () => {
      render(
        <AutoScrollContainer pxPerSecond={50}>
          <div data-testid="child1">Child 1</div>
          <div data-testid="child2">Child 2</div>
          <span data-testid="child3">Child 3</span>
        </AutoScrollContainer>
      );

      expect(screen.getByTestId("child1")).toBeInTheDocument();
      expect(screen.getByTestId("child2")).toBeInTheDocument();
      expect(screen.getByTestId("child3")).toBeInTheDocument();
    });

    test("should handle zero pxPerSecond", () => {
      render(
        <AutoScrollContainer pxPerSecond={0}>
          <div>Content</div>
        </AutoScrollContainer>
      );

      expect(mockUseSmoothAutoScroll).toHaveBeenCalledWith(
        expect.objectContaining({
          pxPerSecond: 0,
        })
      );
    });

    test("should handle negative pxPerSecond", () => {
      render(
        <AutoScrollContainer pxPerSecond={-50}>
          <div>Content</div>
        </AutoScrollContainer>
      );

      expect(mockUseSmoothAutoScroll).toHaveBeenCalledWith(
        expect.objectContaining({
          pxPerSecond: -50,
        })
      );
    });
  });
});
