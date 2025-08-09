import React from "react";
import { ControlsProps, DemoType } from "../types";

interface BasicControlsProps extends ControlsProps {
  demoType: DemoType;
  setDemoType: (type: DemoType) => void;
}

export const BasicControls: React.FC<BasicControlsProps> = ({
  config,
  updateConfig,
  demoType,
  setDemoType,
}) => {
  return (
    <>
      <div className="controls">
        <button
          className={demoType === "component" ? "active" : ""}
          onClick={() => setDemoType("component")}
        >
          Component Demo
        </button>
        <button
          className={demoType === "hook" ? "active" : ""}
          onClick={() => setDemoType("hook")}
        >
          Hook Demo
        </button>
      </div>

      <div className="controls">
        <button
          className={config.enabled ? "active" : ""}
          onClick={() => updateConfig({ enabled: !config.enabled })}
        >
          {config.enabled ? "Pause" : "Resume"}
        </button>
      </div>

      <div className="controls">
        <label style={{ width: "100%" }}>
          Speed: <span className="speed-display">{config.speed} px/s</span>
          <input
            type="range"
            min="1"
            max="100"
            value={config.speed}
            onChange={(e) => updateConfig({ speed: Number(e.target.value) })}
            style={{ width: "100%", marginTop: "5px" }}
          />
        </label>
      </div>

      <div className="controls">
        <label style={{ width: "100%" }}>
          Acceleration:{" "}
          <span className="speed-display">{config.accelerationTime}ms</span>
          <input
            type="range"
            min="0"
            max="3000"
            step="100"
            value={config.accelerationTime}
            onChange={(e) =>
              updateConfig({ accelerationTime: Number(e.target.value) })
            }
            style={{ width: "100%", marginTop: "5px" }}
          />
        </label>
      </div>

      <div className="controls">
        <label style={{ width: "100%" }}>
          Resume Delay:{" "}
          <span className="speed-display">{config.resumeDelay}ms</span>
          <input
            type="range"
            min="0"
            max="2000"
            step="100"
            value={config.resumeDelay}
            onChange={(e) =>
              updateConfig({ resumeDelay: Number(e.target.value) })
            }
            style={{ width: "100%", marginTop: "5px" }}
          />
        </label>
      </div>

      <div className="controls">
        <button
          className={config.direction === "down" ? "active" : ""}
          onClick={() => updateConfig({ direction: "down" })}
        >
          Scroll Down
        </button>
        <button
          className={config.direction === "up" ? "active" : ""}
          onClick={() => updateConfig({ direction: "up" })}
        >
          Scroll Up
        </button>
      </div>
    </>
  );
};
