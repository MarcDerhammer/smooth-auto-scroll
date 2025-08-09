import { useEffect, useRef } from "react";

export type SmoothAutoScrollOptions = {
  enabled?: boolean;
  containerRef: React.RefObject<HTMLElement>;
  innerRef: React.RefObject<HTMLElement>;
  pxPerSecond: number;
  bottomTolerance?: number;
  topTolerance?: number;
  capDtMs?: number;
  pauseEvents?: Array<keyof GlobalEventHandlersEventMap>;
  resumeEvents?: Array<keyof GlobalEventHandlersEventMap>;
  smoothingFactor?: number;
  accelerationTime?: number;
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
};

export function useSmoothAutoScroll({
  enabled = true,
  containerRef,
  innerRef,
  pxPerSecond,
  bottomTolerance = 1,
  topTolerance = 1,
  capDtMs = 16.67, // ~60fps for smoother updates
  pauseEvents = ["wheel", "touchmove", "keydown", "mousedown", "focus"],
  resumeEvents = ["mouseleave", "touchend", "touchcancel"],
  smoothingFactor = 0.1, // For smooth velocity changes
  accelerationTime = 1000, // 1 second to reach full speed
  direction = "down",
  startDirection = "down",
  reverseOnEnd = false,
  resumeDelay = 0,
  pauseOnHover = false,
  pauseOnFocus = false,
  startOffset = 0,
  endOffset = 0,
  respectReducedMotion = true,
  speedMultiplier = 1,
  // Callbacks
  onStart,
  onPause,
  onResume,
  onReachEnd,
  onReachTop,
  onDirectionChange,
}: SmoothAutoScrollOptions) {
  const rafIdRef = useRef<number | null>(null);
  const lastTsRef = useRef<number | null>(null);
  const accumRef = useRef(0);
  const pausedRef = useRef(false);
  const reachedEndRef = useRef(false);
  const reachedTopRef = useRef(false);
  const startTimeRef = useRef<number | null>(null);
  const currentVelocityRef = useRef(0);
  const targetVelocityRef = useRef(pxPerSecond);
  const currentDirectionRef = useRef<"down" | "up">(
    direction === "both" ? startDirection : direction
  );
  const hasStartedRef = useRef(false);
  const resumeTimeoutRef = useRef<number | null>(null);
  const reducedMotionRef = useRef(false);

  const resetVisualShift = () => {
    const inner = innerRef.current;
    if (inner) inner.style.transform = "";
  };

  // Check for reduced motion preference
  useEffect(() => {
    if (respectReducedMotion && typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      reducedMotionRef.current = mediaQuery.matches;

      const handleChange = (e: MediaQueryListEvent) => {
        reducedMotionRef.current = e.matches;
      };

      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }
  }, [respectReducedMotion]);

  useEffect(() => {
    if (!enabled) return;

    lastTsRef.current = null;
    accumRef.current = 0;
    pausedRef.current = false;
    reachedEndRef.current = false;
    reachedTopRef.current = false;
    startTimeRef.current = null;
    currentVelocityRef.current = 0;
    targetVelocityRef.current = pxPerSecond * speedMultiplier;
    currentDirectionRef.current =
      direction === "both" ? startDirection : direction;
    hasStartedRef.current = false;
    resetVisualShift();

    // Clear any pending resume timeout
    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current);
      resumeTimeoutRef.current = null;
    }

    const step = (ts: number) => {
      const el = containerRef.current;
      const inner = innerRef.current;
      if (!el || !inner) {
        rafIdRef.current = requestAnimationFrame(step);
        return;
      }

      if (lastTsRef.current == null) {
        lastTsRef.current = ts;
        startTimeRef.current = ts;
      }

      const dt = Math.min(ts - (lastTsRef.current ?? ts), capDtMs);
      lastTsRef.current = ts;

      // Skip animation if reduced motion is preferred
      if (respectReducedMotion && reducedMotionRef.current) {
        rafIdRef.current = requestAnimationFrame(step);
        return;
      }

      const currentDirection = currentDirectionRef.current;
      const isScrollingDown = currentDirection === "down";
      const canScroll = isScrollingDown
        ? !reachedEndRef.current
        : !reachedTopRef.current;

      if (!pausedRef.current && canScroll) {
        // Call onStart callback on first movement
        if (!hasStartedRef.current) {
          hasStartedRef.current = true;
          onStart?.();
        }

        // Smooth acceleration from 0 to target velocity
        const baseVelocity = pxPerSecond * speedMultiplier;
        let targetVelocity: number;

        if (accelerationTime <= 0) {
          // Instant full speed when accelerationTime is 0
          targetVelocity = baseVelocity * (isScrollingDown ? 1 : -1);
        } else {
          const elapsedTime = ts - (startTimeRef.current ?? ts);
          const accelerationProgress = Math.min(
            elapsedTime / accelerationTime,
            1
          );
          const easedProgress = 1 - Math.pow(1 - accelerationProgress, 3); // Cubic ease-out
          targetVelocity =
            baseVelocity * easedProgress * (isScrollingDown ? 1 : -1);
        }

        // Smooth velocity interpolation for responsive changes
        currentVelocityRef.current +=
          (targetVelocity - currentVelocityRef.current) * smoothingFactor;

        // Calculate smooth movement with fractional pixels
        const deltaPixels = (currentVelocityRef.current * dt) / 1000;
        accumRef.current += deltaPixels;

        const intDelta = Math.floor(Math.abs(accumRef.current));
        const frac = Math.abs(accumRef.current) - intDelta;

        if (intDelta > 0) {
          if (isScrollingDown) {
            el.scrollTop += intDelta;
          } else {
            el.scrollTop -= intDelta;
          }
          accumRef.current = accumRef.current >= 0 ? frac : -frac;
        }

        // Apply smooth visual offset for ultra-smooth motion
        const fracOffset = isScrollingDown ? -frac : frac;
        inner.style.transform = `translate3d(0, ${fracOffset}px, 0)`;

        // Check boundaries
        const scrollTop = el.scrollTop;
        const scrollHeight = el.scrollHeight;
        const clientHeight = el.clientHeight;

        const atBottom =
          scrollTop + clientHeight >=
          scrollHeight - bottomTolerance - endOffset;
        const atTop = scrollTop <= topTolerance + startOffset;

        if (isScrollingDown && atBottom) {
          reachedEndRef.current = true;
          onReachEnd?.();
          resetVisualShift();

          if (direction === "both" && reverseOnEnd) {
            currentDirectionRef.current = "up";
            reachedEndRef.current = false;
            startTimeRef.current = ts;
            onDirectionChange?.("up");
          }
        } else if (!isScrollingDown && atTop) {
          reachedTopRef.current = true;
          onReachTop?.();
          resetVisualShift();

          if (direction === "both" && reverseOnEnd) {
            currentDirectionRef.current = "down";
            reachedTopRef.current = false;
            startTimeRef.current = ts;
            onDirectionChange?.("down");
          }
        } else {
          // Reset boundary flags if we're no longer at the boundary
          if (reachedEndRef.current && !atBottom) {
            reachedEndRef.current = false;
          }
          if (reachedTopRef.current && !atTop) {
            reachedTopRef.current = false;
          }
        }
      }

      rafIdRef.current = requestAnimationFrame(step);
    };

    rafIdRef.current = requestAnimationFrame(step);
    return () => {
      if (rafIdRef.current != null) cancelAnimationFrame(rafIdRef.current);
      resetVisualShift();
    };
  }, [
    enabled,
    containerRef,
    innerRef,
    pxPerSecond,
    bottomTolerance,
    topTolerance,
    capDtMs,
    smoothingFactor,
    accelerationTime,
    direction,
    startDirection,
    reverseOnEnd,
    startOffset,
    endOffset,
    respectReducedMotion,
    speedMultiplier,
    onStart,
    onReachEnd,
    onReachTop,
    onDirectionChange,
  ]);

  // Update target velocity when pxPerSecond changes without restarting the entire animation
  useEffect(() => {
    targetVelocityRef.current = pxPerSecond;
  }, [pxPerSecond]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onUser = () => {
      if (!pausedRef.current) {
        onPause?.();
      }
      pausedRef.current = true;
      resetVisualShift();
      accumRef.current = 0;
      currentVelocityRef.current = 0;

      // Clear any pending resume timeout
      if (resumeTimeoutRef.current) {
        clearTimeout(resumeTimeoutRef.current);
        resumeTimeoutRef.current = null;
      }
    };

    const onScroll = () => {
      // Reset boundary flags if user scrolls away from boundaries
      if (el) {
        const scrollTop = el.scrollTop;
        const scrollHeight = el.scrollHeight;
        const clientHeight = el.clientHeight;

        const atBottom =
          scrollTop + clientHeight >=
          scrollHeight - bottomTolerance - endOffset;
        const atTop = scrollTop <= topTolerance + startOffset;

        if (reachedEndRef.current && !atBottom) {
          reachedEndRef.current = false;
        }
        if (reachedTopRef.current && !atTop) {
          reachedTopRef.current = false;
        }
      }
    };

    const onResumeEvent = () => {
      if (resumeDelay > 0) {
        resumeTimeoutRef.current = setTimeout(() => {
          if (pausedRef.current) {
            onResume?.();
          }
          pausedRef.current = false;
          lastTsRef.current = null;
          startTimeRef.current = null;
        }, resumeDelay);
      } else {
        if (pausedRef.current) {
          onResume?.();
        }
        pausedRef.current = false;
        lastTsRef.current = null;
        startTimeRef.current = null;
      }
    };

    const onHover = () => {
      if (pauseOnHover) {
        onUser();
      }
    };

    const onFocus = () => {
      if (pauseOnFocus) {
        onUser();
      }
    };

    for (const evt of pauseEvents) {
      el.addEventListener(evt, onUser, { passive: true });
    }
    for (const evt of resumeEvents) {
      el.addEventListener(evt, onResumeEvent, { passive: true });
    }
    el.addEventListener("scroll", onScroll, { passive: true });

    if (pauseOnHover) {
      el.addEventListener("mouseenter", onHover);
    }

    if (pauseOnFocus) {
      el.addEventListener("focus", onFocus, { passive: true });
    }

    const onVis = () => {
      if (document.hidden) {
        pausedRef.current = true;
      } else {
        pausedRef.current = false;
        lastTsRef.current = null;
        startTimeRef.current = null;
      }
    };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      for (const evt of pauseEvents) {
        el.removeEventListener(evt, onUser as any);
      }
      for (const evt of resumeEvents) {
        el.removeEventListener(evt, onResumeEvent as any);
      }
      el.removeEventListener("scroll", onScroll);

      if (pauseOnHover) {
        el.removeEventListener("mouseenter", onHover);
      }

      if (pauseOnFocus) {
        el.removeEventListener("focus", onFocus);
      }

      document.removeEventListener("visibilitychange", onVis);

      // Clear any pending timeouts
      if (resumeTimeoutRef.current) {
        clearTimeout(resumeTimeoutRef.current);
      }
    };
  }, [
    containerRef,
    pauseEvents,
    resumeEvents,
    bottomTolerance,
    topTolerance,
    endOffset,
    startOffset,
    resumeDelay,
    pauseOnHover,
    pauseOnFocus,
    onPause,
    onResume,
  ]);

  return {
    pause: () => {
      if (!pausedRef.current) {
        onPause?.();
      }
      pausedRef.current = true;
      resetVisualShift();
    },
    resume: () => {
      if (pausedRef.current) {
        onResume?.();
      }
      pausedRef.current = false;
      lastTsRef.current = null;
      startTimeRef.current = null;
    },
    reset: () => {
      accumRef.current = 0;
      reachedEndRef.current = false;
      reachedTopRef.current = false;
      hasStartedRef.current = false;
      currentDirectionRef.current =
        direction === "both" ? startDirection : direction;
      resetVisualShift();
    },
    changeDirection: (newDirection: "down" | "up") => {
      if (
        direction === "both" &&
        newDirection !== currentDirectionRef.current
      ) {
        currentDirectionRef.current = newDirection;
        startTimeRef.current = performance.now();
        reachedEndRef.current = false;
        reachedTopRef.current = false;
        onDirectionChange?.(newDirection);
      }
    },
    get paused() {
      return pausedRef.current;
    },
    get reachedEnd() {
      return reachedEndRef.current;
    },
    get reachedTop() {
      return reachedTopRef.current;
    },
    get currentDirection() {
      return currentDirectionRef.current;
    },
    get hasStarted() {
      return hasStartedRef.current;
    },
  };
}
