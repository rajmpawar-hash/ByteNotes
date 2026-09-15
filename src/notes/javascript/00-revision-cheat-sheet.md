# 🚀 JavaScript Rapid Revision Cheat Sheet

> [!TIP]
> **How to use this guide**
> This cheat sheet compresses the entire JavaScript ecosystem into high-yield, interview-ready concepts. Read this file top-to-bottom 30 minutes before your technical interviews for a complete mental refresh. 
> 
> *Need a deep dive?* Check out the [🗺️ Master Navigation Hub](/javascript/00-overview) for full tutorials, code examples, and visual diagrams on every single topic!

---

## 🏗️ 1. Foundations & Execution Context

### How JavaScript Runs [📖 Read More](/javascript/1-foundations/01-basics/01-execution-context-and-call-stack)
Everything in JS happens inside an **Execution Context**. 
1. **Memory Phase (Hoisting):** JS scans the code and allocates memory for variables and functions *before* executing anything.
   - *Function Declarations* are hoisted completely (you can call them before they are defined).
   - *Arrow Functions* behave like variables (they stay in TDZ or evaluate to `undefined` until reached).
2. **Execution Phase:** Code is executed line-by-line synchronously. 
- The **Call Stack** (LIFO) manages these execution contexts.

### `var` vs `let` vs `const` [📖 Read More](/javascript/1-foundations/02-scope/01-scope-chain-and-lexical-environment)
| Feature | `var` | `let` | `const` |
| :--- | :--- | :--- | :--- |
| **Scope** | Function or Global | Block `{}` | Block `{}` |
| **Hoisting**| `undefined` | Uninitialized (TDZ) | Uninitialized (TDZ) |
| **Reassign**| Yes | Yes | No (but objects mutate) |
| **Redeclare**| Yes | No | No |

### The Temporal Dead Zone (TDZ) [📖 Read More](/javascript/1-foundations/02-scope/01-scope-chain-and-lexical-environment)
`let` and `const` *are* hoisted, but they are placed in a restricted memory zone called the TDZ. If you try to access them before the exact line they are declared on, JS throws a `ReferenceError`. 
*Gotcha:* `let a;` initializes `a` with `undefined` at runtime, ending the TDZ.

### `undefined` vs `not defined` [📖 Read More](/javascript/1-foundations/01-basics/03-undefined-vs-not-defined)
- **`undefined`**: The variable has been declared in memory, but no value has been assigned to it yet.
- **`not defined`**: The variable was never declared (ReferenceError).

### Strict Mode (`"use strict"`) [📖 Read More](/javascript/1-foundations/03-error-handling/02-strict-mode)
Must be placed at the top of a file or function. It catches silent errors and prevents unsafe actions (e.g., throwing an error if you assign a value to an undeclared variable instead of accidentally creating a global).

### Error Handling (`try / catch / finally`) [📖 Read More](/javascript/1-foundations/03-error-handling/01-try-catch-finally)
- `try`: Code to execute.
- `catch(err)`: Executes only if an error is thrown in `try`.
- `finally`: Executes **always**, regardless of success or failure. Used for cleanup (closing connections, clearing loaders).

---

## 🧠 2. Functions & Scope

### Closures [📖 Read More](/javascript/3-functions/01-functions/03-closures)
> A Closure is a function bundled together with its lexical environment. A function "remembers" the variables of its outer scope even after the outer function has finished executing.

```javascript
function counter() {
    let count = 0; // Hidden state
    return function() {
        return ++count; // Remembers 'count' from parent scope
    }
}
const add = counter();
console.log(add()); // 1
console.log(add()); // 2
```
*Why use them?* Data privacy (encapsulation) and function factories (Currying/Memoization).

### Higher-Order Functions (HOFs) [📖 Read More](/javascript/3-functions/01-functions/01-first-class-functions)
A function that does at least one of two things:
1. Takes a function as an argument (Callbacks).
2. Returns a function (Closures/Currying).
*Examples:* `map`, `filter`, `reduce`, `setTimeout`.

