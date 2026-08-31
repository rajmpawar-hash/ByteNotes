# React Machine Coding Tasks (Top 3)

In the second or third round of a React interview, you will typically face a "Machine Coding" round. You are given 45-60 minutes to build a functional, optimized widget from scratch in an IDE (like CodeSandbox).

Interviewers are looking for:
1. **State Management:** Can you use `useState` and `useEffect` correctly?
2. **Performance:** Did you use debounce? Did you prevent unnecessary renders?
3. **Component Architecture:** Did you break the UI into smaller, logical components?

Here are the Top 3 most frequently asked Machine Coding tasks and their optimized solutions.

---

## 1. Search Autocomplete (Typeahead)
**The Goal:** Build a search input that fetches suggestions from an API as the user types.
**The "Gotcha":** You MUST use debouncing to prevent spamming the API on every keystroke. You should also handle loading states and empty results.

```jsx
import { useState, useEffect } from 'react';
import { useDebounce } from './hooks/useDebounce'; // The custom hook we built earlier!

export default function Autocomplete() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  // 1. Debounce the query to wait 500ms after the user stops typing
  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    // 2. Only fetch if there is a query
    if (!debouncedQuery) {
      setResults([]);
      setDropdownVisible(false);
      return;
    }

    const fetchSuggestions = async () => {
      setIsLoading(true);
      try {
        // Mock API call
        const response = await fetch(`https://dummyjson.com/products/search?q=${debouncedQuery}`);
        const data = await response.json();
        setResults(data.products);
        setDropdownVisible(true);
      } catch (error) {
        console.error("Failed to fetch", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSuggestions();
  }, [debouncedQuery]);

  return (
    <div className="autocomplete-container" style={{ position: 'relative', width: '300px' }}>
      <input
        type="text"
        placeholder="Search products..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => { if (results.length > 0) setDropdownVisible(true) }}
        onBlur={() => setTimeout(() => setDropdownVisible(false), 200)} // Delay hide to allow clicks
        style={{ width: '100%', padding: '8px' }}
      />
      
      {isLoading && <p>Loading...</p>}

      {isDropdownVisible && results.length > 0 && (
        <ul style={{ position: 'absolute', top: '100%', left: 0, right: 0, background: 'white', border: '1px solid #ccc', margin: 0, padding: 0, listStyle: 'none' }}>
          {results.map((item) => (
            <li 
              key={item.id} 
              style={{ padding: '8px', cursor: 'pointer', borderBottom: '1px solid #eee' }}
              onClick={() => {
                setQuery(item.title);
                setDropdownVisible(false);
              }}
            >
              {item.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
```

---

## 2. Pagination Component
**The Goal:** Fetch a large list of items (e.g., 100 items) and display them 10 at a time with "Next", "Previous", and specific Page Number buttons.
**The "Gotcha":** Calculating the total pages correctly and disabling the Next/Prev buttons at the boundaries.

```jsx
import { useState, useEffect } from 'react';

const ITEMS_PER_PAGE = 10;

export default function PaginationApp() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch all data once (Client-side pagination)
  useEffect(() => {
    fetch('https://dummyjson.com/products?limit=100')
      .then(res => res.json())
      .then(data => setProducts(data.products));
  }, []);

  // 1. Calculate boundaries
  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  
  // 2. Slice the current page's data
  const currentProducts = products.slice(startIndex, endIndex);

  return (
    <div>
      <h2>Products (Page {currentPage})</h2>
      
      {/* Product List */}
      <ul>
        {currentProducts.map(p => (
          <li key={p.id}>{p.title}</li>
        ))}
      </ul>

      {/* Pagination Controls */}
      <div style={{ display: 'flex', gap: '8px' }}>
        <button 
          onClick={() => setCurrentPage(prev => prev - 1)} 
          disabled={currentPage === 1}
        >
          Prev
        </button>

        {/* Generate dynamic page numbers */}
        {[...Array(totalPages)].map((_, index) => {
          const pageNum = index + 1;
          return (
            <button 
              key={pageNum}
              onClick={() => setCurrentPage(pageNum)}
              style={{ fontWeight: currentPage === pageNum ? 'bold' : 'normal' }}
            >
              {pageNum}
            </button>
          )
        })}

        <button 
          onClick={() => setCurrentPage(prev => prev + 1)} 
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}
```

---

## 3. Recursive Folder Explorer (Nested Components)
**The Goal:** Build a VS Code-style file explorer that can render infinitely deeply nested folders.
**The "Gotcha":** You cannot use a simple `.map()`. You must use **Recursion** (a component that renders itself) and manage the expanded/collapsed state of each folder.

```jsx
import { useState } from 'react';

// Sample nested data structure
const explorerData = {
  name: "root",
  isFolder: true,
  items: [
    {
      name: "public",
      isFolder: true,
      items: [{ name: "index.html", isFolder: false, items: [] }]
    },
    {
      name: "src",
      isFolder: true,
      items: [
        { name: "App.js", isFolder: false, items: [] },
        { name: "components", isFolder: true, items: [
          { name: "Button.js", isFolder: false, items: [] }
        ]}
      ]
    },
    { name: "package.json", isFolder: false, items: [] }
  ]
};

// 1. Create a Component that can call ITSELF
function Folder({ explorer }) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Base Case: If it's a file, just render the name
  if (!explorer.isFolder) {
    return <div style={{ paddingLeft: '20px' }}>📄 {explorer.name}</div>;
  }

  // Recursive Step: If it's a folder, render the name AND map over its children to render MORE Folders!
  return (
    <div style={{ paddingLeft: '20px' }}>
      <div 
        onClick={() => setIsExpanded(!isExpanded)} 
        style={{ cursor: 'pointer', fontWeight: 'bold' }}
      >
        {isExpanded ? '📂' : '📁'} {explorer.name}
      </div>

      {/* RECURSION HAPPENS HERE */}
      <div style={{ display: isExpanded ? 'block' : 'none' }}>
        {explorer.items.map((childNode, index) => (
          <Folder key={index} explorer={childNode} />
        ))}
      </div>
    </div>
  );
}

// 2. Render the root node
export default function App() {
  return <Folder explorer={explorerData} />;
}
```
