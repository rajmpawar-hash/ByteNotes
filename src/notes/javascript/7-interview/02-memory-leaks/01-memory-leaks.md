# 🧠 Memory Management & Leaks

While low-level languages like C require you to manually allocate and free memory, JavaScript automatically allocates memory when objects are created and frees it when they are not used anymore. This process is called **Garbage Collection (GC)**.

However, "automatic" does not mean "perfect". Understanding memory management is critical for preventing **Memory Leaks** — situations where memory that is no longer needed is not released.

## 1. The Garbage Collector (Mark & Sweep)

The main algorithm used in modern JavaScript engines is **Mark-and-Sweep**.

1. **Roots:** The Garbage Collector assumes a set of "roots" (the global object, current execution context variables).
2. **Mark:** It starts from the roots, traverses all references, and "marks" every object it can reach as *active*.
3. **Sweep:** Any object in memory that is *not* marked is considered unreachable. The Garbage Collector safely sweeps (deletes) it to free up memory.

If an object is still attached to the root tree, it will **never** be garbage collected.

---

## 2. The 4 Common Memory Leaks

A memory leak happens when an object is no longer needed by your application, but it is still referenced by something else, preventing the Garbage Collector from sweeping it.

### 🔴 1. Accidental Global Variables
If you forget to declare a variable with `let`, `const`, or `var` in non-strict mode, it attaches to the `window` (global) object.
```javascript
function processData() {
    // Forgot 'let' or 'const'! 
    userData = new Array(100000).fill("Heavy Data");
}
processData();
// userData is now stuck on the global window object forever!
```
**Fix:** Always use `'use strict';` or explicitly declare your variables.

### 🔴 2. Forgotten Timers & Callbacks
If you start a `setInterval` that references an object, that object cannot be garbage collected until the interval is cleared.
```javascript
function startPolling() {
    const hugeObject = { data: new Array(100000) };
    
    setInterval(() => {
        // As long as this interval runs, hugeObject cannot be deleted
        console.log(hugeObject.data.length);
    }, 1000);
}
```
**Fix:** Always save the timer ID and use `clearInterval()`.

### 🔴 3. Out-of-DOM References
If you remove a DOM element from the webpage, but keep a reference to it in a JavaScript variable, it cannot be garbage collected. It becomes a "Detached DOM element".
```javascript
let buttonRef = document.getElementById('my-btn');

function removeButton() {
    document.body.removeChild(buttonRef);
    // The button is gone from the UI, but buttonRef still holds it in memory!
}
```
**Fix:** Set the reference to `null` (`buttonRef = null`) after removing it.

### 🔴 4. Improper Closures
Closures keep their outer variables alive. If a closure accidentally captures a massive object, and that closure is kept alive for a long time, the massive object cannot be garbage collected.
```javascript
function assignHandler() {
    const giantData = new Array(100000).fill("Data");
    
    document.getElementById('btn').onclick = function() {
        // This closure captures giantData, keeping it in memory forever
        console.log("Clicked! " + giantData.length);
    };
}
```

---

## 🎯 Interview Checklist
- [ ] Understand the "Mark and Sweep" algorithm.
- [ ] Be able to list the 4 common memory leaks (Globals, Timers, DOM, Closures).
- [ ] Explain how `WeakMap` and `WeakSet` can prevent memory leaks (because they hold "weak" references to objects, allowing the GC to delete them if no other references exist).
