# 📦 ES Modules vs CommonJS

In the early days, JavaScript had no built-in module system. All scripts shared the same global scope, which led to naming collisions and messy dependency management.

Over time, two major module systems emerged: **CommonJS (CJS)** for Node.js, and **ES Modules (ESM)** for the modern web (and now Node.js too!).

Understanding the difference is a critical architecture and interview topic.

## 1. CommonJS (CJS)

CommonJS is the original module system for **Node.js**. 

### Syntax
- Exporting: `module.exports = { ... }` or `exports.myFunc = ...`
- Importing: `const module = require('./module.js')`

```javascript
// math.js
function add(a, b) {
    return a + b;
}
module.exports = { add };

// app.js
const math = require('./math.js');
console.log(math.add(2, 3));
```

### Characteristics
- **Synchronous Loading:** `require()` is a synchronous operation. It stops execution until the module is fully loaded, parsed, and executed.
- **Dynamic:** You can call `require()` anywhere in your code (e.g., inside an `if` statement).
- **Environment:** Designed strictly for the server (Node.js). Browsers do not understand `require()` natively (without bundlers like Webpack).

---

## 2. ES Modules (ESM)

ES Modules were introduced in ES6 (ES2015) and are the **official standard** module system for JavaScript.

### Syntax
- Exporting: `export const func = ...` or `export default ...`
- Importing: `import { func } from './module.js'`

```javascript
// math.mjs
export function add(a, b) {
    return a + b;
}

// app.mjs
import { add } from './math.mjs';
console.log(add(2, 3));
```

### Characteristics
- **Asynchronous Loading:** ESM loading is asynchronous. The engine parses the imports and builds a dependency graph *before* executing any code.
- **Static:** `import` statements must be at the **top level** of the file. You cannot conditionally `import` inside an `if` block (unless you use Dynamic Imports).
- **Environment:** Works natively in modern browsers (`<script type="module">`) and Node.js.
- **Strict Mode:** ESM files automatically run in `"use strict"` mode.

---

## 3. Dynamic Imports

While top-level `import` is static, ES2020 introduced **Dynamic Imports** which allow you to load modules on demand asynchronously. It returns a Promise.

```javascript
const userCondition = true;

if (userCondition) {
    // Dynamic import!
    import('./heavy-module.js')
        .then((module) => {
            module.doHeavyLifting();
        })
        .catch(err => console.log("Failed to load"));
}
```
*This is the modern equivalent of conditionally calling `require()`.*

---

## ⚖️ Summary Comparison

| Feature | CommonJS (CJS) | ES Modules (ESM) |
| :--- | :--- | :--- |
| **Syntax** | `require()` / `module.exports` | `import` / `export` |
| **Loading** | Synchronous | Asynchronous |
| **Structure** | Dynamic (can load anywhere) | Static (must be at top level)* |
| **Native Support** | Node.js only | Browsers & Node.js |
| **Strict Mode** | Optional | Default and Enforced |

*\*Note: Dynamic `import()` is an exception for ESM.*

---

## 🎯 Interview Checklist
- [ ] Explain the difference between synchronous (`require`) and asynchronous (`import`) loading.
- [ ] Understand why static imports (ESM) allow build tools like Webpack to perform "Tree Shaking" (removing unused code).
- [ ] Know how to use Dynamic Imports for code-splitting.
