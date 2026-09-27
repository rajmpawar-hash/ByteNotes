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

## 3. DOM Event Flow & Delegation

> [!NOTE]
> For a deep dive into Event Bubbling, Capturing, and the crucial Event Delegation pattern, see the dedicated note: [Event Delegation, Bubbling & Capturing](/javascript/6-web-apis/01-dom-and-browser/01-event-delegation).