### Currying [📖 Read More](/javascript/3-functions/01-functions/04-currying)
Transforming a function that takes multiple arguments into a sequence of functions that each take a single argument: `sum(1, 2, 3)` becomes `sum(1)(2)(3)`. Used for *Partial Application* (pre-filling arguments).

### Memoization [📖 Read More](/javascript/7-interview/01-interview-patterns/05-memoization)
A performance optimization technique that **caches the results** of expensive function calls. If the function is called again with the *same arguments*, it returns the cached result instantly instead of recomputing it.

### Generators (`function*`) [📖 Read More](/javascript/3-functions/03-generators-and-iterators/01-generators-and-iterators)
Functions that can be paused using `yield` and resumed using `.next()`. They return an *Iterator* object. Highly useful for generating infinite sequences without crashing memory, or managing complex async flows (e.g., Redux Saga).

### IIFE [📖 Read More](/javascript/3-functions/01-functions/03-closures)
A function that runs the moment it is defined: `(function() { ... })();`. Before ES6 `let`/`const` block scoping and modules, IIFEs were the primary way to create private data and avoid polluting the global namespace.

---

## 🗂️ 3. Objects & Arrays

### Destructuring & Spread/Rest (`...`) [📖 Read More](/javascript/2-objects-and-arrays/01-objects-and-es6/02-destructuring-spread-rest)
- **Spread:** *Unpacks* elements. (e.g., `const clone = [...arr]`)
- **Rest:** *Packs* elements. Must be the last parameter in a function signature. (e.g., `function sum(...nums)`)

### Advanced Object Methods [📖 Read More](/javascript/2-objects-and-arrays/01-objects-and-es6/05-advanced-object-methods)
- `Object.keys(obj)`: Returns array of keys.
- `Object.values(obj)`: Returns array of values.
- `Object.entries(obj)`: Returns array of `[key, value]` pairs.

### Loops (`for...in` vs `for...of`) [📖 Read More](/javascript/2-objects-and-arrays/03-loops-and-iteration/01-loops-and-iteration)
- **`for...in`**: Iterates over **keys** of an Object (or indices of an array).
- **`for...of`**: Iterates over **values** of an Iterable (Arrays, Strings, Maps). Does *not* work on plain objects.

### Optional Chaining (`?.`) & Nullish (`??`) [📖 Read More](/javascript/2-objects-and-arrays/01-objects-and-es6/03-optional-chaining-nullish)
- `?.` safely reads nested properties without throwing errors if the parent is undefined.
- `??` provides a fallback value **only** if the left side is `null` or `undefined` (Unlike `||`, which triggers on *any* falsy value like `0` or `""`).

### Array Iteration [📖 Read More](/javascript/2-objects-and-arrays/02-array-methods/01-array-methods)
- **`map`**: Transforms every item. Returns a new array of the *same length*.
- **`filter`**: Filters items based on a condition. Returns a new, usually *shorter array*.
- **`reduce`**: Accumulates all array elements into a *single value* (number, object, string). Does not mutate.
  *Syntax:* `arr.reduce((acc, curr) => acc + curr, initialValue)`

### Array Methods (slice vs splice) [📖 Read More](/javascript/2-objects-and-arrays/02-array-methods/01-array-methods)
- **`slice(start, end)`**: Returns a shallow copy of a portion of an array. **Does not mutate** the original array.
- **`splice(start, deleteCount, items...)`**: Changes the contents of an array by removing or replacing existing elements. **Mutates** the original array.

### Object.freeze() vs Object.seal() [📖 Read More](/javascript/2-objects-and-arrays/01-objects-and-es6/05-advanced-object-methods)
- **`Object.freeze(obj)`**: Completely locks the object. You cannot add, delete, or change any properties. (Nested objects can still be changed unless deep frozen).
- **`Object.seal(obj)`**: You cannot add or delete properties, but you **can** change the values of existing properties.

