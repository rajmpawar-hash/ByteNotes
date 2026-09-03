# 📦 ES6 Modules (Import/Export)

> [!TIP]
> **The 30-Second Interview Pitch**
> ES6 Modules allow us to split JavaScript code into separate files, making it modular, reusable, and maintainable. We use the `export` keyword to expose variables, functions, or classes, and the `import` keyword to bring them into another file. This natively solved the dependency management issues that previously required tools like CommonJS (`require()`).

## 1. Why use Modules?
Before ES6, all JavaScript files loaded in a browser shared a single global scope. If two files had a variable named `count`, they would conflict. Modules fix this by giving each file its own **private scope**. You must explicitly export and import what you need.

---

## 2. Named Exports

You can export multiple things from a single file using Named Exports. 

### Exporting (math.js)
```javascript
// Exporting inline
export const PI = 3.14159;

export function add(a, b) {
    return a + b;
}

// Or exporting at the bottom
const subtract = (a, b) => a - b;
export { subtract };
```

### Importing (app.js)
When importing named exports, you **must use the exact same names**, and you wrap them in curly braces `{}`.

```javascript
import { PI, add, subtract } from './math.js';

console.log(PI); // 3.14159
console.log(add(2, 3)); // 5
```

> [!NOTE]
> You can rename named exports using the `as` keyword:
> `import { add as sum } from './math.js';`

---

## 3. Default Exports

A file can have **only one** Default Export. It is typically used when a module is designed to do exactly one main thing (like a React component).

### Exporting (User.js)
```javascript
export default class User {
    constructor(name) {
        this.name = name;
    }
}
```

### Importing (app.js)
When importing a default export, you **do not use curly braces**, and you can name the imported variable whatever you want!

```javascript
import AnyNameIWant from './User.js';

const me = new AnyNameIWant("Raj");
```

---

## 4. Combining Default and Named Exports

A module can have one default export AND multiple named exports.

**utils.js**
```javascript
export const API_URL = "https://api.example.com"; // Named
export default function connect() { ... }         // Default
```

**app.js**
```javascript
import connect, { API_URL } from './utils.js';
```

---

## 5. Importing Everything (Namespace Import)

If a file has many named exports and you want to bundle them into a single object, use `* as`.

```javascript
import * as MathUtils from './math.js';

console.log(MathUtils.PI);
console.log(MathUtils.add(10, 5));
```

---

## 🎯 Common Interview Questions

**Q: What is the difference between ES6 Modules and CommonJS?**
- **A:** ES6 Modules use `import/export`, are statically analyzed (imports are resolved at compile-time), and work natively in the browser. CommonJS uses `require()/module.exports`, resolves dependencies at runtime, and is historically used in Node.js.

**Q: Can you conditionally `import` a module?**
- **A:** You cannot use standard static `import` statements inside an `if` block. However, you can use **Dynamic Imports** (`import('./module.js').then(...)`) which return a Promise and allow conditional, lazy loading of modules!
