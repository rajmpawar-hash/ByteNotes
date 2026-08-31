# Reactive vs Non-Reactive Values: Controlling the Re-render

One of the most misunderstood concepts in React is what actually triggers a component to update visually. Why do some variables cause the screen to change instantly, while others change silently in the background? 

The answer lies in understanding the difference between **Reactive** and **Non-Reactive** values.

## ⚡ What is a Reactive Value?

A reactive value is a piece of data that **React actively monitors**. When a reactive value changes, React automatically triggers a **re-render** of the component (and its children) to ensure the UI matches the new data.

Reactive values are the core of React's declarative nature. You declare the state, and React reacts to changes.

**Sources of Reactive Values:**
1. State (`useState`, `useReducer`)
2. Props (passed down from a parent's state)
3. Context (`useContext`)

```jsx
import { useState } from 'react';

function ReactiveCounter() {
  // 'count' is REACTIVE. 
  // Calling setCount tells React: "Data changed! Re-render this component!"
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(count + 1)}>
      Reactive Count: {count} 
    </button>
  );
}
```

## 🥷 What is a Non-Reactive Value?

A non-reactive value is a piece of data that changes **silently**. React does not monitor it, and mutating it **will never trigger a re-render**. 

**Sources of Non-Reactive Values:**
1. Local variables (`let`, `const` inside or outside the component)
2. Mutable References (`useRef`)
3. Window or Browser APIs (e.g., `window.innerWidth`)

### The Local Variable Trap

A classic mistake beginners make is trying to use a normal `let` variable as state:

```jsx
// ❌ THE LOCAL VARIABLE TRAP
function BrokenCounter() {
  let count = 0; // Non-reactive!

  const increment = () => {
    count += 1; 
    console.log(count); // The console logs 1, 2, 3...
  };

  return (
    <button onClick={increment}>
      Broken Count: {count} {/* The UI will FOREVER show 0 */}
    </button>
  );
}
```
**Why does this fail?** 
1. `count` increments in memory, but because it's non-reactive, React doesn't know it changed. It never re-renders the UI.
2. Even worse, if a *different* reactive value forces this component to re-render, the function `BrokenCounter()` runs again from the top, resetting `let count = 0;`. All your progress is destroyed!

### The `useRef` Escape Hatch

If local variables get destroyed on re-render, how do we store non-reactive data that *survives* across re-renders? We use `useRef`.

`useRef` is a **non-reactive, persistent data box**. 

```jsx
import { useRef, useState } from 'react';

function Stopwatch() {
  const [seconds, setSeconds] = useState(0); // Reactive (Updates UI)
  
  // intervalId doesn't need to be seen by the user. 
  // We just need to remember it to clear the interval later.
  const intervalId = useRef(null); // Non-reactive (Silent)

  const start = () => {
    // Mutating .current does NOT trigger a re-render!
    intervalId.current = setInterval(() => setSeconds(s => s + 1), 1000);
  };

  const stop = () => {
    clearInterval(intervalId.current);
  };

  return (
    <div>
      <p>{seconds}s</p>
      <button onClick={start}>Start</button>
      <button onClick={stop}>Stop</button>
    </div>
  );
}
```

## 🚨 The Golden Rules

Knowing when to use Reactive vs Non-Reactive values separates junior developers from mid/senior developers. 

> [!IMPORTANT]
> **Rule 1: Does it affect what the user sees on the screen?**
> - **Yes:** It MUST be Reactive (`useState`).
> - **No:** It should probably be Non-Reactive (`useRef`).

> [!WARNING]
> **Rule 2: The Unnecessary Render Gotcha**
> If you put behind-the-scenes data (like a timer ID, a previous route string, or an intersection observer instance) into `useState`, you are forcing React to expensively recalculate the Virtual DOM and re-render the component every time that background data changes. **Always use `useRef` for background data.**

| Feature | Reactive (`useState`) | Non-Reactive (`useRef`) | Local Variables (`let`) |
| :--- | :--- | :--- | :--- |
| **Triggers Re-render?** | ✅ Yes | ❌ No | ❌ No |
| **Survives Re-renders?** | ✅ Yes | ✅ Yes | ❌ No (Resets) |
| **Use Case** | UI Data, form inputs, toggles | Timer IDs, DOM nodes, previous state | Temporary loop calculations |
