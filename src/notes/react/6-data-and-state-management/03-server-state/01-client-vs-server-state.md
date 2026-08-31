# The Modern Paradigm: Client State vs Server State

For years, developers dumped *everything* into Redux. User preferences, theme settings, fetched API data, loading spinners, caching logic—it all went into one massive Redux store.

This led to incredibly bloated, complex, and slow applications. 

Recently, the React community had a massive realization: **Not all state is created equal.** We now strictly separate state into two distinct categories: **Client State** and **Server State**.

## 1. Client State

Client state is ephemeral data that your browser "owns." It is synchronous, reliable, and disappears if the user refreshes the page.

**Examples of Client State:**
- The current theme (Dark vs Light mode).
- Whether a sidebar menu is open or closed.
- Text currently being typed into an input field.
- The current tab a user is viewing.

**How to manage it:**
Use `useState`, the Context API, or Redux ToolKit (Slices).

## 2. Server State

Server state is data that your browser has *borrowed* from a database. It is inherently asynchronous, unreliable, and shared among many users simultaneously.

**Examples of Server State:**
- A list of products fetched from an API.
- A user's profile data stored in the database.
- The current stock quantity of an item.

**The Challenges of Server State:**
Because your browser is just looking at a "snapshot" of the server data from when you fetched it, you run into massive caching issues:
1. **Caching:** If I navigate away from the products page and come back, should I show the old products instantly while fetching new ones, or show a loading spinner?
2. **Deduplication:** If two components mount at the exact same time and both need the user profile, how do I ensure only *one* network request is sent?
3. **Stale Data:** If User A buys the last laptop in stock, how does User B's screen update to show "Out of Stock" without manually refreshing the page?

## 🚨 The Anti-Pattern: Using Redux for Server State

Historically, we used Redux `createAsyncThunk` to fetch data, and stored the `data`, `isLoading`, and `error` inside our Redux Slices. 

**This is now considered an anti-pattern.**

Why? Because Redux is a synchronous state container. It doesn't inherently understand caching, cache invalidation, or deduplication. When you use Redux for server state, you are essentially trying to build a custom caching engine from scratch using `useEffect` and Reducers.

```jsx
// ❌ THE OLD WAY (Manual Server State Management)
function ProductList() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Manually handle mounting, unmounting, race conditions, 
    // caching, and deduplication... it's a nightmare!
    fetch('/api/products')
      .then(res => res.json())
      .then(d => {
        setData(d);
        setIsLoading(false);
      })
      .catch(e => {
        setError(e);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return <Spinner />;
  if (error) return <Error />;
  return <List data={data} />;
}
```

## The Solution: Server State Libraries

To handle the massive complexity of Server State, the industry has shifted to specialized data-fetching libraries. 

The two heavyweights are **React Query** (by TanStack) and **RTK Query** (built directly into Redux Toolkit).

These libraries completely eliminate the need for manual `useEffect` fetching. They give you auto-generated hooks that handle caching, background refetching, deduplication, and loading states completely under the hood!

In the next section, we will explore **RTK Query**.
