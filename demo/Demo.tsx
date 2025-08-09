import React, { useState } from "react";
import { DemoConfig, DemoType } from "./types";
import {
  BasicControls,
  PerformanceControls,
  BoundaryControls,
  EventControls,
  CodeDisplay,
  ComponentDemo,
  HookDemo,
} from "./components";

const Demo: React.FC = () => {
  const [demoType, setDemoType] = useState<DemoType>("component");
  const [showControls, setShowControls] = useState(false);
  const [config, setConfig] = useState<DemoConfig>({
    speed: 8,
    enabled: true,
    accelerationTime: 1000,
    smoothingFactor: 0.1,
    capDtMs: 16.67,
    direction: "down",
    bottomTolerance: 1,
    topTolerance: 1,
    startOffset: 0,
    endOffset: 0,
    resumeDelay: 0,
    pauseOnHover: false,
    pauseOnFocus: false,
    respectReducedMotion: true,
    pauseEvents: ["wheel", "touchmove", "keydown", "mousedown", "focus"],
    resumeEvents: ["mouseleave", "touchend", "touchcancel"],
  });

  const updateConfig = (updates: Partial<DemoConfig>) => {
    setConfig((prev) => ({ ...prev, ...updates }));
  };

  return (
    <div className="demo-container">
      <h1>🚀 Smooth Auto Scroll Demo</h1>

      <div className="demo-section">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "15px",
          }}
        >
          <h2 style={{ margin: 0 }}>
            {demoType === "component"
              ? "AutoScrollContainer"
              : "useSmoothAutoScroll Hook"}
          </h2>
          <button
            onClick={() => setShowControls(!showControls)}
            style={{
              padding: "8px 16px",
              background: showControls ? "#007bff" : "white",
              color: showControls ? "white" : "#007bff",
              border: "1px solid #007bff",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            {showControls ? "Hide" : "Show"} Controls
          </button>
        </div>

        {showControls && (
          <div
            style={{
              background: "#f8f9fa",
              padding: "20px",
              borderRadius: "8px",
              marginBottom: "20px",
            }}
          >
            <h3>Controls</h3>
            <BasicControls
              config={config}
              updateConfig={updateConfig}
              demoType={demoType}
              setDemoType={setDemoType}
            />
            <PerformanceControls config={config} updateConfig={updateConfig} />
            <BoundaryControls config={config} updateConfig={updateConfig} />
            <EventControls config={config} updateConfig={updateConfig} />
          </div>
        )}

        {/* Main Demo */}
        {demoType === "component" ? (
          <ComponentDemo config={config} />
        ) : (
          <HookDemo config={config} />
        )}
      </div>

      <CodeDisplay config={config} demoType={demoType} />

      <div className="demo-section">
        <h2>Instructions</h2>
        <ul>
          <li>Click "Show Controls" to configure all available options</li>
          <li>Adjust the speed slider to see different scroll rates</li>
          <li>
            Configure which events pause scrolling using the "Pause Events"
            checkboxes
          </li>
          <li>
            Configure which events resume scrolling using the "Resume Events"
            checkboxes
          </li>
          <li>
            Try different combinations: hover to pause, click to resume, or
            double-click events
          </li>
          <li>
            Test touch events on mobile devices (touchstart, touchmove,
            touchend, touchcancel)
          </li>
          <li>
            Experiment with focus/blur events for keyboard navigation scenarios
          </li>
          <li>Switch between component and hook demos to see both APIs</li>
          <li>Notice the buttery-smooth motion even at very low speeds</li>
        </ul>
      </div>
    </div>
  );
};

export { Demo };
