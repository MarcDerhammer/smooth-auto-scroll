import React, { useRef } from "react";
import { useSmoothAutoScroll } from "../../src";
import { DemoConfig } from "../types";
import { generateContent } from "../utils/contentGenerator";

interface HookDemoProps {
  config: DemoConfig;
}

export const HookDemo: React.FC<HookDemoProps> = ({ config }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useSmoothAutoScroll({
    containerRef,
    innerRef,
    pxPerSecond: config.speed,
    enabled: config.enabled,
    accelerationTime: config.accelerationTime,
    smoothingFactor: config.smoothingFactor,
    capDtMs: config.capDtMs,
    direction: config.direction,
    bottomTolerance: config.bottomTolerance,
    topTolerance: config.topTolerance,
    startOffset: config.startOffset,
    endOffset: config.endOffset,
    resumeDelay: config.resumeDelay,
    pauseOnHover: config.pauseOnHover,
    pauseOnFocus: config.pauseOnFocus,
    respectReducedMotion: config.respectReducedMotion,
    pauseEvents: config.pauseEvents,
    resumeEvents: config.resumeEvents,
  });

  return (
    <div
      className="scroll-container"
      ref={containerRef}
      style={{ height: "300px", overflowY: "auto", willChange: "transform" }}
    >
      <div ref={innerRef} className="content">
        <h3>useSmoothAutoScroll Hook Demo</h3>
        {generateContent()}
      </div>
    </div>
  );
};
