# The Context API: Teleporting Data

To solve the Prop Drilling problem, React gives us a built-in feature called the **Context API**. 

Think of Context as a global "wormhole" or "teleporter". You wrap your application in a Context Provider, put data into it at the top, and any component anywhere in the tree can instantly "teleport" that data into its own scope, completely bypassing the intermediate components!

## The 3 Steps to Context

Using Context requires three distinct steps:
1. **Create** the Context.
2. **Provide** the Context (wrap it around the tree).
3. **Consume** the Context (extract the data).

```jsx
import { createContext, useContext, useState } from 'react';

// 1. CREATE the Context (Usually done in a separate file)
// We provide a default value (null), which is only used if a component tries to consume outside a Provider.
const ThemeContext = createContext(null);

export default function App() {
  const [theme, setTheme] = useState("dark");

  return (
    // 2. PROVIDE the Context
    // We wrap our component tree in the Provider and pass the data via the 'value' prop
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <Header />
    </ThemeContext.Provider>
  );
}

// Intermediate component: Notice how it DOES NOT take 'theme' as a prop!
function Header() {
  return (
    <header>
      <h1>My App</h1>
      <ThemeToggleButton />
    </header>
  );
}

function ThemeToggleButton() {
  // 3. CONSUME the Context
  // We use the useContext hook to pull the data directly out of the wormhole!
  const { theme, setTheme } = useContext(ThemeContext);

  const toggle = () => setTheme(theme === "dark" ? "light" : "dark");

  return (
    <button onClick={toggle}>
      Current Theme: {theme}
    </button>
  );
}
```

## The "Custom Provider" Pattern (Industry Standard)

In the example above, we declared the state (`theme`) and the `<ThemeContext.Provider>` directly inside our `App` component. 

In a real-world application, this gets messy quickly. If you have 5 different Contexts (Auth, Theme, Language, Cart, Notifications), your `App.js` will become a massive, unreadable pyramid of Providers.

The industry standard is to create a **Custom Provider Component** that encapsulates the state logic.

```jsx
// ThemeContext.js
import { createContext, useContext, useState } from 'react';

// 1. Create Context
const ThemeContext = createContext();

// 2. Create a Custom Provider Component
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("dark");
  
  const toggleTheme = () => setTheme(prev => prev === "dark" ? "light" : "dark");

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// 3. Create a Custom Hook for Consumers (Bonus points in interviews!)
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
```

Now, your `App.js` is perfectly clean:
```jsx
// App.js
import { ThemeProvider } from './ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <Header />
    </ThemeProvider>
  );
}
```

And your consumers just use the custom hook:
```jsx
// AnyComponent.js
import { useTheme } from './ThemeContext';

function AnyComponent() {
  const { theme, toggleTheme } = useTheme();
  // ...
}
```

---

## 🚨 The Performance Gotcha (Why Context !== Redux)

A common interview question: *"Since React has the Context API built-in, do we still need Redux for global state?"*

The answer is **YES**, because of how Context handles re-renders.

> [!WARNING]
> **The Context Re-render Trap**
> When the `value` prop of a Context Provider changes, **EVERY SINGLE COMPONENT that calls `useContext()` will re-render, even if it doesn't use the specific piece of data that changed!** Context has **no fine-grained subscriptions**.

### The Problem: Lack of Subscriptions

Imagine we have a massive context holding all of our app's global state:

```jsx
// The Context Value
const value = { 
  theme: "dark", 
  user: { name: "Raj" }, 
  cartItemCount: 3 
}

<MyContext.Provider value={value}>
```

Now, imagine we have a tiny `<ThemeToggleButton />` component. It only cares about the `theme`.

```jsx
function ThemeToggleButton() {
  const { theme } = useContext(MyContext); // Only extracting 'theme'
  return <button>{theme}</button>;
}
```

If the user clicks "Add to Cart", the `cartItemCount` changes from `3` to `4`. Because the `value` object in the Provider was updated, **the `<ThemeToggleButton />` is forced to re-render**, even though it doesn't give a damn about the cart!

When the Provider updates, it blasts a signal to every single component listening to it, yelling: *"THE VALUE CHANGED! RE-RENDER NOW!"*

### The Solution: Redux `useSelector`

If we built this exact same app in Redux, our `<ThemeToggleButton />` would use the `useSelector` hook to explicitly subscribe *only* to the theme slice:

```jsx
// Redux approach
function ThemeToggleButton() {
  // We explicitly subscribe ONLY to the theme
  const theme = useSelector((state) => state.theme); 
  return <button>{theme}</button>;
}
```

When the `cartItemCount` updates in Redux, Redux looks at the `<ThemeToggleButton />` and says, *"Did the theme change? No? Okay, leave this component alone."* The button **does not re-render.**

This is fine for **low-frequency updates** (Theme, Language, Authenticated User) because they rarely change. 

But for **high-frequency updates** (typing in a global search bar, an active timer, live stock prices, complex shopping carts), Context will cause massive performance bottlenecks. Redux is mandatory for complex, high-frequency state updates!

Context is for **Dependency Injection** (teleporting data), not true **Global State Management**.
