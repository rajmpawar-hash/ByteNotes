# Redux Toolkit (RTK) Core Concepts

Redux Toolkit (RTK) is the official, opinionated, batteries-included toolset for efficient Redux development. It completely eliminates the confusing boilerplate of legacy Redux.

Let's build a global Shopping Cart step-by-step using RTK.

## 1. Creating a "Slice" (`createSlice`)

In RTK, you don't write manual Actions and manual Reducers in separate files anymore. Instead, you create a **Slice**. A slice automatically generates the actions and reducers for a specific feature of your app.

```javascript
// features/cart/cartSlice.js (or .ts)
import { createSlice } from '@reduxjs/toolkit';
// TS: import type { PayloadAction } from '@reduxjs/toolkit';

// TS: interface CartState { items: any[]; totalQuantity: number; }
const initialState /* : CartState */ = {
  items: [],
  totalQuantity: 0,
};

const cartSlice = createSlice({
  name: 'cart', // The namespace for the generated actions
  initialState, // The starting data
  reducers: {
    // 1. Reducer to add an item
    addItem(state, action /* : PayloadAction<any> */) {
      const newItem = action.payload;
      state.items.push(newItem); 
      state.totalQuantity++;
    },
    // 2. Reducer to clear the cart
    clearCart(state) {
      state.items = [];
      state.totalQuantity = 0;
    }
  }
});

// RTK automatically generates Action Creators with the same name!
export const { addItem, clearCart } = cartSlice.actions;

// Export the reducer so the Store can use it
export default cartSlice.reducer;
```

> [!IMPORTANT]
> **The Immer.js Magic (Interview Gold)**
> In legacy React and Redux, mutating state directly (e.g., `state.items.push()`) is strictly forbidden. You **must** create copies using spread operators (`return { ...state, items: [...state.items, newItem] }`).
> 
> **Why does RTK let us mutate state?** 
> Under the hood, RTK uses a library called **Immer.js**. When you write "mutating" code inside `createSlice`, Immer secretly intercepts it, records the changes, and safely returns a perfectly immutable copy! It allows you to write simple, readable code without breaking Redux's strict immutability rules.

## 2. Configuring the Store (`configureStore`)

Once we have our slice, we need to register its reducer into the global Store.

```javascript
// store.js (or .ts)
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './features/cart/cartSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer, // We register the cart slice under the 'cart' key
    // auth: authReducer, 
    // theme: themeReducer,
  }
});

// TS: export type RootState = ReturnType<typeof store.getState>;
// TS: export type AppDispatch = typeof store.dispatch;
```

To make the Store available to React, we wrap our root app in a `<Provider>` (just like Context!).

```jsx
// index.js
import { Provider } from 'react-redux';
import { store } from './store';

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
```

## 3. Reading Data (`useSelector`) and The Performance Gotcha

To extract data from the Redux store, we use the `useSelector` hook. 

```jsx
import { useSelector } from 'react-redux';
// TS: import type { RootState } from './store';

function CartBadge() {
  // We extract exactly what we need
  // TS: const totalQuantity = useSelector((state: RootState) => state.cart.totalQuantity);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  
  return <span>Cart Items: {totalQuantity}</span>;
}
```

> [!WARNING]
> **The `useSelector` Performance Trap**
> `useSelector` forces your component to re-render *only if the selected data changes*. 
> 
> ❌ **WRONG:** `const cart = useSelector(state => state.cart)`
> If you select the *entire* cart object, your component will re-render if **anything** inside the cart changes (like an item's price updating), even if the component only cares about `totalQuantity`.
>
> ✅ **RIGHT:** `const quantity = useSelector(state => state.cart.totalQuantity)`
> Always select the *smallest, most granular* piece of state possible. This is the secret to Redux's incredible performance compared to the Context API!

## 4. Triggering Updates (`useDispatch`)

To change the data, we must dispatch the Actions that RTK auto-generated for us.

```jsx
import { useDispatch } from 'react-redux';
import { addItem } from './features/cart/cartSlice';
// TS: import type { AppDispatch } from './store';

function ProductCard({ product }) {
  // TS: const dispatch = useDispatch<AppDispatch>();
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    // We dispatch the action, passing the product as the payload
    dispatch(addItem(product));
  };

  return (
    <div>
      <h3>{product.name}</h3>
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
}
```
