# Smooth Auto Scroll Demo

This demo showcases the `smooth-auto-scroll` package functionality.

## Running the Demo

```bash
npm run demo
```

This will start a development server at `http://localhost:3000` and open it in your browser.

## Demo Features

- **Component Demo**: Shows the `AutoScrollContainer` wrapper component
- **Hook Demo**: Shows the `useSmoothAutoScroll` hook directly
- **Interactive Controls**:
  - Speed slider (1-20 px/s)
  - Pause/Resume button
  - Switch between component and hook demos
- **Real-time Status**: Shows pause state and end detection

## Testing the Functionality

1. **Speed Control**: Adjust the slider to see different scroll rates
2. **User Interaction**: Try scrolling manually - auto-scroll pauses
3. **Mouse Leave**: Move mouse away to resume auto-scroll
4. **Ultra-Smooth Motion**: Notice buttery-smooth scrolling even at very low speeds
5. **End Detection**: Watch it stop when reaching the bottom

## Demo Structure

- `index.html` - Main HTML file with styles
- `main.tsx` - React entry point
- `Demo.tsx` - Main demo component with both APIs
