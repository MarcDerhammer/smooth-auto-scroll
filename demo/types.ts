export interface DemoConfig {
  speed: number;
  enabled: boolean;
  accelerationTime: number;
  smoothingFactor: number;
  capDtMs: number;
  direction: "down" | "up";
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
}

export interface ControlsProps {
  config: DemoConfig;
  updateConfig: (updates: Partial<DemoConfig>) => void;
}

export type DemoType = "component" | "hook";
