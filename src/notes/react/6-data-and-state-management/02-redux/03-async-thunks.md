# Handling Async Logic with Thunks

Reducers in Redux must be **100% pure functions**. This means they cannot contain any "side effects"—no `setTimeout`, no `Math.random()`, and most importantly, no API `fetch()` calls!

So, where do we put our asynchronous data fetching logic?

Historically, we used an external middleware called Redux Thunk. In Redux Toolkit (RTK), this is built-in via the `createAsyncThunk` API.

## 1. Creating the Async Thunk

A "Thunk" is just a fancy word for a function that delays the evaluation of an operation. 

`createAsyncThunk` takes a string action type and an asynchronous payload creator (your `fetch` call). It automatically dispatches lifecycle actions for you: `pending`, `fulfilled`, and `rejected`.

```javascript
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// TS: interface User { id: number; name: string; }

// 1. Define the async thunk
// TS: export const fetchUsers = createAsyncThunk<User[]>('users/fetchUsers', async () => {
export const fetchUsers = createAsyncThunk(
  'users/fetchUsers', // The action type prefix
  async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    if (!response.ok) throw new Error("Failed to fetch");
    return await response.json(); // This becomes the 'payload' in the fulfilled action
  }
);
```

## 2. Handling the Lifecycle in `extraReducers`

Because the thunk is created *outside* the slice, the slice's standard `reducers` property cannot handle it. We must use the `extraReducers` property to listen to the `pending`, `fulfilled`, and `rejected` actions that the thunk automatically fires.

```javascript
// TS: interface UsersState { data: User[]; status: 'idle' | 'loading' | 'succeeded' | 'failed'; error: string | null | undefined; }

const usersSlice = createSlice({
  name: 'users',
  // TS: initialState: { ... } as UsersState,
  initialState: {
    data: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null
  },
  reducers: {
    // Standard synchronous reducers go here
  },
  extraReducers: (builder) => {
    // 2. Listen to the Thunk's lifecycle actions
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading'; // Show a loading spinner in the UI
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload; // The fetched data!
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message; // Show an error message in the UI
      });
  }
});

export default usersSlice.reducer;
```

## 3. Dispatching the Thunk in React

In your React component, you dispatch the thunk exactly like a normal action, usually inside a `useEffect`.

```jsx
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from './usersSlice';
// TS: import type { AppDispatch, RootState } from './store';

function UserList() {
  // TS: const dispatch = useDispatch<AppDispatch>();
  const dispatch = useDispatch();
  // Select the specific pieces of state we care about
  // TS: const users = useSelector((state: RootState) => state.users.data);
  const users = useSelector(state => state.users.data);
  const status = useSelector(state => state.users.status);
  const error = useSelector(state => state.users.error);

  useEffect(() => {
    // We only fetch if we haven't already
    if (status === 'idle') {
      dispatch(fetchUsers());
    }
  }, [status, dispatch]);

  if (status === 'loading') return <div>Loading users...</div>;
  if (status === 'failed') return <div>Error: {error}</div>;

  return (
    <ul>
      {users.map(user => <li key={user.id}>{user.name}</li>)}
    </ul>
  );
}
```

> [!NOTE]
> **The Evolution of Redux**
> While `createAsyncThunk` is incredibly powerful, writing `pending`, `fulfilled`, and `rejected` handlers for every single API endpoint in a massive application quickly becomes tedious. 
> 
> Because of this, the Redux team created **RTK Query**—a complete data fetching and caching solution built right into Redux Toolkit that completely eliminates the need to manually write Thunks or `useEffect` hooks. We will cover this in the next section!