### Map & Set vs WeakMap & WeakSet [📖 Read More](/javascript/2-objects-and-arrays/04-maps-and-sets/01-maps-and-sets)
- **`Set`**: A collection of strictly unique values. Best way to remove duplicates: `[...new Set(arr)]`.
- **`Map`**: A key-value store where keys can be *any data type* (even objects/functions), unlike standard objects where keys are strictly strings. Preserves insertion order.
- **`WeakMap` / `WeakSet`**: Same as Map/Set, but keys **must** be objects. They do not prevent garbage collection. If the key object is deleted elsewhere, it is automatically removed from the WeakMap (prevents memory leaks).

### Shallow vs Deep Copy [📖 Read More](/javascript/2-objects-and-arrays/01-objects-and-es6/01-shallow-vs-deep-copy)
- `...spread`, `Object.assign()`, and `slice()` only create **Shallow Copies**. Nested objects still share the same memory reference!
- Use `structuredClone(obj)` or `JSON.parse(JSON.stringify(obj))` for a **Deep Copy**.

### Stack vs Heap Memory [📖 Read More](/javascript/1-foundations/01-basics/01-execution-context-and-call-stack)
- **Primitives** (String, Number, Boolean, null, undefined, Symbol) are stored in the **Call Stack**. They are passed by *value*.
- **Reference Types** (Objects, Arrays, Functions) are stored in the **Memory Heap**. The stack only holds a pointer (reference) to the heap location. They are passed by *reference*.

---

## 🎯 4. Object-Oriented JS & The `this` Keyword

### The 4 Rules of `this` [📖 Read More](/javascript/4-oop/01-this-keyword/01-this-rules)
JavaScript determines the value of `this` exactly at the moment a function is *called*, based on these rules:
1. **`new` Binding (Highest):** `this` points to the brand new object being created.
   *What `new` does under the hood:* 1) Creates `{}`. 2) Binds `this` to `{}`. 3) Links `__proto__`. 4) Returns the object.
2. **Explicit Binding:** Forces `this` to equal the passed `obj`.
   - `fn.call(obj, arg1, arg2)`: Executes immediately. Comma-separated args.
   - `fn.apply(obj, [argsArray])`: Executes immediately. Array of args.
   - `fn.bind(obj, arg1)`: Does **not** execute immediately. Returns a *new function* permanently bound to `obj`.
3. **Implicit Binding:** `user.greet()`. The object to the *left of the dot* becomes `this`.
4. **Default Binding (Lowest):** Standalone functions `greet()`. `this` points to `window` (or `undefined` in strict mode).

### Arrow Functions & `this` [📖 Read More](/javascript/4-oop/01-this-keyword/01-this-rules)
> [!IMPORTANT]
> Arrow functions **do not** have their own `this`. They lexically inherit `this` from their parent scope *at the time they are written*. You cannot override an arrow function's `this` with `.call()` or `.bind()`.
> *Gotcha:* They also do NOT have an `arguments` object. Use the rest parameter `...args` instead!

### Prototypes & Classes [📖 Read More](/javascript/4-oop/02-prototypes/02-classes-and-oop)
- **Prototypes**: Every object has a hidden `[[Prototype]]`. If an object lacks a property, JS searches up the prototype chain until it finds it or hits `null`.
- **Classes**: Introduced in ES6, `class` is just syntactical sugar over the prototype system. *Gotcha:* Unlike function declarations, classes are **not hoisted** (they sit in the TDZ).

---

## ⏳ 5. Asynchronous JavaScript (The Event Loop)

