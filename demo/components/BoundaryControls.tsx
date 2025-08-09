import React from "react";
import { ControlsProps } from "../types";

export const BoundaryControls: React.FC<ControlsProps> = ({
  config,
  updateConfig,
}) => {
  return (
    <>
      <h4 style={{ marginTop: "20px", marginBottom: "10px" }}>
        Boundaries & Behavior
      </h4>

      <div className="controls">
        <label style={{ width: "100%" }}>
          Bottom Tolerance:{" "}
          <span className="speed-display">{config.bottomTolerance}px</span>
          <input
            type="range"
            min="0"
            max="50"
            value={config.bottomTolerance}
            onChange={(e) =>
              updateConfig({ bottomTolerance: Number(e.target.value) })
            }
            style={{ width: "100%", marginTop: "5px" }}
          />
        </label>
      </div>

      <div className="controls">
        <label style={{ width: "100%" }}>
          Top Tolerance:{" "}
          <span className="speed-display">{config.topTolerance}px</span>
          <input
            type="range"
            min="0"
            max="50"
            value={config.topTolerance}
            onChange={(e) =>
              updateConfig({ topTolerance: Number(e.target.value) })
            }
            style={{ width: "100%", marginTop: "5px" }}
          />
        </label>
      </div>

      <div className="controls">
        <label style={{ width: "100%" }}>
          Start Offset:{" "}
          <span className="speed-display">{config.startOffset}px</span>
          <input
            type="range"
            min="0"
            max="200"
            value={config.startOffset}
            onChange={(e) =>
              updateConfig({ startOffset: Number(e.target.value) })
            }
            style={{ width: "100%", marginTop: "5px" }}
          />
        </label>
      </div>

      <div className="controls">
        <label style={{ width: "100%" }}>
          End Offset:{" "}
          <span className="speed-display">{config.endOffset}px</span>
          <input
            type="range"
            min="0"
            max="200"
            value={config.endOffset}
            onChange={(e) =>
              updateConfig({ endOffset: Number(e.target.value) })
            }
            style={{ width: "100%", marginTop: "5px" }}
          />
        </label>
      </div>
    </>
  );
};
