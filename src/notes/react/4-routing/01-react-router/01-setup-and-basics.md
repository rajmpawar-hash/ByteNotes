# Client-Side Routing: Older v6 vs Newer v6.4+

React itself does not have routing capabilities built-in; it is just a UI library. To achieve Client-Side Routing (Single Page Application behavior without page reloads), the industry standard is the `react-router-dom` library.

## The Two Paradigms of Modern React Router

React Router underwent a massive architectural shift between version 6.0 and version 6.4. In interviews and existing codebases, you will encounter two completely different ways to set it up:

1. **Older v6 (Component-Based Routing):** You build routes by rendering JSX `<Routes>` and `<Route>` components.
2. **Newer v6.4+ (Data-Based Routing):** You build routes using a pure JavaScript array (`createBrowserRouter`).

Understanding *both* is critical for modern React development.

---

## 1. Setup & Installation

```bash
npm i react-router-dom
```

### The Older Way: `<BrowserRouter>` (v6)

In the component-based approach, you literally wrapped your entire application tree inside a `<BrowserRouter>` component. This told React Router to listen to the URL for any components inside of it.

```jsx
// ❌ Older Approach (React Router v6 Component-Based)
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import AppLayout from './AppLayout';
import Home from './Home';
import About from './About';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  {/* 1. Wrap the app in BrowserRouter */}
  <BrowserRouter>
    {/* 2. Define Routes as JSX Components */}
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
    </Routes>
  </BrowserRouter>
);
```

### The Newer Way: `createBrowserRouter` (v6.4+ Recommended)

In the newer data-based approach, we no longer wrap our app in a `<BrowserRouter>` component. Instead, we define the routes as a pure data array *outside* of the React render cycle, and pass it to a self-closing `<RouterProvider />`.

```jsx
// ✅ Newer Approach (React Router v6.4+ Data-Based)
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import AppLayout from './AppLayout';
import Home from './Home';
import About from './About';

// 1. Define Routes as a Data Array
const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/about',
    element: <About />,
  }
]);

// 2. Pass the data to a self-closing Provider (No wrapping!)
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={appRouter} />
);
```

> [!IMPORTANT]
> **Interview Question: Why did React Router shift from Components to Data Arrays?**
> In the older approach, because routes were defined as React components, React had to actually *start rendering* the tree before it knew what the routes were. This caused a "waterfall" effect: React renders the route -> component mounts -> component fetches data -> component renders UI.
> 
> By moving to a **Data Array** (`createBrowserRouter`), the router knows exactly what the routes are *before* React even starts rendering. This enables powerful features like **Loaders**, which start fetching data for the next page the millisecond the user clicks a link, vastly improving performance!

---

## Navigating Between Pages: `<Link>` vs `<a>`

Regardless of whether you use the older or newer setup, navigating between pages works exactly the same way.

> [!WARNING]
> **The `<a>` Tag Gotcha**
> If you use a standard HTML anchor tag (`<a href="/about">About</a>`) in a React SPA, **you break the SPA behavior!** 
> 
> Clicking it will force the browser to do a full page refresh, wiping out all your React state (e.g., the user will be logged out if you stored their token in memory).

To navigate without refreshing the page, `react-router-dom` gives us a special component called `<Link>`.

### The ✅ Correct Way

```jsx
import { Link } from 'react-router-dom';

function NavigationBar() {
  return (
    <nav>
      {/* ❌ WRONG: Causes a full page reload */}
      <a href="/about">About Us (Wrong)</a> 

      {/* ✅ CORRECT: Instant transition, state is preserved */}
      <Link to="/about">About Us (Right)</Link>
      <Link to="/contact">Contact Us</Link>
    </nav>
  );
}
```

### How `<Link>` works under the hood
`react-router-dom` renders the `<Link>` component as a standard `<a>` tag in the actual DOM (so accessibility and SEO are preserved). However, it secretly attaches an `onClick` event listener to it. 
When clicked, it calls `event.preventDefault()` to stop the browser from refreshing, manually updates the URL bar using the browser's `History API`, and tells React Router to swap out the components instantly.
