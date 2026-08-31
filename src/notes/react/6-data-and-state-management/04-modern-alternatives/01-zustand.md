# Modern Alternatives: Zustand

While Redux Toolkit (RTK) is the industry standard for enterprise applications, a new wave of state management libraries has recently taken the React world by storm. 

The most popular of these is **Zustand** (German for "State").

If an interviewer asks what modern alternatives to Redux you are familiar with, Zustand is the perfect answer.

## Why are developers moving to Zustand?

Even with RTK removing a lot of the boilerplate of legacy Redux, it still requires a fair bit of setup:
1. You must create a Slice.
2. You must configure a global Store.
3. You must wrap your entire React application in a `<Provider>`.
4. You must use two separate hooks (`useSelector` and `useDispatch`) to interact with it.

Zustand eliminates **all of this**. 

There is no Store configuration, no `<Provider>` wrapping your app, and no separate dispatching. You just create a custom hook and use it immediately.

## Zustand in Action

Let's build the exact same Shopping Cart we built in the Redux module, but using Zustand.

```jsx
// store/useCartStore.js
import { create } from 'zustand';

// 1. Create a custom hook! 
// We define both the state (items) AND the actions (addItem) in one place.
export const useCartStore = create((set) => ({
  // State
  items: [],
  totalQuantity: 0,
  
  // Actions
  addItem: (newItem) => set((state) => ({
    // Unlike RTK, Zustand does not use Immer by default. 
    // We must return a new, immutable object!
    items: [...state.items, newItem],
    totalQuantity: state.totalQuantity + 1
  })),

  clearCart: () => set({ items: [], totalQuantity: 0 })
}));
```

That's it! That is the entire setup. We don't need to add it to a `configureStore` file, and we don't need to wrap our `<App />` in a Provider.

### Consuming the Store

To use it, we just call our custom hook inside any component and extract exactly what we need.

```jsx
import { useCartStore } from './store/useCartStore';

function ProductCard({ product }) {
  // We extract the action directly from the hook! No 'useDispatch' needed.
  const addItem = useCartStore((state) => state.addItem);

  return (
    <div>
      <h3>{product.name}</h3>
      <button onClick={() => addItem(product)}>Add to Cart</button>
    </div>
  );
}

function CartBadge() {
  // We extract the state. 
  // Zustand will only re-render this component if 'totalQuantity' changes!
  const totalQuantity = useCartStore((state) => state.totalQuantity);
  
  return <span>Cart Items: {totalQuantity}</span>;
}
```

## Summary: Zustand vs Redux Toolkit

| Feature | Redux Toolkit (RTK) | Zustand |
| :--- | :--- | :--- |
| **Boilerplate** | Medium (Slices, Store, Provider) | Extremely Low (Just a Hook) |
| **App Wrapping** | Requires `<Provider store={store}>` | No Provider needed! |
| **Immutability** | Uses Immer (Allows "mutating" syntax) | Standard React Immutability (Spread operator) |
| **Ecosystem** | Massive. Standard in enterprise apps. | Growing rapidly, loved by indie hackers and startups. |
| **DevTools** | World-class Redux DevTools | Has middleware for Redux DevTools, but less native. |

> [!TIP]
> **Which one should you use?**
> If you are building a massive enterprise application with dozens of developers, Redux Toolkit's strict rules and powerful DevTools make it the safer choice. 
> 
> However, if you are building a personal project, a startup MVP, or just want to move incredibly fast without fighting boilerplate, **Zustand** is the undisputed champion of modern React state management.