### Event Loop Architecture [📖 Read More](/javascript/5-async/02-async/01-event-loop)
Because JS is single-threaded, it uses the browser's APIs to handle async work.
1. **Call Stack:** Executes synchronous code.
2. **Microtask Queue:** Highest priority async tasks. Handles **Promises** and `MutationObserver`.
3. **Macrotask Queue:** Lower priority async tasks. Handles `setTimeout`, `setInterval`, DOM events, API callbacks.
   - *Trick:* `setTimeout(fn, 0)` does NOT execute in 0ms. It simply pushes the function to the Macrotask queue to be executed *after* the current Call Stack is empty.

> **Execution Rule:** The Event Loop will *completely empty* the Microtask Queue before it touches a single item in the Macrotask Queue. A microtask can queue another microtask and starve the macrotask queue!

### JS Engine Architecture (JIT Compilation) [📖 Read More](/javascript/5-async/02-async/02-js-engine-architecture)
Modern JS engines (like V8) use **Just-In-Time (JIT) Compilation**. 
- **Ignition (Interpreter):** Rapidly executes the code line-by-line for fast startup.
- **TurboFan (Compiler):** Monitors the code, takes "hot" (frequently used) code, and optimizes it into highly efficient machine code in the background.

### Promises vs Async/Await [📖 Read More](/javascript/5-async/02-async/04-async-await)
- **Promises** are objects representing the eventual completion/failure of an async operation. States: `Pending`, `Fulfilled`, `Rejected`.
- **Async/Await** is syntax sugar over Promises. `await` pauses the execution of *that specific async function*, but does NOT block the main thread.

### Promise Combinators [📖 Read More](/javascript/5-async/02-async/04-promise-apis)
| API | What it waits for | Returns on Success | Returns on Failure |
| :--- | :--- | :--- | :--- |
| **`Promise.all`** | All to resolve | Array of all results | First rejection (Fail-Fast) |
| **`Promise.allSettled`** | All to settle | Array of outcomes | Never fails |
| **`Promise.race`** | First to settle | Value of first settled | Error of first settled |
| **`Promise.any`** | First to resolve | Value of first resolved | Only if ALL reject (AggregateError) |

### Modules (ESM vs CommonJS) [📖 Read More](/javascript/5-async/03-modules/02-es6-modules-syntax)
- **ES Modules (ESM):** `import`/`export`. Asynchronous, supports static analysis (tree-shaking), standard for modern web and Node.
- **CommonJS (CJS):** `require`/`module.exports`. Synchronous, dynamic, the legacy standard for Node.js.

---

## 🛠️ 6. Web APIs & Patterns

### DOM Basics & Security [📖 Read More](/javascript/6-web-apis/01-dom-and-browser/04-dom-and-events)
- `element.textContent = "text"`: Safe, inserts plain text.
- `element.innerHTML = "<b>text</b>"`: Parses HTML. **Danger:** Highly vulnerable to XSS attacks if injecting unsanitized user input!

### DOM Performance (DocumentFragment) [📖 Read More](/javascript/6-web-apis/01-dom-and-browser/05-dom-performance-and-apis)
Manipulating the DOM is expensive (triggers Repaints & Reflows). To optimize, use a `DocumentFragment` to batch DOM updates in memory. Append all your new elements to the invisible fragment, and then append the fragment to the real DOM *once*.

### Web Storage [📖 Read More](/javascript/6-web-apis/01-dom-and-browser/03-storage-cookies)
- **`localStorage`**: Persists indefinitely, even after the browser is closed.
- **`sessionStorage`**: Cleared the moment the browser tab is closed.
- **Cookies**: Sent automatically to the server with every HTTP request. Used for auth tokens.

