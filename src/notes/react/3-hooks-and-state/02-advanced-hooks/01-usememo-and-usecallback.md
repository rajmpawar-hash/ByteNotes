# Performance Optimization: `useMemo` and `useCallback`

React is inherently fast thanks to the Virtual DOM. However, by default, when a component's state or props change, React re-renders that component **and all of its children**. 

In most cases, this is lightning fast. But when dealing with computationally heavy functions or deeply nested component trees, these redundant re-renders can degrade performance.

To solve this, React provides two optimization hooks: `useMemo` and `useCallback`.

> [!WARNING]
> **Avoid Premature Optimization.** Do not wrap every value and function in these hooks. They add memory overhead and their own computational cost. Only use them when you have identified a measurable performance bottleneck (e.g., a function taking >10ms to run, or a heavy chart component re-rendering needlessly).

---

## `useMemo`: Caching the Result

`useMemo` is used to cache (memoize) the **result** of an expensive calculation. 

If you have a function that crunches a massive array of data, you don't want it running on every single keystroke of an unrelated search bar in the same component.

### Syntax

```jsx
const cachedValue = useMemo(() => calculateExpensiveValue(a, b), [a, b]);
```

React will only re-run the `calculateExpensiveValue` function if either `a` or `b` changes. If the component re-renders for any other reason, React skips the calculation and returns the `cachedValue` from its memory.

### Real World Example: Heavy Filtering

```jsx
import { useState, useMemo } from 'react';

function ProductList({ products }) {
  const [theme, setTheme] = useState('light'); // Unrelated state

  // This operation is expensive! 
  // We only want it to run when `products` actually changes.
  const expensiveFilteredProducts = useMemo(() => {
    console.log("Filtering products... (Heavy Operation)");
    return products.filter(p => p.price > 100 && p.inStock);
  }, [products]); 

  return (
    <div className={theme}>
      <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
        Toggle Theme
      </button>
      
      {/* If we toggle the theme, the filtering function is NOT re-run! */}
      <ul>
        {expensiveFilteredProducts.map(p => <li key={p.id}>{p.name}</li>)}
      </ul>
    </div>
  );
}
```

---

## `useCallback`: Caching the Function Definition

While `useMemo` caches a value, `useCallback` caches a **function definition**.

### The Referential Equality Problem

In JavaScript, two functions are never strictly equal, even if they contain the exact same code:
```javascript
const func1 = () => console.log('hi');
const func2 = () => console.log('hi');
console.log(func1 === func2); // false
```

When a React component re-renders, it creates **brand new function references** for any functions defined inside it. 

> [!NOTE]
> **Wait, what is `React.memo`?**
> By default, if a parent component re-renders, ALL of its child components re-render too, regardless of whether their props changed. 
> `React.memo` is a wrapper you can put around a child component. It tells React: *"Only re-render this child if its props have actually changed."* It's a powerful performance optimization tool.

If you pass a function down to a child component as a prop, the child will see a "new" function reference on every single render. Because the prop is technically "different" (a new memory address), it will force the child to re-render itself, **completely breaking the performance benefits of `React.memo`!**

### Syntax

```jsx
const cachedFunction = useCallback(
  () => {
    doSomething(a, b);
  },
  [a, b], // Only recreate the function if a or b changes
);
```

### Real World Example: Preventing Child Re-renders

```jsx
import { useState, useCallback, memo } from 'react';

// React.memo tells React to skip rendering this component 
// if its props haven't changed.
const HeavyButton = memo(({ onClick, children }) => {
  console.log("HeavyButton Rendered!");
  return <button onClick={onClick}>{children}</button>;
});

function App() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState(""); // Unrelated state

  // Without useCallback, this function gets a new memory address on every render.
  // HeavyButton would see a "new" prop and re-render every time we type in the input.
  const handleIncrement = useCallback(() => {
    setCount(prev => prev + 1);
  }, []); // Empty array: this function never needs to change

  return (
    <div>
      <input 
        value={text} 
        onChange={(e) => setText(e.target.value)} 
        placeholder="Type here..." 
      />
      
      {/* HeavyButton will NOT re-render when typing in the input! */}
      <HeavyButton onClick={handleIncrement}>
        Count is {count}
      </HeavyButton>
    </div>
  );
}
```

## Summary Comparison

| Feature | `useMemo` | `useCallback` |
| :--- | :--- | :--- |
| **What it caches** | The returned value of the function. | The function definition itself. |
| **Primary Use Case**| Skipping expensive mathematical calculations. | Passing stable callbacks to optimized child components. |
| **Returns** | Any data type (Array, Object, Number). | A Function. |

---

## ⚡ React 18: Concurrent Rendering (Interview Bonus)

While `useMemo` and `useCallback` prevent *unnecessary* renders, React 18 introduced **Concurrent Rendering** hooks that help manage the performance of *necessary but heavy* renders. Interviewers highly value knowledge of these modern features.

### 1. `useTransition`
By default, all state updates in React are urgent. If you type in an input that filters a list of 10,000 items, the UI will freeze because React is urgently trying to render the massive list.
`useTransition` lets you mark specific state updates as "non-urgent" (transitions), allowing React to interrupt them to keep the UI responsive (e.g., keeping the input field snappy).

```jsx
import { useState, useTransition } from 'react';

function SearchList() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isPending, startTransition] = useTransition(); // The hook

  const handleChange = (e) => {
    setQuery(e.target.value); // URGENT: Update the input field immediately
    
    startTransition(() => {
      // NON-URGENT: Calculating the massive list can happen in the background
      setResults(heavyFilter(e.target.value)); 
    });
  };

  return (
    <div>
      <input value={query} onChange={handleChange} />
      {isPending ? <p>Loading...</p> : <List data={results} />}
    </div>
  );
}
```

### 2. `useDeferredValue`
Similar to `useTransition`, but used when you *receive* a value from above (like a prop) and cannot wrap the state update in `startTransition`. It tells React to use an older value for a heavy component while calculating the new value in the background.

```jsx
import { useDeferredValue, memo } from 'react';

// Imagine `text` changes rapidly (every keystroke)
function SlowList({ text }) {
  // React will "defer" this value. The heavy list will render with the old text 
  // until the main thread is free to render the new text.
  const deferredText = useDeferredValue(text);
  
  return <HeavyComputedList query={deferredText} />;
}
```
