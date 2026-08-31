# Controlled vs Uncontrolled Components: Who Owns the State?

In the HTML DOM, form elements like `<input>`, `<textarea>`, and `<select>` naturally maintain their own internal state based on user input. React, however, prefers to be the single source of truth for an application's state via the Virtual DOM.

This tug-of-war between the Browser DOM's internal state and React's state leads us to two distinct patterns for handling forms: **Controlled** and **Uncontrolled** components.

## Uncontrolled Components: Let the Browser Handle It

In an uncontrolled component, the DOM itself manages the form data. React steps back and acts as a passive observer.

To get the value of the input, you use a `ref` (specifically `useRef`) to pull the data directly from the DOM node when you need it (e.g., on form submit).

```jsx
import { useRef } from 'react';

function UncontrolledForm() {
  // Create a ref to attach to the input DOM node
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // We "pull" the value from the DOM only when the submit button is clicked
    alert(`A name was submitted: ${inputRef.current.value}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        {/* We attach the ref, but do NOT control the value */}
        <input type="text" ref={inputRef} />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}
```

**When to use:** Uncontrolled components are quick and dirty. They are useful for integrating React with non-React libraries (like a vanilla JS date-picker) or when you have a massive form where controlling every input would cause unnecessary re-renders.

## Controlled Components: React takes the Wheel

In a controlled component, React completely hijacks the input. The input element no longer manages its own state. Instead, its value is explicitly driven by React state (`useState`), and any changes are handled by a React event handler (`onChange`).

React becomes the **single source of truth**.

```jsx
import { useState } from 'react';

function ControlledForm() {
  // React state holds the single source of truth
  const [name, setName] = useState('');

  const handleChange = (e) => {
    // When the user types, we update React's state
    setName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // We already have the value in our state, no need to query the DOM!
    alert(`A name was submitted: ${name}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        {/* The input's value is LOCKED to React's state */}
        <input type="text" value={name} onChange={handleChange} />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}
```

**Under the hood:** When a user types a letter "A", the browser attempts to update the DOM. React intercepts this via the `onChange` handler, updates the `name` state to "A", triggers a re-render, and passes "A" back down to the input's `value` prop. All of this happens instantly.

**When to use:** Controlled components are the industry standard for React forms. They give you instant validation, allow you to format data on the fly (e.g., forcing uppercase), and conditionally disable submission buttons based on the input.

---

## 🚨 The Infamous React Warning

Have you ever seen this error in your console?

> *"A component is changing an uncontrolled input to be controlled. This is likely caused by the value changing from undefined to a defined value, which should not happen."*

This is one of the most common pitfalls in React development.

### The Mistake

This happens when you initialize your state as `undefined` (or `null`) and pass it to an input's value prop.

```jsx
// ❌ WRONG
function BadForm() {
  // user.name might be undefined initially if fetching from API
  const [user, setUser] = useState({}); 

  // Because user.name is undefined, React thinks this input is UNCONTROLLED
  return <input value={user.name} onChange={(e) => setUser({name: e.target.value})} />;
}
```

When the user types, `user.name` becomes a string (e.g., `"Raj"`). Suddenly, the input has a valid string value! React panics: it thought the input was uncontrolled, but now it's acting like a controlled component.

### The Fix

Always initialize your controlled inputs with an empty string `""` or provide a fallback.

```jsx
// ✅ CORRECT
function GoodForm() {
  const [user, setUser] = useState({}); 

  // Provide a fallback empty string so the input is ALWAYS controlled from mount
  return <input value={user.name || ""} onChange={(e) => setUser({name: e.target.value})} />;
}
```

## Summary Table

| Feature | Controlled | Uncontrolled |
| :--- | :--- | :--- |
| **Data Source of Truth** | React State (`useState`) | The Browser DOM |
| **How to Read Value** | Read from state variable | Read from `ref.current.value` |
| **Real-time Validation** | ✅ Yes, instantly on every keystroke | ❌ No, usually only on submit |
| **Performance** | Can cause re-renders on keystroke | High performance, no re-renders |
| **Complexity** | More boilerplate code | Less code, simpler setup |
