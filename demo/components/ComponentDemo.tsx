import React from "react";
import { AutoScrollContainer } from "smooth-auto-scroll";
import { DemoConfig } from "../types";
import { generateContent } from "../utils/contentGenerator";

interface ComponentDemoProps {
  config: DemoConfig;
}

export const ComponentDemo: React.FC<ComponentDemoProps> = ({ config }) => {
  return (
    <div className="scroll-container" style={{ height: "300px" }}>
      <AutoScrollContainer
        pxPerSecond={config.speed}
        enabled={config.enabled}
        accelerationTime={config.accelerationTime}
        smoothingFactor={config.smoothingFactor}
        capDtMs={config.capDtMs}
        direction={config.direction}
        bottomTolerance={config.bottomTolerance}
        topTolerance={config.topTolerance}
        startOffset={config.startOffset}
        endOffset={config.endOffset}
        resumeDelay={config.resumeDelay}
        pauseOnHover={config.pauseOnHover}
        pauseOnFocus={config.pauseOnFocus}
        respectReducedMotion={config.respectReducedMotion}
        pauseEvents={config.pauseEvents}
        resumeEvents={config.resumeEvents}
        style={{ height: "100%" }}
      >
        <div className="content">
          <h3>AutoScrollContainer Demo</h3>
          {generateContent()}
        </div>
      </AutoScrollContainer>
    </div>
  );
};
