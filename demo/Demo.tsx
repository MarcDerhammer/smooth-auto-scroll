import React, { useState, useRef } from "react";
import { AutoScrollContainer, useSmoothAutoScroll } from "@";

const Demo: React.FC = () => {
  const [speed, setSpeed] = useState(5); // Default speed
  const [enabled, setEnabled] = useState(true);
  const [demoType, setDemoType] = useState<"component" | "hook">("component");

  // Animation & Performance
  const [accelerationTime, setAccelerationTime] = useState(1000); // Default 1 second
  const [smoothingFactor, setSmoothingFactor] = useState(0.1); // Default 0.1
  const [capDtMs, setCapDtMs] = useState(16.67); // Default ~60fps
  const [speedMultiplier, setSpeedMultiplier] = useState(1); // Default 1

  // Direction & Behavior
  const [direction, setDirection] = useState<"down" | "up" | "both">("down"); // Default down
  const [startDirection, setStartDirection] = useState<"down" | "up">("down"); // Default down
  const [reverseOnEnd, setReverseOnEnd] = useState(false); // Default false

  // Boundaries & Offsets
  const [bottomTolerance, setBottomTolerance] = useState(1); // Default 1
  const [topTolerance, setTopTolerance] = useState(1); // Default 1
  const [startOffset, setStartOffset] = useState(0); // Default 0
  const [endOffset, setEndOffset] = useState(0); // Default 0

  // Event Configuration
  const [resumeDelay, setResumeDelay] = useState(0); // Default 0ms
  const [pauseOnHover, setPauseOnHover] = useState(false); // Default false
  const [pauseOnFocus, setPauseOnFocus] = useState(false); // Default false
  const [pauseEvents, setPauseEvents] = useState<
    Array<keyof GlobalEventHandlersEventMap>
  >(["wheel", "touchmove", "keydown", "mousedown", "focus"]);
  const [resumeEvents, setResumeEvents] = useState<
    Array<keyof GlobalEventHandlersEventMap>
  >(["mouseleave", "touchend", "touchcancel"]);

  // Other
  const [respectReducedMotion, setRespectReducedMotion] = useState(true); // Default true
  const [showControls, setShowControls] = useState(false);

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
                className={enabled ? "active" : ""}
                onClick={() => setEnabled(!enabled)}
              >
                {enabled ? "Pause" : "Resume"}
              </button>
            </div>

            <div className="controls">
              <label style={{ width: "100%" }}>
                Speed: <span className="speed-display">{speed} px/s</span>
                <input
                  type="range"
                  min="1"
                  max="100"
                  value={speed}
                  onChange={(e) => setSpeed(Number(e.target.value))}
                  style={{ width: "100%", marginTop: "5px" }}
                />
              </label>
            </div>

            <div className="controls">
              <label style={{ width: "100%" }}>
                Acceleration:{" "}
                <span className="speed-display">{accelerationTime}ms</span>
                <input
                  type="range"
                  min="0"
                  max="3000"
                  step="100"
                  value={accelerationTime}
                  onChange={(e) => setAccelerationTime(Number(e.target.value))}
                  style={{ width: "100%", marginTop: "5px" }}
                />
              </label>
            </div>

            <div className="controls">
              <label style={{ width: "100%" }}>
                Resume Delay:{" "}
                <span className="speed-display">{resumeDelay}ms</span>
                <input
                  type="range"
                  min="0"
                  max="2000"
                  step="100"
                  value={resumeDelay}
                  onChange={(e) => setResumeDelay(Number(e.target.value))}
                  style={{ width: "100%", marginTop: "5px" }}
                />
              </label>
            </div>

            <div className="controls">
              <button
                className={direction === "down" ? "active" : ""}
                onClick={() => setDirection("down")}
              >
                Down Only
              </button>
              <button
                className={direction === "up" ? "active" : ""}
                onClick={() => setDirection("up")}
              >
                Up Only
              </button>
              <button
                className={direction === "both" ? "active" : ""}
                onClick={() => setDirection("both")}
              >
                Both Directions
              </button>
            </div>

            {direction === "both" && (
              <div className="controls">
                <label>Start Direction:</label>
                <button
                  className={startDirection === "down" ? "active" : ""}
                  onClick={() => setStartDirection("down")}
                >
                  Start Down
                </button>
                <button
                  className={startDirection === "up" ? "active" : ""}
                  onClick={() => setStartDirection("up")}
                >
                  Start Up
                </button>
              </div>
            )}

            {/* Additional Performance Controls */}
            <h4 style={{ marginTop: "20px", marginBottom: "10px" }}>
              Performance & Animation
            </h4>

            <div className="controls">
              <label style={{ width: "100%" }}>
                Speed Multiplier:{" "}
                <span className="speed-display">{speedMultiplier}x</span>
                <input
                  type="range"
                  min="0.1"
                  max="3"
                  step="0.1"
                  value={speedMultiplier}
                  onChange={(e) => setSpeedMultiplier(Number(e.target.value))}
                  style={{ width: "100%", marginTop: "5px" }}
                />
              </label>
            </div>

            <div className="controls">
              <label style={{ width: "100%" }}>
                Smoothing Factor:{" "}
                <span className="speed-display">{smoothingFactor}</span>
                <input
                  type="range"
                  min="0.01"
                  max="1"
                  step="0.01"
                  value={smoothingFactor}
                  onChange={(e) => setSmoothingFactor(Number(e.target.value))}
                  style={{ width: "100%", marginTop: "5px" }}
                />
              </label>
            </div>

            <div className="controls">
              <label style={{ width: "100%" }}>
                Frame Cap:{" "}
                <span className="speed-display">
                  {capDtMs.toFixed(2)}ms (~{Math.round(1000 / capDtMs)}fps)
                </span>
                <input
                  type="range"
                  min="8.33"
                  max="33.33"
                  step="0.1"
                  value={capDtMs}
                  onChange={(e) => setCapDtMs(Number(e.target.value))}
                  style={{ width: "100%", marginTop: "5px" }}
                />
              </label>
            </div>

            {/* Boundaries & Behavior */}
            <h4 style={{ marginTop: "20px", marginBottom: "10px" }}>
              Boundaries & Behavior
            </h4>

            <div className="controls">
              <label style={{ width: "100%" }}>
                Bottom Tolerance:{" "}
                <span className="speed-display">{bottomTolerance}px</span>
                <input
                  type="range"
                  min="0"
                  max="50"
                  value={bottomTolerance}
                  onChange={(e) => setBottomTolerance(Number(e.target.value))}
                  style={{ width: "100%", marginTop: "5px" }}
                />
              </label>
            </div>

            <div className="controls">
              <label style={{ width: "100%" }}>
                Top Tolerance:{" "}
                <span className="speed-display">{topTolerance}px</span>
                <input
                  type="range"
                  min="0"
                  max="50"
                  value={topTolerance}
                  onChange={(e) => setTopTolerance(Number(e.target.value))}
                  style={{ width: "100%", marginTop: "5px" }}
                />
              </label>
            </div>

            <div className="controls">
              <label style={{ width: "100%" }}>
                Start Offset:{" "}
                <span className="speed-display">{startOffset}px</span>
                <input
                  type="range"
                  min="0"
                  max="200"
                  value={startOffset}
                  onChange={(e) => setStartOffset(Number(e.target.value))}
                  style={{ width: "100%", marginTop: "5px" }}
                />
              </label>
            </div>

            <div className="controls">
              <label style={{ width: "100%" }}>
                End Offset: <span className="speed-display">{endOffset}px</span>
                <input
                  type="range"
                  min="0"
                  max="200"
                  value={endOffset}
                  onChange={(e) => setEndOffset(Number(e.target.value))}
                  style={{ width: "100%", marginTop: "5px" }}
                />
              </label>
            </div>

            <div className="controls">
              <label>
                <input
                  type="checkbox"
                  checked={reverseOnEnd}
                  onChange={(e) => setReverseOnEnd(e.target.checked)}
                />
                <span>Reverse direction at boundaries</span>
              </label>
            </div>

            {/* Additional Event Configuration */}
            <h4 style={{ marginTop: "20px", marginBottom: "10px" }}>
              Additional Event Options
            </h4>

            <div className="controls">
              <label>
                <input
                  type="checkbox"
                  checked={pauseOnHover}
                  onChange={(e) => setPauseOnHover(e.target.checked)}
                />
                <span>Pause on hover</span>
              </label>
            </div>

            <div className="controls">
              <label>
                <input
                  type="checkbox"
                  checked={pauseOnFocus}
                  onChange={(e) => setPauseOnFocus(e.target.checked)}
                />
                <span>Pause on focus</span>
              </label>
            </div>

            <div className="controls">
              <label>
                <input
                  type="checkbox"
                  checked={respectReducedMotion}
                  onChange={(e) => setRespectReducedMotion(e.target.checked)}
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
                        checked={pauseEvents.includes(
                          event as keyof GlobalEventHandlersEventMap
                        )}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setPauseEvents([
                              ...pauseEvents,
                              event as keyof GlobalEventHandlersEventMap,
                            ]);
                          } else {
                            setPauseEvents(
                              pauseEvents.filter((ev) => ev !== event)
                            );
                          }
                        }}
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
                        checked={resumeEvents.includes(
                          event as keyof GlobalEventHandlersEventMap
                        )}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setResumeEvents([
                              ...resumeEvents,
                              event as keyof GlobalEventHandlersEventMap,
                            ]);
                          } else {
                            setResumeEvents(
                              resumeEvents.filter((ev) => ev !== event)
                            );
                          }
                        }}
                      />
                      <span>{event}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Main Demo */}
        {demoType === "component" ? (
          <ComponentDemo
            speed={speed}
            enabled={enabled}
            accelerationTime={accelerationTime}
            smoothingFactor={smoothingFactor}
            capDtMs={capDtMs}
            speedMultiplier={speedMultiplier}
            direction={direction}
            startDirection={startDirection}
            reverseOnEnd={reverseOnEnd}
            bottomTolerance={bottomTolerance}
            topTolerance={topTolerance}
            startOffset={startOffset}
            endOffset={endOffset}
            resumeDelay={resumeDelay}
            pauseOnHover={pauseOnHover}
            pauseOnFocus={pauseOnFocus}
            respectReducedMotion={respectReducedMotion}
            pauseEvents={pauseEvents}
            resumeEvents={resumeEvents}
          />
        ) : (
          <HookDemo
            speed={speed}
            enabled={enabled}
            accelerationTime={accelerationTime}
            smoothingFactor={smoothingFactor}
            capDtMs={capDtMs}
            speedMultiplier={speedMultiplier}
            direction={direction}
            startDirection={startDirection}
            reverseOnEnd={reverseOnEnd}
            bottomTolerance={bottomTolerance}
            topTolerance={topTolerance}
            startOffset={startOffset}
            endOffset={endOffset}
            resumeDelay={resumeDelay}
            pauseOnHover={pauseOnHover}
            pauseOnFocus={pauseOnFocus}
            respectReducedMotion={respectReducedMotion}
            pauseEvents={pauseEvents}
            resumeEvents={resumeEvents}
          />
        )}
      </div>

      {/* Code Sample */}
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
          <code>
            {(() => {
              const defaultPauseEvents = [
                "wheel",
                "touchmove",
                "keydown",
                "mousedown",
                "focus",
              ];
              const defaultResumeEvents = [
                "mouseleave",
                "touchend",
                "touchcancel",
              ];

              const componentProps = [
                `pxPerSecond={${speed}}`,
                !enabled ? "enabled={false}" : null,
                accelerationTime !== 1000
                  ? `accelerationTime={${accelerationTime}}`
                  : null,
                smoothingFactor !== 0.1
                  ? `smoothingFactor={${smoothingFactor}}`
                  : null,
                capDtMs !== 16.67 ? `capDtMs={${capDtMs}}` : null,
                speedMultiplier !== 1
                  ? `speedMultiplier={${speedMultiplier}}`
                  : null,
                direction !== "down" ? `direction="${direction}"` : null,
                direction === "both" && startDirection !== "down"
                  ? `startDirection="${startDirection}"`
                  : null,
                reverseOnEnd ? "reverseOnEnd={true}" : null,
                bottomTolerance !== 1
                  ? `bottomTolerance={${bottomTolerance}}`
                  : null,
                topTolerance !== 1 ? `topTolerance={${topTolerance}}` : null,
                startOffset !== 0 ? `startOffset={${startOffset}}` : null,
                endOffset !== 0 ? `endOffset={${endOffset}}` : null,
                resumeDelay !== 0 ? `resumeDelay={${resumeDelay}}` : null,
                pauseOnHover ? "pauseOnHover={true}" : null,
                pauseOnFocus ? "pauseOnFocus={true}" : null,
                !respectReducedMotion ? "respectReducedMotion={false}" : null,
                JSON.stringify(pauseEvents) !==
                JSON.stringify(defaultPauseEvents)
                  ? `pauseEvents={${JSON.stringify(pauseEvents)}}`
                  : null,
                JSON.stringify(resumeEvents) !==
                JSON.stringify(defaultResumeEvents)
                  ? `resumeEvents={${JSON.stringify(resumeEvents)}}`
                  : null,
              ].filter(Boolean);

              const hookProps = [
                "containerRef,",
                "innerRef,",
                `pxPerSecond: ${speed},`,
                !enabled ? "enabled: false," : null,
                accelerationTime !== 1000
                  ? `accelerationTime: ${accelerationTime},`
                  : null,
                smoothingFactor !== 0.1
                  ? `smoothingFactor: ${smoothingFactor},`
                  : null,
                capDtMs !== 16.67 ? `capDtMs: ${capDtMs},` : null,
                speedMultiplier !== 1
                  ? `speedMultiplier: ${speedMultiplier},`
                  : null,
                direction !== "down" ? `direction: "${direction}",` : null,
                direction === "both" && startDirection !== "down"
                  ? `startDirection: "${startDirection}",`
                  : null,
                reverseOnEnd ? "reverseOnEnd: true," : null,
                bottomTolerance !== 1
                  ? `bottomTolerance: ${bottomTolerance},`
                  : null,
                topTolerance !== 1 ? `topTolerance: ${topTolerance},` : null,
                startOffset !== 0 ? `startOffset: ${startOffset},` : null,
                endOffset !== 0 ? `endOffset: ${endOffset},` : null,
                resumeDelay !== 0 ? `resumeDelay: ${resumeDelay},` : null,
                pauseOnHover ? "pauseOnHover: true," : null,
                pauseOnFocus ? "pauseOnFocus: true," : null,
                !respectReducedMotion ? "respectReducedMotion: false," : null,
                JSON.stringify(pauseEvents) !==
                JSON.stringify(defaultPauseEvents)
                  ? `pauseEvents: ${JSON.stringify(pauseEvents)},`
                  : null,
                JSON.stringify(resumeEvents) !==
                JSON.stringify(defaultResumeEvents)
                  ? `resumeEvents: ${JSON.stringify(resumeEvents)},`
                  : null,
              ].filter(Boolean);

              return demoType === "component"
                ? `<AutoScrollContainer\n  ${componentProps.join("\n  ")}\n>\n  {/* your content */}\n</AutoScrollContainer>`
                : `const controls = useSmoothAutoScroll({\n  ${hookProps.join("\n  ")}\n});`;
            })()}
          </code>
        </pre>
      </div>

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

