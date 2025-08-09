import React from "react";
import { ControlsProps } from "../types";

export const PerformanceControls: React.FC<ControlsProps> = ({
  config,
  updateConfig,
}) => {
  return (
    <>
      <h4 style={{ marginTop: "20px", marginBottom: "10px" }}>
        Performance & Animation
      </h4>

      <div className="controls">
        <label style={{ width: "100%" }}>
          Smoothing Factor:{" "}
          <span className="speed-display">{config.smoothingFactor}</span>
          <input
            type="range"
            min="0.01"
            max="1"
            step="0.01"
            value={config.smoothingFactor}
            onChange={(e) =>
              updateConfig({ smoothingFactor: Number(e.target.value) })
            }
            style={{ width: "100%", marginTop: "5px" }}
          />
        </label>
      </div>

      <div className="controls">
        <label style={{ width: "100%" }}>
          Frame Cap:{" "}
          <span className="speed-display">
            {config.capDtMs.toFixed(2)}ms (~{Math.round(1000 / config.capDtMs)}
            fps)
          </span>
          <input
            type="range"
            min="8.33"
            max="33.33"
            step="0.1"
            value={config.capDtMs}
            onChange={(e) => updateConfig({ capDtMs: Number(e.target.value) })}
            style={{ width: "100%", marginTop: "5px" }}
          />
        </label>
      </div>
    </>
  );
};
