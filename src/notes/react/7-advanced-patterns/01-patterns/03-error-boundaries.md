# Error Boundaries: The React Safety Net

In the past, a JavaScript error inside a component's render method or lifecycle hooks would corrupt React's internal state. This resulted in the user staring at a blank white screen—the dreaded "White Screen of Death."

React 16 introduced a brilliant safety net to catch these unhandled exceptions: **Error Boundaries**.

An Error Boundary is a React component that catches JavaScript errors anywhere in its child component tree, logs those errors, and displays a fallback UI instead of crashing the entire application.

Think of it like a massive `try/catch` block, but for React components.

## How to create an Error Boundary

> [!IMPORTANT]
> **Class Components Only!**
> As of modern React, there is still **no Hook equivalent** for Error Boundaries. You cannot use a functional component to create an error boundary. You MUST use a Class Component that implements either `static getDerivedStateFromError()` or `componentDidCatch()`.

Here is the boilerplate for a standard Error Boundary:

```jsx
import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorMessage: '' };
  }

  // 1. Update State to show fallback UI
  static getDerivedStateFromError(error) {
    // This runs during the "render" phase. 
    // Return the new state object to trigger a fallback UI.
    return { hasError: true, errorMessage: error.message };
  }

  // 2. Side effects (logging the error)
  componentDidCatch(error, errorInfo) {
    // This runs during the "commit" phase.
    // Perfect place to log the error to an external service (Sentry, Datadog)
    console.error("Error caught by boundary:", error, errorInfo);
    // logToMyMonitoringService(error, errorInfo);
  }

  render() {
    // If an error occurred, render the fallback UI
    if (this.state.hasError) {
      return (
        <div className="error-fallback">
          <h2>Oops, something went wrong!</h2>
          <p>{this.state.errorMessage}</p>
        </div>
      );
    }

    // Otherwise, render the children normally
    return this.props.children; 
  }
}

export default ErrorBoundary;
```

## How to use it

You simply wrap the `ErrorBoundary` around components that you want to protect. A common pattern is wrapping top-level route components or independent widgets (like a third-party advertisement widget).

```jsx
function App() {
  return (
    <div>
      <Header />
      
      {/* If WidgetA crashes, only this section shows the fallback UI. The rest of the app stays alive! */}
      <ErrorBoundary>
        <WidgetA />
      </ErrorBoundary>

      <ErrorBoundary>
        <WidgetB />
      </ErrorBoundary>
      
      <Footer />
    </div>
  );
}
```

---

## 🚨 The Massive "Gotcha": What Error Boundaries DO NOT Catch

A very common interview trap is assuming Error Boundaries catch *all* errors. **They do not.**

Error boundaries only catch errors that occur during the **React rendering lifecycle** (rendering, lifecycle methods, and constructors of the tree below them).

They **DO NOT** catch errors in:

1. **Event Handlers:** If an error is thrown inside an `onClick` handler, the error boundary will NOT catch it. React doesn't need error boundaries for event handlers because event handlers don't happen during rendering.
2. **Asynchronous Code:** `setTimeout`, `requestAnimationFrame`, or API fetch promises `.catch()`.
3. **Server-Side Rendering (SSR).**
4. **Errors thrown in the Error Boundary itself:** It only catches errors in its *children*.

### How to handle Event Handler Errors?

For event handlers and async code, you should just use the standard JavaScript `try/catch` block.

```jsx
// ❌ Error Boundary will NOT catch this!
function BadButton() {
  const handleClick = () => {
    throw new Error("I crashed!"); // Bypasses the boundary!
  };
  return <button onClick={handleClick}>Click me</button>;
}

// ✅ Correct approach for event handlers
function GoodButton() {
  const [error, setError] = useState(null);

  const handleClick = async () => {
    try {
      await fetchSomeData();
    } catch (err) {
      // Handle it manually via state, or toast notifications
      setError(err.message);
    }
  };

  if (error) return <p>Failed: {error}</p>;
  return <button onClick={handleClick}>Fetch</button>;
}
```

## The React-Error-Boundary Library

While writing a class component is required, the React community has widely adopted a third-party library called `react-error-boundary` by Brian Vaughn (a former React core team member). 

It provides a modern, hook-friendly API that abstracts the class component away and gives you advanced features like "resetting" the error state.

```jsx
import { ErrorBoundary } from 'react-error-boundary';

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  )
}

function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <MyWidget />
    </ErrorBoundary>
  )
}
```
