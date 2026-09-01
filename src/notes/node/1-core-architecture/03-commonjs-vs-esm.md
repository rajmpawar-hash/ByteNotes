# CommonJS vs ES Modules (ESM)

> [!TIP]
> **The 30-Second Interview Pitch**
> *"Historically, Node.js used the CommonJS module system (`require()`), which is strictly synchronous and dynamic, meaning it blocks the main thread while loading files at runtime. Modern Node.js supports ES Modules (`import`), which are asynchronous and statically analyzable. ESM allows for advanced bundler optimizations like Tree Shaking, but it introduces gotchas in Node, such as the absence of the global `__dirname` variable."*

For a decade, Node.js had its own proprietary way of importing files. Now that JavaScript has a universal standard (ESM), Node is in a massive transitional phase. You must know the differences.

## 1. CommonJS (`require`)

CommonJS is the legacy module system built specifically for Node.js. 

```javascript
// Exporting
module.exports = { myFunction };

// Importing
const { myFunction } = require('./myModule');
```

**Key Characteristics:**
1. **Synchronous (Blocking):** When you call `require('./file')`, Node literally halts execution, reads the file from the hard drive, parses it, and executes it. This is fine during server startup, but a disaster if used inside a route handler.
2. **Dynamic:** You can conditionally require files inside `if` statements or loops.
3. **Module Caching:** The first time you `require()` a file, Node executes it and caches the exported object. If you `require()` it again in another file, Node just returns the cached object. It does *not* re-execute the file.

## 2. ES Modules (`import`)

ESM is the official ECMAScript standard used in modern browsers and React. Node.js now fully supports it (usually by using the `.mjs` extension or setting `"type": "module"` in `package.json`).

```javascript
// Exporting
export const myFunction = () => {};

// Importing
import { myFunction } from './myModule.js';
```

**Key Characteristics:**
1. **Asynchronous:** The ES Module loader reads and parses all imported files asynchronously *before* executing any code. 
2. **Static (Top-Level Only):** You cannot conditionally `import` inside an `if` statement (unless you use dynamic `import()`). This strict static structure allows tools like Webpack to perform **Tree Shaking** (removing unused code).

## 🚨 The `__dirname` Gotcha

In CommonJS, Node automatically injects helpful global variables into every file, like `__dirname` (the current folder path) and `__filename`.

In ES Modules, **these globals do not exist.** If you try to use `__dirname` in an ESM file, your server will crash.

To get the current directory in modern Node.js (ESM), you must manually construct it using the `import.meta` object:

```javascript
import path from 'path';
import { fileURLToPath } from 'url';

// The ESM equivalent of __filename and __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log(`Current directory is: ${__dirname}`);
```
