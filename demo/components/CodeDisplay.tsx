import React from "react";
import { DemoConfig, DemoType } from "../types";

interface CodeDisplayProps {
  config: DemoConfig;
  demoType: DemoType;
}

export const CodeDisplay: React.FC<CodeDisplayProps> = ({
  config,
  demoType,
}) => {
  const generateCodeString = () => {
    const defaultPauseEvents = [
      "wheel",
      "touchmove",
      "keydown",
      "mousedown",
      "focus",
    ];
    const defaultResumeEvents = ["mouseleave", "touchend", "touchcancel"];

    const componentProps = [
      `pxPerSecond={${config.speed}}`,
      !config.enabled ? "enabled={false}" : null,
      config.accelerationTime !== 1000
        ? `accelerationTime={${config.accelerationTime}}`
        : null,
      config.smoothingFactor !== 0.1
        ? `smoothingFactor={${config.smoothingFactor}}`
        : null,
      config.capDtMs !== 16.67 ? `capDtMs={${config.capDtMs}}` : null,
      config.direction !== "down" ? `direction="${config.direction}"` : null,
      config.bottomTolerance !== 1
        ? `bottomTolerance={${config.bottomTolerance}}`
        : null,
      config.topTolerance !== 1
        ? `topTolerance={${config.topTolerance}}`
        : null,
      config.startOffset !== 0 ? `startOffset={${config.startOffset}}` : null,
      config.endOffset !== 0 ? `endOffset={${config.endOffset}}` : null,
      config.resumeDelay !== 0 ? `resumeDelay={${config.resumeDelay}}` : null,
      config.pauseOnHover ? "pauseOnHover={true}" : null,
      config.pauseOnFocus ? "pauseOnFocus={true}" : null,
      !config.respectReducedMotion ? "respectReducedMotion={false}" : null,
      JSON.stringify(config.pauseEvents) !== JSON.stringify(defaultPauseEvents)
        ? `pauseEvents={${JSON.stringify(config.pauseEvents)}}`
        : null,
      JSON.stringify(config.resumeEvents) !==
      JSON.stringify(defaultResumeEvents)
        ? `resumeEvents={${JSON.stringify(config.resumeEvents)}}`
        : null,
    ].filter(Boolean);

    const hookProps = [
      "containerRef,",
      "innerRef,",
      `pxPerSecond: ${config.speed},`,
      !config.enabled ? "enabled: false," : null,
      config.accelerationTime !== 1000
        ? `accelerationTime: ${config.accelerationTime},`
        : null,
      config.smoothingFactor !== 0.1
        ? `smoothingFactor: ${config.smoothingFactor},`
        : null,
      config.capDtMs !== 16.67 ? `capDtMs: ${config.capDtMs},` : null,
      config.direction !== "down" ? `direction: "${config.direction}",` : null,
      config.bottomTolerance !== 1
        ? `bottomTolerance: ${config.bottomTolerance},`
        : null,
      config.topTolerance !== 1
        ? `topTolerance: ${config.topTolerance},`
        : null,
      config.startOffset !== 0 ? `startOffset: ${config.startOffset},` : null,
      config.endOffset !== 0 ? `endOffset: ${config.endOffset},` : null,
      config.resumeDelay !== 0 ? `resumeDelay: ${config.resumeDelay},` : null,
      config.pauseOnHover ? "pauseOnHover: true," : null,
      config.pauseOnFocus ? "pauseOnFocus: true," : null,
      !config.respectReducedMotion ? "respectReducedMotion: false," : null,
      JSON.stringify(config.pauseEvents) !== JSON.stringify(defaultPauseEvents)
        ? `pauseEvents: ${JSON.stringify(config.pauseEvents)},`
        : null,
      JSON.stringify(config.resumeEvents) !==
      JSON.stringify(defaultResumeEvents)
        ? `resumeEvents: ${JSON.stringify(config.resumeEvents)},`
        : null,
    ].filter(Boolean);

    return demoType === "component"
      ? `<AutoScrollContainer\n  ${componentProps.join("\n  ")}\n>\n  {/* your content */}\n</AutoScrollContainer>`
      : `const controls = useSmoothAutoScroll({\n  ${hookProps.join("\n  ")}\n});`;
  };

  return (
    <div className="demo-section">
      <h3>Current Code</h3>
      <pre
        style={{
          background: "#f8f9fa",
          padding: "15px",
          borderRadius: "6px",
          overflow: "auto",
          fontSize: "14px",
          border: "1px solid #e9ecef",
        }}
      >
        <code>{generateCodeString()}</code>
      </pre>
    </div>
  );
};
