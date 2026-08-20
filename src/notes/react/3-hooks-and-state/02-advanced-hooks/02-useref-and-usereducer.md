# Bypassing the Render Cycle: `useRef` and `useReducer`

While `useState` is the bread and butter of React components, there are times when its strict "update = re-render" paradigm is either overkill or insufficient. 

For these scenarios, React provides `useRef` for mutable, non-rendering memory, and `useReducer` for complex, predictable state management.

---

## `useRef`: The Silent Memory

The `useRef` hook allows you to persist data between renders **without** causing a re-render when the data changes. 

> [!NOTE]
> **Why can't we just use a normal variable (e.g., `let timer = null;`)?**
> - If you declare a normal variable **inside** the component function, it gets completely wiped out and reset every single time the component re-renders (because the function executes from top to bottom again).
> - If you declare it **outside** the component function, it is shared across *all* instances of that component on the screen. If you render three `<Stopwatch />` components, they would all overwrite the exact same timer variable!
> 
> `useRef` is the perfect solution. It gives you a persistent "secret pocket" that survives re-renders AND is strictly local to that specific component instance.

### Syntax
```jsx
const myRef = useRef(initialValue);
```
This returns a simple JavaScript object with a single property: `{ current: initialValue }`. You can freely mutate `myRef.current`.

### Use Case 1: Accessing DOM Elements directly

In React, we try to avoid direct DOM manipulation (like `document.getElementById`). However, for specific tasks like managing focus, media playback, or integrating with third-party DOM libraries (like D3 or Chart.js), we need direct access.

```jsx
import { useRef } from 'react';

function FocusInput() {
  // 1. Create the ref
  const inputRef = useRef(null);

  const handleFocus = () => {
    // 3. Access the actual DOM node and call native methods
    inputRef.current.focus();
    inputRef.current.style.backgroundColor = 'yellow';
  };

  return (
    <div>
      {/* 2. Attach the ref using the special `ref=` prop. */}
      <input ref={inputRef} type="text" placeholder="Click button to focus" />

      {/* 
        What does attaching the ref actually do? 
        After this component renders on the screen, React takes the actual HTML element
        and silently does this behind the scenes:
        
        inputRef.current = document.querySelector('input');
        
        This means `inputRef.current` literally becomes the HTML node. 
        You can now do normal JavaScript things to it, such as:
        - inputRef.current.focus()
        - inputRef.current.value = "Hello"
        - inputRef.current.style.display = "none"
        - inputRef.current.getBoundingClientRect()
      */}

      <button onClick={handleFocus}>Focus Input</button>
    </div>
  );
}
```

### Use Case 2: Storing Mutable Values (Timers)

If you store a `setInterval` ID in a normal variable, it gets wiped on re-render. If you store it in `useState`, clearing the interval causes an unnecessary re-render. `useRef` is the perfect middle ground.

```jsx
import { useState, useRef } from 'react';

function Stopwatch() {
  const [time, setTime] = useState(0);
  const timerRef = useRef(null); // Holds the interval ID secretly

  const startTimer = () => {
    if (timerRef.current !== null) return;
    timerRef.current = setInterval(() => setTime(t => t + 1), 1000);
  };

  const stopTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = null; // Update the ref without triggering a render
  };

  return (
    <div>
      <p>Seconds: {time}</p>
      <button onClick={startTimer}>Start</button>
      <button onClick={stopTimer}>Stop</button>
    </div>
  );
}
```

---

## `useReducer`: Predictable Complex State

When your state logic becomes complex—perhaps involving deeply nested objects, or multiple state variables that rely on one another—`useState` can result in spaghetti code spread across multiple event handlers.

`useReducer` solves this by moving the state update logic outside the component into a central **reducer function**. It is heavily inspired by the Redux architecture.

### The Mental Model

1. **State:** The current data.
2. **Action:** An object describing *what* happened (e.g., `{ type: 'INCREMENT' }`).
3. **Dispatch:** The function you call to send an action to the reducer.
4. **Reducer:** A pure function that takes the current state and the action, and computes the *new* state.

### Syntax and Example

```jsx
import { useReducer } from 'react';

// 1. Define initial state
const initialState = { count: 0, error: null };

// 2. Define the pure Reducer function (outside the component)
function reducer(state, action) {
  switch (action.type) {
    case 'INCREMENT':
      return { ...state, count: state.count + 1, error: null };
    case 'DECREMENT':
      if (state.count === 0) {
        return { ...state, error: 'Cannot go below zero' };
      }
      return { ...state, count: state.count - 1 };
    default:
      return state;
  }
}

function Counter() {
  // 3. Initialize useReducer
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <p>Count: {state.count}</p>
      {state.error && <p style={{ color: 'red' }}>{state.error}</p>}
      
      {/* 4. Dispatch actions based on user interaction */}
      <button onClick={() => dispatch({ type: 'DECREMENT' })}>-</button>
      <button onClick={() => dispatch({ type: 'INCREMENT' })}>+</button>
    </div>
  );
}
```

### When to choose `useReducer` over `useState`?

*   **Complexity:** When state transitions are complex (e.g., managing a shopping cart where adding an item must update total price, item count, and discount eligibility simultaneously).
*   **Testability:** Because the reducer is a pure JavaScript function completely decoupled from React, it is incredibly easy to unit test independently.
*   **Predictability:** It forces you to define strict "Actions", making state changes trackable and less prone to random mutation bugs.