const ComponentDemo: React.FC<{
  speed: number;
  enabled: boolean;
  accelerationTime: number;
  smoothingFactor: number;
  capDtMs: number;
  speedMultiplier: number;
  direction: "down" | "up" | "both";
  startDirection: "down" | "up";
  reverseOnEnd: boolean;
  bottomTolerance: number;
  topTolerance: number;
  startOffset: number;
  endOffset: number;
  resumeDelay: number;
  pauseOnHover: boolean;
  pauseOnFocus: boolean;
  respectReducedMotion: boolean;
  pauseEvents: Array<keyof GlobalEventHandlersEventMap>;
  resumeEvents: Array<keyof GlobalEventHandlersEventMap>;
}> = ({
  speed,
  enabled,
  accelerationTime,
  smoothingFactor,
  capDtMs,
  speedMultiplier,
  direction,
  startDirection,
  reverseOnEnd,
  bottomTolerance,
  topTolerance,
  startOffset,
  endOffset,
  resumeDelay,
  pauseOnHover,
  pauseOnFocus,
  respectReducedMotion,
  pauseEvents,
  resumeEvents,
}) => {
  return (
    <div className="scroll-container" style={{ height: "300px" }}>
      <AutoScrollContainer
        pxPerSecond={speed}
        enabled={enabled}
        accelerationTime={accelerationTime}
        smoothingFactor={smoothingFactor}
        capDtMs={capDtMs}
        speedMultiplier={speedMultiplier}
        direction={direction}
        startDirection={startDirection}
        reverseOnEnd={reverseOnEnd}
        bottomTolerance={bottomTolerance}
        topTolerance={topTolerance}
        startOffset={startOffset}
        endOffset={endOffset}
        resumeDelay={resumeDelay}
        pauseOnHover={pauseOnHover}
        pauseOnFocus={pauseOnFocus}
        respectReducedMotion={respectReducedMotion}
        pauseEvents={pauseEvents}
        resumeEvents={resumeEvents}
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

const HookDemo: React.FC<{
  speed: number;
  enabled: boolean;
  accelerationTime: number;
  smoothingFactor: number;
  capDtMs: number;
  speedMultiplier: number;
  direction: "down" | "up" | "both";
  startDirection: "down" | "up";
  reverseOnEnd: boolean;
  bottomTolerance: number;
  topTolerance: number;
  startOffset: number;
  endOffset: number;
  resumeDelay: number;
  pauseOnHover: boolean;
  pauseOnFocus: boolean;
  respectReducedMotion: boolean;
  pauseEvents: Array<keyof GlobalEventHandlersEventMap>;
  resumeEvents: Array<keyof GlobalEventHandlersEventMap>;
}> = ({
  speed,
  enabled,
  accelerationTime,
  smoothingFactor,
  capDtMs,
  speedMultiplier,
  direction,
  startDirection,
  reverseOnEnd,
  bottomTolerance,
  topTolerance,
  startOffset,
  endOffset,
  resumeDelay,
  pauseOnHover,
  pauseOnFocus,
  respectReducedMotion,
  pauseEvents,
  resumeEvents,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useSmoothAutoScroll({
    containerRef,
    innerRef,
    pxPerSecond: speed,
    enabled,
    accelerationTime,
    smoothingFactor,
    capDtMs,
    speedMultiplier,
    direction,
    startDirection,
    reverseOnEnd,
    bottomTolerance,
    topTolerance,
    startOffset,
    endOffset,
    resumeDelay,
    pauseOnHover,
    pauseOnFocus,
    respectReducedMotion,
    pauseEvents,
    resumeEvents,
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

const generateContent = () => {
  const paragraphs = [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
    "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.",
    "Sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?",
    "Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?",
    "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.",
    "Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.",
    "Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.",
    "On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain.",
    "These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted.",
    "The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains. But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness.",
    "No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure.",
    "To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?",
    "On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain.",
    "These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted.",
    "The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains. But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness.",
    "No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure.",
    "To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?",
    "This is the end of our demo content. You should see smooth auto-scrolling behavior that pauses when you interact with the content and resumes when you move your mouse away.",
  ];

  return (
    <>
      {paragraphs.map((text, index) => (
        <p key={index}>
          <strong>Paragraph {index + 1}:</strong> {text}
        </p>
      ))}
    </>
  );
};

export { Demo };
