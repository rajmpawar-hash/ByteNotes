# React Fiber Architecture

Introduced in React 16, **React Fiber** is a complete, backward-compatible rewrite of the React core reconciliation algorithm. It is the engine that powers modern React.

Understanding React Fiber is a massive plus in senior frontend interviews, as it shows you know *how* React works under the hood, not just how to use it.

## The Problem Before Fiber (React 15 and earlier)

Before Fiber, React used a "Stack Reconciler". It worked synchronously.

When a state change occurred, React would start at the top of the component tree and recursively process every component down to the bottom. 
This process **could not be interrupted**.

If the component tree was deep and complex, this synchronous traversal would tie up the main thread. 
*   **The Result:** The browser couldn't paint the screen, process user input (like typing in an input field), or run animations until React finished its rendering cycle. 
*   This caused "janky" animations and unresponsive UIs (dropped frames) when handling large updates.

## What is React Fiber?

**React Fiber** is the new reconciliation engine. Its primary goal is to enable **incremental rendering** of the virtual DOM.

> [!NOTE]
> **Is Fiber a new Diffing Algorithm?**
> No, it is not. The core rules of the Diffing Algorithm (checking if element types changed, checking `keys`) remained exactly the same. 
> What changed with Fiber is the **underlying engine that executes that algorithm**. Before Fiber, the diffing algorithm was executed synchronously and couldn't be stopped. Fiber provides a new architecture to execute that exact same diffing algorithm in chunks, allowing it to be paused, prioritized, and resumed.

A "Fiber" is essentially a JavaScript object that represents a unit of work.

Instead of rendering the entire component tree at once synchronously, Fiber breaks the rendering work into small chunks (units of work). React can now:
1.  Pause work and come back to it later.
2.  Assign priority to different types of work.
3.  Reuse previously completed work.
4.  Abort work if it's no longer needed.

## How Fiber Works: Scheduling and Priorities

Fiber introduces a scheduling system. React now works like an operating system, managing tasks on a single thread.

When an update happens, React creates tasks (units of work represented by Fibers). It assigns a priority to these tasks based on what caused them.

*   **High Priority (Synchronous):** User interactions (typing, clicking, hovering). These need immediate feedback to feel responsive.
*   **Low Priority (Asynchronous):** Data fetching, large list rendering, off-screen updates. These can be delayed for a few milliseconds without the user noticing.

### The Render and Commit Phases

Fiber splits the React rendering process into two distinct phases:

### 1. The Render Phase (Asynchronous / Interruptible)
During this phase, React walks through the component tree and figures out what changes need to be made to the DOM.
*   It builds a "Work-in-progress" Fiber tree alongside the current tree.
*   **Crucially, this phase can be paused, aborted, or restarted.**
*   If a high-priority task (like a user typing) comes in while React is processing a low-priority task (like rendering a large list), React will pause the list rendering, process the user input, and then resume the list rendering.
*   *Note: Because this phase can be run multiple times and interrupted, lifecycle methods or functions used here (like `useState` initializers or component bodies) must be Pure and have no side-effects.*

### 2. The Commit Phase (Synchronous / Uninterruptible)
Once the Render phase finishes and React knows exactly what changes are needed, it moves to the Commit phase.
*   In this phase, the changes (the "effect list") are actually applied.
*   **Important Distinction:** React Fiber (the reconciler) **does not** touch the Real DOM or paint the screen. That is the job of the **Renderer** (e.g., `react-dom` for the web, or `react-native` for mobile). Fiber calculates the diff, and `react-dom` applies that diff to the Real DOM.
*   **This phase is synchronous and cannot be interrupted.**
*   Once the DOM is updated, React runs side effects like `useEffect` and `useLayoutEffect`.

## The Fiber Data Structure

Under the hood, a Fiber node is just a JavaScript object. While the old stack reconciler used the call stack to traverse the tree, Fiber uses a singly linked list data structure to represent the component tree.

Each Fiber node has pointers to its:
*   **`child`:** The first child component.
*   **`sibling`:** The next sibling component.
*   **`return`:** The parent component.

This linked list structure allows React to traverse the tree using a `while` loop, enabling it to pause and resume the traversal (unlike the previous recursive approach which relied on the Javascript call stack).

## End-to-End Update Lifecycle

To put it all together, here is the exact sequence of events when a user triggers a state update in a React application:

1.  **State Change:** An event handler triggers a state update (e.g., `setState` is called).
2.  **Render Phase (Fiber Engine):** 
    *   React creates a new Virtual DOM tree representing the UI for the new state.
    *   The **Diffing Algorithm** runs to compare this new VDOM tree with the old VDOM tree.
    *   React calculates the exact differences and creates an "Effect List" (the mutations needed).
    *   *(This phase happens entirely in memory, is interruptible, and does not touch the screen).*
3.  **Commit Phase (ReactDOM):** 
    *   React passes the Effect List to the Renderer (e.g., `ReactDOM`).
    *   `ReactDOM` synchronously mutates the Real DOM based on the Effect List (adding, updating, or deleting actual DOM nodes).
4.  **Browser Paint:**
    *   Now that the Real DOM has been updated, the browser takes over, recalculates the CSS layout, and repaints the screen so the user actually sees the change.
5.  **Side Effects:**
    *   Finally, React fires any `useEffect` hooks that were dependent on the render.

## Summary

React Fiber changed React from a synchronous, blocking engine into an asynchronous, interruptible engine. By breaking rendering into small units of work and assigning priorities, Fiber ensures that the main thread is never blocked for too long, resulting in smooth animations and highly responsive user interfaces, even in massively complex applications.
