# Functional Components

In modern React development, **Functional Components** are the standard way to build user interfaces. While older React codebases used Class Components, the introduction of React Hooks (in v16.8) allowed Functional Components to do everything Class Components could do, but with cleaner and more concise syntax.

## What is a Functional Component?

At its core, a Functional Component is simply a JavaScript (or TypeScript) function that returns a React Element (typically written in JSX).

```javascript
// A simple Functional Component in JavaScript
function Welcome() {
  return <h1>Hello, World!</h1>;
}
```

```typescript
// The same Component in TypeScript
import React from 'react';

const Welcome: React.FC = () => {
  return <h1>Hello, World!</h1>;
};
```

### Key Characteristics

1.  **It's just a function:** It takes an optional input called `props` and returns what should be rendered.
2.  **Naming Convention:** Component names **must** start with a capital letter (e.g., `Header`, `UserProfile`). If you start it with a lowercase letter (e.g., `header`), React will treat it as a standard HTML DOM element instead of a custom component.
3.  **Return Value:** It must return a single root React Element, a Fragment, an array of Elements, or `null`.

## Component Composition

One of the most powerful features of React is **Composition**. You can build complex UIs by combining smaller, reusable functional components together.

Think of it like building blocks or Lego pieces.

```jsx
// 1. Smaller, reusable components
const Title = () => <h1>Welcome to my App</h1>;
const Subtitle = () => <p>This is a paragraph below the title.</p>;

// 2. Composing them into a larger component
const Header = () => {
  return (
    <header>
      <Title />
      <Subtitle />
    </header>
  );
};
```

When React renders `<Header />`, it will look inside the `Header` function, see `<Title />` and `<Subtitle />`, execute those functions, and inject their returned JSX into the final output.

## Pure Functions in React

React strictly dictates that all Functional Components must act like **Pure Functions** with respect to their props.

A **Pure Function** is a function that:
1.  Always returns the same output for the same input.
2.  Does not cause any observable side effects (like modifying external variables or directly mutating DOM).

While components *can* have side effects (handled via the `useEffect` hook) and *can* have internal state (handled via `useState`), the core rendering logic should remain pure. It shouldn't mutate external state during the render phase.

## Why Functional Components over Class Components?

If you encounter Class Components in older code, here is why the industry shifted to Functional Components:

1.  **Simplicity:** Functions are easier to read, write, and test than classes. There is no confusing `this` binding.
2.  **Less Boilerplate:** You don't need to write `class XYZ extends React.Component` or a `render()` method.
3.  **Hooks:** Hooks (`useState`, `useEffect`) allow you to easily share and extract stateful logic between components, which was incredibly difficult to do cleanly with Class Components (often requiring patterns like Higher-Order Components or Render Props).

## Summary

Functional components are the heart of modern React applications. They are plain JavaScript functions that accept data (`props`) and return UI (`JSX`). By breaking down your UI into small, composed functional components, you can build scalable and highly maintainable applications.
