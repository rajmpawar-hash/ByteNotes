# 🕸️ DOM & Events

> [!TIP]
> **The 30-Second Interview Pitch**
> The DOM (Document Object Model) is a programming interface for web documents that represents the page so programs can change the document structure, style, and content. Events are actions that happen in the system you are programming, which the system tells you about so your code can react. Critical concepts include **Event Bubbling** (events firing from child to parent), **Event Capturing** (parent to child), and **Event Delegation** (attaching a single listener to a parent to manage child events).

## 1. DOM Manipulation Basics

The `window` object represents the browser window, and the `document` object represents the HTML document loaded inside it.

### Selectors
```javascript
document.getElementById('myId');
document.getElementsByClassName('myClass');
// Modern & most powerful:
document.querySelector('.myClass #myId'); 
document.querySelectorAll('div'); // Returns a NodeList (Array-like Object)
```

### Modifying Elements
```javascript
const element = document.querySelector('.card');

// Text and HTML
element.textContent = "Hello World"; // Safe, text only
element.innerHTML = "<strong>Hello</strong>"; // Parses HTML (Beware XSS!)

// Attributes
element.setAttribute('data-info', '123');
element.removeAttribute('data-info');

// Styles & Classes
element.style.color = "blue";
element.classList.add('active');
element.classList.toggle('hidden'); // Adds if missing, removes if present
```

### Creating & Removing Elements
```javascript
// Create
const newDiv = document.createElement('div');
newDiv.textContent = "I am new!";
document.body.appendChild(newDiv);

// Clone
const clonedNode = newDiv.cloneNode(true); // true = clone children too!

// Remove (ES6+)
newDiv.remove(); 
```

---

## 2. Events & The Event Object

Events are actions or occurrences that happen in the browser (e.g., clicks, keypresses, mouse movements).

```javascript
const btn = document.querySelector('button');

// Add Listener
btn.addEventListener('click', handleClick);

// The browser automatically passes the Event Object!
function handleClick(event) {
    console.log("Event Type: ", event.type); // "click"
    console.log("Element clicked: ", event.target); 
}
```

> [!IMPORTANT]
> **`event.preventDefault()`**
> This stops the default behavior of an element. For example, preventing a form from submitting and refreshing the page, or stopping an `<a>` tag from navigating away.
> ```javascript
> form.addEventListener('submit', (e) => e.preventDefault());
> ```

---

## 3. DOM Event Flow: Bubbling & Capturing

When an event happens on an element, it doesn't just run on that element. It travels through the DOM in three phases:
1. **Capturing Phase:** Travels down from the root (`window`) to the target element.
2. **Target Phase:** Fires on the actual target element.
3. **Bubbling Phase:** Bubbles back up from the target to the root.

### Event Bubbling (Default)
By default, event listeners trigger during the **Bubbling** phase. If you click a child button, the click event bubbles up and triggers click listeners on the parent, grandparent, and so on.

```html
<div id="parent">
    <button id="child">Click Me</button>
</div>
```
```javascript
document.getElementById('parent').addEventListener('click', () => console.log('Parent clicked!'));
document.getElementById('child').addEventListener('click', () => console.log('Child clicked!'));

// Output when clicking the child button:
// "Child clicked!"
// "Parent clicked!"
```

### Event Capturing
To listen during the capturing phase, pass `{ capture: true }` (or just `true`) as the third argument to `addEventListener`.

```javascript
parent.addEventListener('click', () => console.log('Parent!'), true);
child.addEventListener('click', () => console.log('Child!'), true);

// Output when clicking the child button:
// "Parent!"
// "Child!"
```

> [!WARNING]
> **Gotcha: Stopping the Flow**
> If you want to stop an event from bubbling up and triggering parent listeners, use `event.stopPropagation()`.
> ```javascript
> child.addEventListener('click', (e) => {
>     e.stopPropagation(); // Stops bubbling!
>     console.log('Child clicked!');
> });
> ```

---

## 4. Event Delegation

Event Delegation is a performance optimization pattern. Instead of attaching 100 event listeners to 100 child items, you attach **ONE** event listener to their parent. The event bubbles up from the child to the parent, and you use `event.target` to figure out which child was actually clicked.

```html
<ul id="todo-list">
    <li>Item 1</li>
    <li>Item 2</li>
    <li>Item 3</li>
</ul>
```

```javascript
// ✅ CORRECT: One listener on the parent!
const list = document.getElementById('todo-list');

list.addEventListener('click', function(event) {
    // Check if what was clicked was actually an LI element
    if (event.target.tagName === 'LI') {
        console.log("Clicked item: ", event.target.textContent);
    }
});
```

### Why use Event Delegation?
1. **Performance:** Massive memory savings (1 listener vs 1000 listeners).
2. **Dynamic Elements:** If you add new `<li>` elements via JS later, they automatically inherit the click behavior because the listener is on the parent!

---

## 🎯 Common Interview Questions

**Q: What is Event Delegation?**
- **A:** It's a pattern where you attach a single event listener to a parent element to manage events for all of its children. It relies on Event Bubbling, where events fired on children bubble up to the parent. It saves memory and works automatically for dynamically added children.

**Q: Difference between `event.target` and `event.currentTarget`?**
- **A:** `event.target` is the actual element that triggered the event (the deepest element clicked). `event.currentTarget` is the element that the event listener is attached to (e.g., the parent in event delegation).
