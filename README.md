# smooth-auto-scroll

[![npm version](https://badge.fury.io/js/smooth-auto-scroll.svg)](https://badge.fury.io/js/smooth-auto-scroll)
[![npm downloads](https://img.shields.io/npm/dm/smooth-auto-scroll.svg)](https://www.npmjs.com/package/smooth-auto-scroll)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](http://www.typescriptlang.org/)
[![Build Status](https://github.com/marcderhammer/smooth-auto-scroll/workflows/CI/badge.svg)](https://github.com/marcderhammer/smooth-auto-scroll/actions)
[![codecov](https://codecov.io/gh/marcderhammer/smooth-auto-scroll/branch/main/graph/badge.svg)](https://codecov.io/gh/marcderhammer/smooth-auto-scroll)
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/smooth-auto-scroll)](https://bundlephobia.com/package/smooth-auto-scroll)
[![React](https://img.shields.io/badge/React-%3E%3D17-blue.svg)](https://reactjs.org/)

**React hook and component** for smooth auto-scroll. Perfect for continuous scrolling at any speed with buttery-smooth motion.

> ⚛️ **React Only**: This library requires React 17+ and uses React hooks. For vanilla JS or other frameworks, you'll need a different solution.

## 🚀 **[Try the Interactive Demo](https://marcderhammer.github.io/smooth-auto-scroll/)**

Experience all the features live with customizable controls and real-time code generation.

## Install

```bash
npm i smooth-auto-scroll
# peer: react
```

## Usage

> 💡 **See it in action**: [Interactive Demo](https://marcderhammer.github.io/smooth-auto-scroll/) with live controls and code examples.

```tsx
import { AutoScrollContainer } from "smooth-auto-scroll";

<AutoScrollContainer pxPerSecond={5}>
  <div>...your content...</div>
</AutoScrollContainer>;
```

## Hook

```tsx
import { useSmoothAutoScroll } from "smooth-auto-scroll";

const containerRef = useRef<HTMLDivElement>(null);
const innerRef = useRef<HTMLDivElement>(null);

useSmoothAutoScroll({ containerRef, innerRef, pxPerSecond: 5 });
```

## API

### Core Props

- `pxPerSecond`: number — scroll speed in pixels per second (required)
- `enabled`: boolean — enable/disable scrolling, default `true`
- `containerRef`: React.RefObject<HTMLElement> — scroll container ref (hook only, required)
- `innerRef`: React.RefObject<HTMLElement> — inner content ref (hook only, required)

### Performance & Animation

- `capDtMs`: number — frame delta cap in milliseconds, default `16.67` (~60fps)
- `smoothingFactor`: number — velocity smoothing factor, default `0.1`
- `accelerationTime`: number — time to reach full speed in ms, default `1000`

- `respectReducedMotion`: boolean — respect user's reduced motion preference, default `true`

### Scroll Boundaries

- `bottomTolerance`: number — pixels from bottom to stop, default `1`
- `topTolerance`: number — pixels from top to stop, default `1`
- `startOffset`: number — pixels from top before starting, default `0`
- `endOffset`: number — pixels from bottom before stopping, default `0`

### Direction & Behavior

- `direction`: "down" | "up" — scroll direction, default `"down"`

### Event Configuration

- `pauseEvents`: Array<keyof GlobalEventHandlersEventMap> — events that pause scrolling, default `["wheel", "touchmove", "keydown", "mousedown", "focus"]`
- `resumeEvents`: Array<keyof GlobalEventHandlersEventMap> — events that resume scrolling, default `["mouseleave", "touchend", "touchcancel"]`
- `pauseOnHover`: boolean — pause when mouse enters container, default `false`
- `pauseOnFocus`: boolean — pause when container receives focus, default `false`
- `resumeDelay`: number — delay in ms before resuming after user interaction, default `0`

### Callbacks

- `onStart`: () => void — called when scrolling starts
- `onPause`: () => void — called when scrolling pauses
- `onResume`: () => void — called when scrolling resumes
- `onReachEnd`: () => void — called when reaching bottom/end
- `onReachTop`: () => void — called when reaching top

### Container Props (AutoScrollContainer only)

- `containerRef`: React.RefObject<HTMLElement> — optional external container ref
- `className`: string — CSS class for container
- `style`: React.CSSProperties — inline styles for container
- `children`: React.ReactNode — content to scroll

### Behavior

- Pauses on specified user events; resumes on specified resume events or visibility change
- Supports any DOM event for both `pauseEvents` and `resumeEvents` (e.g., `"click"`, `"mousedown"`, `"touchstart"`, `"mouseleave"`, `"keyup"`)
- Uses hardware acceleration for ultra-smooth motion at any speed
- Automatically handles reduced motion preferences when `respectReducedMotion` is enabled

## Examples

### Custom Pause Events

```tsx
// Only pause on wheel events
<AutoScrollContainer
  pxPerSecond={5}
  pauseEvents={["wheel"]}
>
  {content}
</AutoScrollContainer>

// Pause on multiple events
<AutoScrollContainer
  pxPerSecond={5}
  pauseEvents={["wheel", "touchstart", "mousedown", "keydown"]}
>
  {content}
</AutoScrollContainer>

// Never pause on user events (only on hover/focus if enabled)
<AutoScrollContainer
  pxPerSecond={5}
  pauseEvents={[]}
>
  {content}
</AutoScrollContainer>
```

### Custom Resume Events

```tsx
// Resume on mouse click
<AutoScrollContainer
  pxPerSecond={5}
  pauseEvents={["wheel", "keydown"]}
  resumeEvents={["click"]}
>
  {content}
</AutoScrollContainer>

// Resume on multiple events
<AutoScrollContainer
  pxPerSecond={5}
  pauseEvents={["wheel", "touchmove"]}
  resumeEvents={["mouseleave", "keyup", "touchend"]}
>
  {content}
</AutoScrollContainer>

// Never resume on user events (only programmatically)
<AutoScrollContainer
  pxPerSecond={5}
  resumeEvents={[]}
>
  {content}
</AutoScrollContainer>
```
