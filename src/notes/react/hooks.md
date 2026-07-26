# React Hooks

Hooks let you use state and other React features without writing a class.

## Basic Hooks
- `useState`: Returns a stateful value, and a function to update it.
- `useEffect`: Accepts a function that contains imperative, possibly effectful code.
- `useContext`: Accepts a context object and returns the current context value.

```tsx
import React, { useState } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```
