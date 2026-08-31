# React Portals: Escaping the DOM Hierarchy

React creates a strict, hierarchical tree. If Component B is a child of Component A in React, then DOM node B will naturally be rendered as a child of DOM node A.

Normally, this is exactly what we want. But occasionally, this strict DOM nesting becomes a CSS nightmare. 

**The Problem:** Imagine you are building a Modal, a Tooltip, or a Dropdown Menu. These elements often need to visually overlay the entire application, breaking free from the constraints of `overflow: hidden` or `z-index` properties set by their parent containers.

**The Solution:** React Portals.

Portals provide a first-class way to render a child component into a completely different part of the DOM tree, **outside** of its parent's DOM hierarchy.

## Creating a Portal

You create a portal using `createPortal` from `react-dom`.

```javascript
import { createPortal } from 'react-dom';

// createPortal(childToRender, targetDOMNode)
```

First, in your public `index.html`, you define an empty div *outside* of the main React root:

```html
<!-- index.html -->
<body>
  <!-- The main React app lives here -->
  <div id="root"></div>
  
  <!-- Our portal destination, sitting high up in the DOM tree -->
  <div id="modal-root"></div> 
</body>
```

Now, we can build a Modal component that teleports its children into the `#modal-root`:

```jsx
import { createPortal } from 'react-dom';

function Modal({ children, isOpen }) {
  if (!isOpen) return null;

  // Instead of returning JSX directly, we return a Portal
  return createPortal(
    <div className="modal-overlay">
      <div className="modal-content">
        {children}
      </div>
    </div>,
    document.getElementById('modal-root') // The teleportation destination
  );
}
```

Even though you render `<Modal>` deep inside a complex component tree, the browser DOM will physically place the modal div directly inside `<div id="modal-root"></div>`, avoiding all parent CSS conflicts!

```jsx
// Deep inside the app tree
function UserProfile() {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <div style={{ overflow: "hidden", position: "relative" }}>
      <h2>User Profile</h2>
      <button onClick={() => setModalOpen(true)}>Delete Account</button>

      {/* 
        This is logically a child of UserProfile.
        But physically, it will render in the #modal-root! 
      */}
      <Modal isOpen={isModalOpen}>
        <p>Are you sure you want to delete your account?</p>
      </Modal>
    </div>
  );
}
```

---

## 🚨 The Mind-Bending Gotcha: Event Bubbling

This is the most critical concept to understand about Portals, and a frequent topic in senior interviews.

> [!CAUTION]
> Even though a portal is physically mounted somewhere else in the **Browser DOM**, it remains in its original position inside the **React Component Tree**. 

What does this mean for Event Bubbling?

If you click a button inside the Portal, the browser's native DOM event would bubble up to `#modal-root` and then `<body>`.

**However**, React uses a Synthetic Event system. React's events bubble up according to the **React Component Tree**, NOT the DOM tree!

Therefore, an event fired inside the portal will propagate to the React ancestors of the Portal, completely ignoring the physical DOM placement.

### Code Example:

```jsx
function App() {
  const handleAppClick = () => {
    console.log("App container clicked!");
  };

  return (
    // The onClick handler is on the main React App wrapper
    <div onClick={handleAppClick}>
      <h1>My App</h1>
      
      <Modal isOpen={true}>
        {/* Even though this button physically renders in #modal-root, 
            clicking it WILL trigger handleAppClick in the App component! */}
        <button>Click me inside Portal</button>
      </Modal>
    </div>
  );
}
```

**Why does React do this?** 
Because logically, the `<Modal>` is a child of `<App>`. It shares the same React Context, the same state, and the same lifecycle as the rest of the React tree. The portal is merely a visual CSS trick; structurally, the React tree remains fully intact.
