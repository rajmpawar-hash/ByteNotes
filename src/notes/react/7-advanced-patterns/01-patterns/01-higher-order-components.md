# Higher-Order Components (HOCs): The Factory Pattern

In React, we build applications by composing reusable UI elements called components. But what happens when we want to reuse **component logic** across multiple, visually different components?

Enter the **Higher-Order Component (HOC)** pattern. 

An HOC is an advanced technique in React for reusing component logic. It is not an API built into React; rather, it is a pattern that emerges from React's compositional nature.

> [!NOTE]
> **The Definition**
> A Higher-Order Component is a **function** that takes a component and returns a **new component**.
> `const EnhancedComponent = higherOrderComponent(WrappedComponent);`

Think of an HOC as a "Component Factory". You send in a raw component, the factory modifies it, injects some data or behavior, and spits out an upgraded, enhanced version of that component.

## The Classic `withAuth` Example

Imagine we have three pages: `Dashboard`, `Settings`, and `Profile`. All three should only be accessible if the user is logged in.

Without an HOC, you would have to duplicate the authentication check inside every single page:

```jsx
// ❌ WRONG: Duplicated Logic
function Dashboard() {
  const isAuthenticated = checkAuth();
  if (!isAuthenticated) return <LoginRedirect />;

  return <div>Welcome to the Dashboard!</div>;
}

function Settings() {
  const isAuthenticated = checkAuth();
  if (!isAuthenticated) return <LoginRedirect />;

  return <div>Here are your Settings.</div>;
}
```

Instead of duplicating the `if(!isAuthenticated)` logic, let's create a factory (an HOC) that wraps *any* component with this authentication logic.

```jsx
// ✅ CORRECT: The HOC approach

// 1. We create a function that takes a Component as an argument
const withAuth = (WrappedComponent) => {

  // 2. We return a brand new component
  return function EnhancedComponent(props) {
    const isAuthenticated = checkAuth();

    // 3. We inject our logic
    if (!isAuthenticated) {
      return <LoginRedirect />;
    }

    // 4. We render the original component, passing all props through!
    return <WrappedComponent {...props} />;
  };
};
```

Now, we can effortlessly secure any component in our app simply by passing it through our factory:

```jsx
const Dashboard = (props) => <div>Welcome to the Dashboard, {props.user}!</div>;
const Settings = (props) => <div>Here are your Settings.</div>;

// We export the ENHANCED versions
export const SecuredDashboard = withAuth(Dashboard);
export const SecuredSettings = withAuth(Settings);
```

When you render `<SecuredDashboard user="Raj" />`, the `user` prop passes directly through the HOC down into the actual `Dashboard` component thanks to the `<WrappedComponent {...props} />` spread operation.

---

## 🚨 Critical Gotchas

### 1. DO NOT use HOCs inside the render method

This is a massive performance pitfall that will destroy your app's state.

```jsx
// ❌ CRITICAL MISTAKE
function App() {
  // Creating an HOC dynamically inside render!
  const EnhancedComponent = withAuth(MyComponent); 

  return <EnhancedComponent />;
}
```

**Under the hood:** When `App` re-renders, the `withAuth(MyComponent)` function executes again. It returns a **brand new function reference in memory**. React's reconciliation algorithm (`diffing`) sees that the component reference has changed, so it completely **unmounts** the old component, destroying its state, and mounts the new one from scratch.

> [!CAUTION]
> Always apply HOCs *outside* of the component definition so that the enhanced component is only created once.

### 2. Refs are NOT passed through

While normal props are seamlessly passed through an HOC via `{...props}`, **refs are not**. A `ref` is not a real prop in React (just like `key`). If you pass a ref to a component wrapped in an HOC, the ref will attach to the outermost container component returned by the HOC, not the wrapped component inside.

To fix this, you must use `React.forwardRef` inside your HOC to intercept the ref and manually pass it down.

```jsx
// ✅ Passing refs through an HOC
const withAuthAndRef = (WrappedComponent) => {
  const EnhancedComponent = React.forwardRef((props, ref) => {
    const isAuthenticated = checkAuth();
    if (!isAuthenticated) return <LoginRedirect />;
    
    // Pass the intercepted ref down manually
    return <WrappedComponent {...props} ref={ref} />;
  });

  return EnhancedComponent;
};
```

## Are HOCs dead in modern React?

With the introduction of **React Hooks** in 2018, the need for HOCs plummeted. Custom hooks (e.g., `useAuth()`) provide a cleaner, more readable way to share logic without wrapping components in endless nesting (often referred to as "Wrapper Hell"). 

However, HOCs are still heavily used in older codebases, library integrations (like Redux's `connect`), and for specific patterns like injecting cross-cutting concerns (e.g., `withErrorBoundary`, `withAnalytics`). Understanding them is mandatory for senior React interviews.
