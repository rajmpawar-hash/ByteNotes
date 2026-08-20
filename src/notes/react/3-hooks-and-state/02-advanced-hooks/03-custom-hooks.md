# Custom Hooks: Reusability and Modularity

As React applications grow, you often find yourself copying and pasting the exact same `useState` and `useEffect` logic across multiple components. 

For instance, an app might need to check if the user's internet connection is online in the Header, in a Checkout component, and in a Video Player component. Repeating the network listener logic everywhere violates the DRY (Don't Repeat Yourself) principle.

React solves this elegantly with **Custom Hooks**.

## What is a Custom Hook?

A Custom Hook is simply a standard JavaScript function that starts with the word `use` and calls other React Hooks inside of it. 

It acts as a wrapper to extract stateful logic out of a component. 

### Key Benefits
1. **Modularity:** Components become purely focused on the UI (JSX), while the custom hook handles the heavy logical lifting.
2. **Reusability:** Write the logic once, use it in a hundred components.
3. **Testability:** You can test the logic of a custom hook independently of the UI.

---

## Example 1: `useOnlineStatus`

Let's build a hook that listens to the browser's network status.

### 1. Creating the Hook
We create a separate file (e.g., `useOnlineStatus.js`) to house our logic.

```jsx
// useOnlineStatus.js
import { useState, useEffect } from 'react';

export const useOnlineStatus = () => {
  // Default to true assuming the user is online initially
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    // Event handler functions
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    // Attach listeners to the browser window
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // Cleanup: Remove listeners when component unmounts
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []); // Empty array ensures we only attach listeners once on mount

  // Return the single piece of state
  return isOnline;
};
```

### 2. Using the Hook
Now, consuming this logic in any component is effortlessly clean.

```jsx
import { useOnlineStatus } from './useOnlineStatus';

function Header() {
  const isOnline = useOnlineStatus();

  return (
    <header>
      <h1>My App</h1>
      <span>Status: {isOnline ? "🟢 Online" : "🔴 Offline"}</span>
    </header>
  );
}
```

> [!NOTE]
> **Wait, how does a "normal variable" trigger a re-render?**
> You might look at `const isOnline = useOnlineStatus();` and think: *"That's just a normal JavaScript variable. If the internet disconnects, how does the UI know to update?"*
> 
> The secret is that Custom Hooks are intimately tied to the component that calls them. 
> When the internet drops, the internal `setIsOnline(false)` inside the custom hook is called. Because the hook was executed inside the `Header`, **React triggers a re-render of the `Header` component**. 
> 
> The `Header` function runs again from top to bottom, calls `useOnlineStatus()` again (which now returns `false`), and the new UI is rendered. The state technically belongs to the `Header` component, even though the `useState` logic is hidden inside a different file!

---

## Example 2: `useRestaurantMenu` (Data Fetching Pattern)

Fetching data inside a component can make the component file bloated. Let's extract the fetching logic for a Swiggy-style restaurant menu.

### 1. Creating the Hook

```jsx
// useRestaurantMenu.js
import { useEffect, useState } from "react";

export const useRestaurantMenu = (resId) => {
  const [resInfo, setResInfo] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, [resId]); // Re-fetch if the restaurant ID changes

  const fetchData = async () => {
    try {
      const response = await fetch(`https://api.swiggy.com/menu?resId=${resId}`);
      if (!response.ok) throw new Error("Failed to fetch menu");
      
      const json = await response.json();
      setResInfo(json.data);
    } catch (err) {
      setError(err.message);
    }
  };

  // Return the data and potential error state
  return { resInfo, error };
};
```

### 2. Using the Hook

The `RestaurantMenu` component is now incredibly lightweight. It doesn't care *how* the data is fetched; it only cares about displaying it.

```jsx
import { useRestaurantMenu } from './useRestaurantMenu';
import Shimmer from './Shimmer';

function RestaurantMenu({ resId }) {
  // Destructure the custom hook's return value
  const { resInfo, error } = useRestaurantMenu(resId);

  if (error) return <h1>Something went wrong: {error}</h1>;
  if (resInfo === null) return <Shimmer />; // Loading state

  return (
    <div className="menu">
      <h1>{resInfo.name}</h1>
      <h3>{resInfo.cuisines.join(", ")}</h3>
      <ul>
        {resInfo.menuItems.map(item => (
          <li key={item.id}>{item.name} - ₹{item.price / 100}</li>
        ))}
      </ul>
    </div>
  );
}
```

## Custom Hook vs. Normal Function

You might be wondering: *If a custom hook is just a JavaScript function, what makes it special? Why not just call it a normal function?*

The fundamental difference lies in **React Superpowers**. 
- A normal JavaScript function can only execute standard JavaScript logic (loops, math, API calls). 
- A **Custom Hook** is allowed to call *other React Hooks* (like `useState`, `useEffect`, `useRef`). 

Because it calls internal React hooks, a custom hook directly ties into React's rendering lifecycle and component memory. A normal JS function cannot do this.

### Is the `use` prefix mandatory?

Technically, the JavaScript engine does not care what you name your function. However, in the React ecosystem, **yes, it is strictly enforced as mandatory**.

React uses a strict linter (`eslint-plugin-react-hooks`) to enforce the "Rules of Hooks" (e.g., you cannot call a hook inside an `if` statement or a `for` loop). 
If you name your function `fetchRestaurantData()` (no prefix) and try to call `useState` inside of it, React will throw a massive error. By prefixing it with `use` (e.g., `useRestaurantMenu()`), you explicitly signal to React: *"Hey, this function is a Hook. Please allow me to use React memory inside it and lint it accordingly."*

---

## The Rules of Custom Hooks

1. **Naming Convention:** The function name MUST start with `use` (e.g., `useAuth`, `useTheme`) as explained above.
2. **State Isolation:** Just like normal hooks, state is **not shared** between components using the same custom hook. If `Component A` and `Component B` both call `useOnlineStatus`, they each get their own independent instance of the `isOnline` state variable.
3. **Purity:** A custom hook should be a pure function in the sense that it relies only on its arguments and other hooks.
