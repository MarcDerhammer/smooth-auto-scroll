import React, { useEffect, useRef } from "react";
import { useSmoothAutoScroll } from "./useSmoothAutoScroll";

export type AutoScrollContainerProps = {
  containerRef?: React.RefObject<HTMLElement>;
  enabled?: boolean;
  pxPerSecond: number;
  bottomTolerance?: number;
  topTolerance?: number;
  capDtMs?: number;
  smoothingFactor?: number;
  accelerationTime?: number;
  pauseEvents?: Array<keyof GlobalEventHandlersEventMap>;
  resumeEvents?: Array<keyof GlobalEventHandlersEventMap>;
  direction?: "down" | "up" | "both";
  startDirection?: "down" | "up";
  reverseOnEnd?: boolean;
  resumeDelay?: number;
  pauseOnHover?: boolean;
  pauseOnFocus?: boolean;
  startOffset?: number;
  endOffset?: number;
  respectReducedMotion?: boolean;
  speedMultiplier?: number;
  // Callbacks
  onStart?: () => void;
  onPause?: () => void;
  onResume?: () => void;
  onReachEnd?: () => void;
  onReachTop?: () => void;
  onDirectionChange?: (direction: "down" | "up") => void;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
};

export const AutoScrollContainer: React.FC<AutoScrollContainerProps> = ({
  containerRef,
  enabled = true,
  pxPerSecond,
  bottomTolerance,
  topTolerance,
  capDtMs,
  smoothingFactor,
  accelerationTime,
  pauseEvents,
  resumeEvents,
  direction,
  startDirection,
  reverseOnEnd,
  resumeDelay,
  pauseOnHover,
  pauseOnFocus,
  startOffset,
  endOffset,
  respectReducedMotion,
  speedMultiplier,
  // Callbacks
  onStart,
  onPause,
  onResume,
  onReachEnd,
  onReachTop,
  onDirectionChange,
  className,
  style,
  children,
}) => {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const scrollOwnerRef =
    containerRef ?? (outerRef as React.RefObject<HTMLElement>);

  useSmoothAutoScroll({
    enabled,
    containerRef: scrollOwnerRef,
    innerRef: innerRef as React.RefObject<HTMLElement>,
    pxPerSecond,
    bottomTolerance,
    topTolerance,
    capDtMs,
    smoothingFactor,
    accelerationTime,
    pauseEvents,
    resumeEvents,
    direction,
    startDirection,
    reverseOnEnd,
    resumeDelay,
    pauseOnHover,
    pauseOnFocus,
    startOffset,
    endOffset,
    respectReducedMotion,
    speedMultiplier,
    // Callbacks
    onStart,
    onPause,
    onResume,
    onReachEnd,
    onReachTop,
    onDirectionChange,
  });

  useEffect(() => {
    if (!containerRef && outerRef.current) {
      outerRef.current.style.overflowY = "auto";
      outerRef.current.style.willChange = "transform";
    }

    // Set up smooth animation styles
    if (innerRef.current) {
      innerRef.current.style.willChange = "transform";
      innerRef.current.style.backfaceVisibility = "hidden";
      innerRef.current.style.perspective = "1000px";
    }
  }, [containerRef]);

  return (
    <div ref={outerRef} className={className} style={style}>
      <div ref={innerRef}>{children}</div>
    </div>
  );
};
