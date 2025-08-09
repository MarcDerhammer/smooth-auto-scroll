import React from "react";
import { ControlsProps } from "../types";

export const EventControls: React.FC<ControlsProps> = ({
  config,
  updateConfig,
}) => {
  const handlePauseEventChange = (event: string, checked: boolean) => {
    const eventKey = event as keyof GlobalEventHandlersEventMap;
    if (checked) {
      updateConfig({
        pauseEvents: [...config.pauseEvents, eventKey],
      });
    } else {
      updateConfig({
        pauseEvents: config.pauseEvents.filter((ev) => ev !== event),
      });
    }
  };

  const handleResumeEventChange = (event: string, checked: boolean) => {
    const eventKey = event as keyof GlobalEventHandlersEventMap;
    if (checked) {
      updateConfig({
        resumeEvents: [...config.resumeEvents, eventKey],
      });
    } else {
      updateConfig({
        resumeEvents: config.resumeEvents.filter((ev) => ev !== event),
      });
    }
  };

  return (
    <>
      <h4 style={{ marginTop: "20px", marginBottom: "10px" }}>
        Additional Event Options
      </h4>

      <div className="controls">
        <label>
          <input
            type="checkbox"
            checked={config.pauseOnHover}
            onChange={(e) => updateConfig({ pauseOnHover: e.target.checked })}
          />
          <span>Pause on hover</span>
        </label>
      </div>

      <div className="controls">
        <label>
          <input
            type="checkbox"
            checked={config.pauseOnFocus}
            onChange={(e) => updateConfig({ pauseOnFocus: e.target.checked })}
          />
          <span>Pause on focus</span>
        </label>
      </div>

      <div className="controls">
        <label>
          <input
            type="checkbox"
            checked={config.respectReducedMotion}
            onChange={(e) =>
              updateConfig({ respectReducedMotion: e.target.checked })
            }
          />
          <span>Respect reduced motion preference</span>
        </label>
      </div>

      <div
        className="controls"
        style={{ display: "flex", gap: "2rem", alignItems: "flex-start" }}
      >
        <div style={{ flex: 1 }}>
          <h3>Pause Events</h3>
          <div className="checkbox-group">
            {[
              "wheel",
              "touchmove",
              "keydown",
              "mousedown",
              "focus",
              "click",
              "mouseover",
              "mouseenter",
              "touchstart",
              "contextmenu",
              "dblclick",
            ].map((event) => (
              <label key={event} className="checkbox-label">
                <input
                  type="checkbox"
                  checked={config.pauseEvents.includes(
                    event as keyof GlobalEventHandlersEventMap
                  )}
                  onChange={(e) =>
                    handlePauseEventChange(event, e.target.checked)
                  }
                />
                <span>{event}</span>
              </label>
            ))}
          </div>
        </div>

        <div style={{ flex: 1 }}>
          <h3>Resume Events</h3>
          <div className="checkbox-group">
            {[
              "mouseleave",
              "touchend",
              "touchcancel",
              "mouseenter",
              "click",
              "keyup",
              "mouseover",
              "blur",
              "mouseout",
              "dblclick",
            ].map((event) => (
              <label key={event} className="checkbox-label">
                <input
                  type="checkbox"
                  checked={config.resumeEvents.includes(
                    event as keyof GlobalEventHandlersEventMap
                  )}
                  onChange={(e) =>
                    handleResumeEventChange(event, e.target.checked)
                  }
                />
                <span>{event}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