### Debounce vs Throttle [📖 Read More](/javascript/6-web-apis/01-dom-and-browser/02-debounce-and-throttle)
Both limit how often a function fires, but in different ways:
- **Debounce:** Waits for a "pause" in user action before firing. (e.g., Don't search until the user stops typing for 300ms).
- **Throttle:** Guarantees a steady execution rate. (e.g., No matter how fast they scroll, only fire the event once every 300ms).

### Event Flow (Capturing vs Bubbling) [📖 Read More](/javascript/6-web-apis/01-dom-and-browser/01-dom-manipulation)
When you click an element, the event travels in three phases:
1. **Capture Phase:** Travels down from the `window` to the target element.
2. **Target Phase:** Reaches the clicked element.
3. **Bubble Phase:** Bubbles back up from the target to the `window`. (Most event listeners trigger here).
*Stop it:* Use `e.stopPropagation()`.

### Event Delegation (Bubbling) [📖 Read More](/javascript/6-web-apis/01-dom-and-browser/01-dom-manipulation)
Instead of attaching 100 `click` listeners to 100 `<li>` tags, attach **one** listener to the parent `<ul>`. Because events "bubble" up the DOM tree from child to parent, the parent can catch the event and check `e.target` to see exactly which child was clicked. This saves massive amounts of memory.

### Type Coercion (Truthy vs Falsy) [📖 Read More](/javascript/7-interview/01-interview-patterns/03-type-coercion-truthy-falsy)
- **Falsy Values:** `0`, `""`, `null`, `undefined`, `NaN`, `false` (Everything else is truthy, including `[]` and `{}`).
- **`==` vs `===`:** `==` allows type coercion (e.g., `"1" == 1` is true). `===` strictly checks value AND type. Always use `===`.

### Memory Leaks & Garbage Collection [📖 Read More](/javascript/7-interview/02-memory-leaks/01-memory-leaks)
JS uses a **Mark-and-Sweep** algorithm to clear memory. Common causes of memory leaks:
1. **Global Variables:** Unintentionally assigning variables to `window` (e.g., forgetting `let`/`const`).
2. **Closures:** Keeping heavy objects in memory because an inner function still references them.
3. **Detached DOM Elements:** Removing a DOM node from the document, but keeping a JS variable referencing it.
4. **Uncleared Timers:** Forgetting to call `clearInterval()` or remove Event Listeners when a component unmounts.

### Web Security [📖 Read More](/javascript/7-interview/03-security-and-performance/01-security-and-performance)
- **XSS (Cross-Site Scripting):** Malicious scripts injected into the UI. *Fix:* Sanitize all user input. Never blindly use `innerHTML`.
- **CSRF (Cross-Site Request Forgery):** Tricking a user's browser into executing an unwanted action on a trusted site. *Fix:* Use CSRF tokens.
- **CORS (Cross-Origin Resource Sharing):** A browser security feature that restricts web pages from making requests to a different domain than the one that served the page. Server must send explicit `Access-Control-Allow-Origin` headers.

### JS Gotchas & Quirks (Trick Questions) [📖 Read More](/javascript/7-interview/01-interview-patterns/03-type-coercion-truthy-falsy)
- **`typeof null === "object"`**: This is a known, unfixable legacy bug in JavaScript. `null` is a primitive, not an object.
- **`typeof NaN === "number"`**: "Not-a-Number" is technically of the numeric data type. (Check for it using `Number.isNaN()`).
- **`0.1 + 0.2 === 0.3` is `false`**: JS uses IEEE 754 floating-point math, which struggles to accurately represent some decimals.
- **`typeof [] === "object"`**: Arrays are just special objects. Always use `Array.isArray(arr)` to check if a value is truly an array.

### Type Checking (`typeof` vs `instanceof`) [📖 Read More](/javascript/4-oop/03-type-checking/01-type-checking)
- `typeof` checks primitives.
- `instanceof` checks if a constructor appears in an object's prototype chain. 
*Gotcha:* `instanceof` fails across multiple iframes/windows because each window has its own isolated global environment and constructors!

> [!NOTE]
> Need to dig deeper into any of these concepts? Head over to the [🗺️ Master Navigation Hub](/javascript/00-overview) to explore dedicated markdown files for every single topic, complete with detailed walkthroughs and machine-coding examples!
