# `useEffect`: Managing Side Effects

To understand `useEffect`, we first must understand what a **Side Effect** is.

## What is a Side Effect?

In React, the main job of a component is strictly to take inputs (`props` and `state`) and calculate an output (JSX). This calculation should be a **pure** process (no outside interaction). 

A **Side Effect** is absolutely anything that reaches *outside* of this pure calculation to interact with the real world or external systems. 

**Examples of Side Effects:**
- 🌐 **Network Requests:** Fetching data from an API (like Swiggy) or a backend database.
- ⏱️ **Timers:** Setting a `setTimeout` or `setInterval`.
- 💾 **Browser Storage:** Reading from or writing to `localStorage`.
- 🌳 **Direct DOM Manipulation:** Bypassing React to change `document.title` or manually scrolling the window.
- 🔌 **Subscriptions:** Connecting to a WebSocket or a Firebase live database.

**What is NOT a Side Effect?**
- Returning JSX.
- Filtering an array passed as a prop.
- Doing math calculations (`2 + 2`).

### Why do we need a special Hook for Side Effects?

Imagine you put a network request directly inside your component's main body. Whenever the component renders, the network request fires. When the data returns, you update the state. The state update triggers a re-render. The re-render fires the network request again... **You just created an infinite loop that will crash your app!**

The `useEffect` hook acts as a safe harbor. It tells React: *"Hey, ignore this side effect while you are busy calculating the UI. Wait until the component has safely rendered and painted the screen, and **ONLY THEN** run this side effect."*

## Anatomy of `useEffect`

The hook takes two arguments:
1. A **callback function** containing the side effect logic.
2. An optional **Dependency Array** that dictates *when* the effect should run.

```jsx
import { useEffect } from 'react';

useEffect(() => {
  // Your side effect logic here
}, [dependencies]);
```

> [!IMPORTANT]
> The code inside `useEffect` runs **after** the component has rendered and painted the screen. This ensures that heavy operations (like network requests) don't block the UI from appearing.

## The Dependency Array: Controlling the Flow

The second argument—the dependency array—is arguably the most critical part of `useEffect`. It allows you to strictly control the execution of your side effects.

There are three distinct scenarios:

### 1. No Dependency Array (Avoid this)

If you omit the array entirely, the effect will run **after every single render**. 

```jsx
useEffect(() => {
  console.log("I run after the initial render AND after every state/prop change!");
});
```

> [!WARNING]
> **The Infinite Loop Trap**
> Omiting the dependency array is the most common way beginners crash their React apps. 
> 
> If you update a state variable inside an effect that has no dependency array, here is what happens:
> 1. Component renders.
> 2. `useEffect` runs.
> 3. You call `setCount(count + 1)` inside the effect.
> 4. State changes, so React **re-renders** the component.
> 5. Because there is no dependency array, the `useEffect` runs *again* after this new render.
> 6. `setCount` is called again... triggering another render... which triggers the effect... forever.

### 2. The Empty Array `[]` (On Mount Only)

If you pass an empty array, you are telling React: *"This effect depends on nothing. Therefore, only run it once when the component initially mounts (appears on screen)."*

```jsx
useEffect(() => {
  console.log("I run exactly once, when the component mounts.");
}, []);
```
*Use Case:* Initial data fetching (e.g., loading a restaurant list on a homepage), setting up global event listeners.

### 3. Array with Dependencies `[state, prop]`

If you pass variables into the array, the effect will run on the initial mount, **and** whenever any of those specific variables change between renders.

```jsx
const [searchQuery, setSearchQuery] = useState("");

useEffect(() => {
  console.log(`Fetching results for: ${searchQuery}`);
}, [searchQuery]); 
```
*Use Case:* Re-fetching data when a search term changes, re-calculating a value when a specific prop updates.

## Real World Example: Data Fetching Pattern

A common pattern in modern React (heavily utilized in production apps) is rendering a "Skeleton" or loading screen immediately, and fetching data in the background using `useEffect`.

```jsx
import { useState, useEffect } from 'react';

function RestaurantMenu() {
  const [menu, setMenu] = useState(null);

  useEffect(() => {
    // Define the async function inside the effect
    const fetchMenu = async () => {
      const response = await fetch('https://api.example.com/restaurants/123/menu');
      const data = await response.json();
      setMenu(data); // State update triggers a re-render with the real data
    };

    fetchMenu();
  }, []); // Empty array ensures we only fetch once on load

  // Initial render: show loading state
  if (!menu) {
    return <ShimmerUI /> // A loading skeleton
  }

  // Subsequent render (after fetch): show actual data
  return (
    <div>
      <h1>Menu</h1>
      {/* render menu items */}
    </div>
  );
}
```

## The Cleanup Function (Preventing Memory Leaks)

Sometimes, side effects create lingering connections or timers. If a component is removed from the DOM (unmounted), but its side effects are still running, it results in a **Memory Leak**.

To handle this, your `useEffect` callback can return a **cleanup function**.

```jsx
useEffect(() => {
  const timerId = setInterval(() => {
    console.log("Running every second...");
  }, 1000);

  // The Cleanup Function
  return () => {
    console.log("Component is unmounting! Clearing timer.");
    clearInterval(timerId);
  };
}, []);
```

### When does the cleanup function run?
1. **Right before the component unmounts** (is removed from the screen).
2. **Right before the effect runs again** (if it has dependencies). React cleans up the previous effect before applying the new one.

> [!TIP]
> Always clean up event listeners, WebSockets, and `setTimeout`/`setInterval` to keep your application performant and bug-free!
