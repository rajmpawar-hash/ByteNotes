# RTK Query: The Modern Standard

RTK Query is an advanced data fetching and caching tool built directly into Redux Toolkit. It completely eliminates the need for manual `useEffect` fetching, `useState` loading spinners, and complex Redux Thunks.

## 1. Setting up the API Slice

Unlike a normal Redux Slice (`createSlice`), we use `createApi` to define our Server State.

```javascript
// features/api/apiSlice.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  // The base URL for all our requests
  baseQuery: fetchBaseQuery({ baseUrl: 'https://my-store.com/api' }),
  
  // We define all our endpoints here
  endpoints: (builder) => ({
    
    // A QUERY (Fetching Data)
    getProducts: builder.query({
      query: () => '/products',
    }),

    // A MUTATION (Modifying Data)
    addProduct: builder.mutation({
      query: (newProduct) => ({
        url: '/products',
        method: 'POST',
        body: newProduct,
      }),
    }),

  }),
});

// RTK Query AUTOMATICALLY generates React Hooks based on the endpoint names!
// getProducts -> useGetProductsQuery
// addProduct -> useAddProductMutation
export const { useGetProductsQuery, useAddProductMutation } = apiSlice;
```

## 2. Using the Auto-Generated Hooks

In your React components, you simply call the generated hook. You no longer need to write `useEffect`, and you no longer need to manually track `isLoading` or `error` states!

```jsx
import { useGetProductsQuery } from './apiSlice';

function ProductList() {
  // RTK Query handles everything for us!
  const { data: products, isLoading, isError } = useGetProductsQuery();

  if (isLoading) return <div>Loading products...</div>;
  if (isError) return <div>Error loading products.</div>;

  return (
    <ul>
      {products.map(p => <li key={p.id}>{p.name}</li>)}
    </ul>
  );
}
```

### The Caching Magic
If `<ProductList />` is rendered in three different places on the screen at the exact same time, RTK Query is smart enough to **deduplicate** the request. It will only send **one** network request to the server, and distribute the cached result to all three components simultaneously!

## 3. Cache Invalidation (Automated Refetching)

What happens when we add a new product using our `useAddProductMutation`? Our cached list of products is now out of date!

In the old days, we would have to manually dispatch an action to fetch the products again. With RTK Query, we use **Tags** to automate this.

```javascript
export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://my-store.com/api' }),
  
  // 1. Declare the tags this API uses
  tagTypes: ['Product'], 
  
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => '/products',
      // 2. This query PROVIDES the 'Product' tag to the cache
      providesTags: ['Product'], 
    }),

    addProduct: builder.mutation({
      query: (newProduct) => ({ ... }),
      // 3. This mutation INVALIDATES the 'Product' tag when it succeeds
      invalidatesTags: ['Product'], 
    }),
  }),
});
```

### How Tags Work (The Interview Answer)
When `useAddProductMutation` succeeds, RTK Query sees that it invalidates the `Product` tag. 
It then looks at its cache and says, *"Are there any active components currently displaying data that was provided by the `Product` tag?"*

It finds our `<ProductList />` component. RTK Query will automatically, instantly, and silently re-fetch `getProducts` in the background and update the UI with the fresh data. You don't have to write a single line of state management code!
