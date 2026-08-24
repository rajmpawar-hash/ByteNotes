# Dynamic Routing and Error Boundaries

So far, we have looked at static routes (e.g., `/about` always maps to `<About />`). 

But what if you are building an e-commerce site with thousands of products? You cannot manually hardcode a route for every single item (`/product/1`, `/product/2`, etc.).

This is where **Dynamic Routing** comes in.

## 1. Dynamic Segments (Same in Older and Newer v6)

In React Router, you can define a "Dynamic Segment" in your path by prefixing a segment with a colon (`:`). This tells the router: *"This part of the URL is a variable, not an exact string."*

```jsx
// Newer Data-Based Example
const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        path: '/product/:productId', // ':productId' is the dynamic variable
        element: <ProductDetails />,
      }
    ]
  }
]);
```
If the user navigates to `/product/123` or `/product/macbook-pro`, React Router will match it to the `<ProductDetails />` component.

## 2. Reading the URL with `useParams`

Once inside the `<ProductDetails />` component, how do we know *which* product to fetch from our backend? We use the `useParams` hook to extract the variable from the URL.

```jsx
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

function ProductDetails() {
  // Extract the variable. The variable name MUST match the one in the config!
  const { productId } = useParams(); 
  
  const [productData, setProductData] = useState(null);

  useEffect(() => {
    // We use the dynamic ID to fetch specific data
    fetch(`https://api.my-store.com/products/${productId}`)
      .then(res => res.json())
      .then(data => setProductData(data));
  }, [productId]); // Always include the ID in the dependency array!

  if (!productData) return <h2>Loading...</h2>;

  return (
    <div>
      <h1>{productData.name}</h1>
      <p>Price: ${productData.price}</p>
    </div>
  );
}
```

### Advanced: Multiple Parameters and Query Strings

You can have multiple dynamic segments in a single route. You can also read query parameters (e.g., `?sort=price&color=red`) using the `useSearchParams` hook.

```jsx
// Configuration:
// path: '/category/:categoryId/product/:productId'

import { useParams, useSearchParams } from 'react-router-dom';

function ProductDetails() {
  // Extracting multiple dynamic segments
  const { categoryId, productId } = useParams(); 
  
  // Extracting query parameters (e.g. ?color=red)
  const [searchParams, setSearchParams] = useSearchParams();
  const color = searchParams.get("color");

  return (
    <div>
      <h1>Product {productId} in Category {categoryId}</h1>
      <p>Selected Color: {color || 'Default'}</p>
      
      {/* Updating the query string without changing the route */}
      <button onClick={() => setSearchParams({ color: 'blue' })}>
        Change to Blue
      </button>
    </div>
  );
}
```

---

## Error Handling: The Blank White Screen Problem

One of the most common issues in React applications is that a single javascript error anywhere in the component tree crashes the entire application, leaving the user staring at a **Blank White Screen**. 

Additionally, what happens if the user navigates to a URL that doesn't exist (a 404), like `/abouuut`?

### The Older Way: Catch-all Routes & Manual Boundaries (v6)
In the older component-based routing, handling a 404 required you to add a "catch-all" route with an asterisk (`*`) at the very bottom of your `<Routes>` list. Handling actual javascript crashes required you to manually build complex "Error Boundary" class components.

```jsx
// ❌ Older Approach (React Router v6 Component-Based)
<Routes>
  <Route path="/" element={<Home />} />
  {/* Catch-all for 404s */}
  <Route path="*" element={<NotFoundPage />} /> 
</Routes>
```

### The Newer Way: `errorElement` (v6.4+ Recommended)
React Router v6.4+ solves both 404s and javascript crashes elegantly in a single step using `errorElement` and the `useRouteError` hook.

You can attach an `errorElement` to any route in your configuration (usually at the root). If *anything* goes wrong, React Router catches it and displays the `errorElement` instead of crashing the whole app.

```jsx
// ✅ Newer Approach (React Router v6.4+ Data-Based)
const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    errorElement: <ErrorPage />, // Catches 404s AND component crashes!
    children: [
      /* ... routes */
    ]
  }
]);
```

### Creating the `ErrorPage` Component

Inside the error component, you can use the `useRouteError` hook to figure out exactly what went wrong and display a friendly message to the user.

```jsx
import { useRouteError, Link } from 'react-router-dom';

function ErrorPage() {
  // Extract the error details provided by React Router
  const err = useRouteError(); 
  
  return (
    <div className="error-container">
      <h1>Oops! Something went wrong.</h1>
      
      {/* 
        If it's a 404, 'err.status' will be 404 and 'err.statusText' will be "Not Found" 
      */}
      <h2>{err.status}: {err.statusText}</h2>
      
      <p>The page you are looking for does not exist or an error occurred.</p>
      
      <Link to="/">Go back to Home</Link>
    </div>
  );
}
```

> [!WARNING]
> **Why is this important? (Under the Hood)**
> Without `errorElement`, if a child component tries to read `data.name` but `data` is `undefined`, React throws an error. Because React uses a Virtual DOM tree, an error in a child node corrupts the tree calculation, causing the *entire* tree to unmount (the blank screen). 
>
> By providing an `errorElement`, React Router creates an **Error Boundary**. It acts as a safety net that catches the error bubbling up the tree, stops it from destroying the root Layout, and renders the fallback UI instead.
