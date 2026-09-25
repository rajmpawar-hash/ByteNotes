# 🚀 JavaScript Ultimate Revision Cheat Sheet

> [!NOTE]
> This is a comprehensive, deep-dive revision guide. It contains all critical interview concepts, 30-second pitches, and gotchas extracted from the entire JavaScript module. Use this to blindly trust your revision before interviews.

## 📑 Table of Contents (Quick Navigation)

- [1. Foundations & Execution Context](#️-1-foundations--execution-context)
- [2. Objects & Arrays](#️-2-objects--arrays)
- [3. Functions & Closures](#-3-functions--closures)
- [4. OOP & The `this` Keyword](#-4-oop--the-this-keyword)
- [5. Async JS & The Event Loop](#-5-asynchronous-javascript--the-event-loop)
- [6. Web APIs & Browser DOM](#️-6-web-apis--browser-dom)
- [7. Interview & Machine Coding Patterns](#-7-interview--machine-coding-patterns)

---

## 🏗️ 1. Foundations & Execution Context

### 1.1 Execution Context & Call Stack
> [!TIP]
> **The 30-Second Interview Pitch**
> Everything in JavaScript happens inside an **Execution Context**, a physical workspace created in two phases: **Memory Creation** (hoisting variables/functions) and **Code Execution** (running line-by-line). To manage nested calls, JS uses the **Call Stack** (LIFO) to track the running context.

```javascript
var n = 2;
function square(num) { return num * num; }
var ans = square(n); // Pauses Global EC, creates Local EC for square(), pushes to Call Stack
```

> **Micro-Concepts & Edge Cases:**
> | Concept | Explanation |
> | :--- | :--- |
> | **Restaurant Kitchen Analogy** | Execution Context works in two strict phases: **Phase 1 (Setup/Memory Creation)** where memory is allocated for variables/functions before code runs, and **Phase 2 (Cooking/Code Execution)** where code runs line-by-line. |
> | **`let` and `const` in Memory Phase** | They are hoisted and allocated memory, but placed in the Temporal Dead Zone (TDZ) instead of being initialized with `undefined` like `var`. |
> | **Local Execution Context** | Created on every function invocation. Follows the exact same two phases. It is completely destroyed and deleted from memory when it returns. |
> | **Call Stack & Stack Overflow** | Like a stack of plates (LIFO). Tracks contexts. Exceeding its fixed physical size limit (e.g., recursive functions without a base case) throws a Stack Overflow error. |
> | **Execution Context vs Scope** | Scope is the *rules* of visibility (Lexical Environment). Execution Context is the actual *physical workspace* created in memory during runtime. |
>
> *Related Notes: [01-execution-context-and-call-stack](/javascript/1-foundations/01-basics/01-execution-context-and-call-stack)*

### 1.2 Hoisting
> [!TIP]
> **The 30-Second Interview Pitch**
> Hoisting is JavaScript's default behavior of moving variable and function declarations to the top of their respective scopes during the compilation phase. Functions are fully hoisted, `var` is initialized with `undefined`, while `let/const` remain in the Temporal Dead Zone (TDZ).

```javascript
console.log(a); // ✅ undefined
var a = 10;

// ❌ Gotcha: Arrow functions are treated as variables during hoisting!
greet(); // TypeError: greet is not a function
var greet = () => console.log("Hi"); 
```

> **Micro-Concepts & Edge Cases:**
> | Concept | Explanation |
> | :--- | :--- |
> | **Phase 1 (Memory Creation)** | Hoisting happens here. Variables and functions are allocated memory before execution begins. |
> | **Temporal Dead Zone (TDZ)** | The period between entering scope and variable initialization where `let`/`const` cannot be accessed. |
> | **Function Expressions vs Declarations** | Function declarations are hoisted entirely. Function expressions (`var fn = function(){}`) are treated as variables (hoisted with `undefined`). |
>
> *Related Notes: [02-hoisting](/javascript/1-foundations/01-basics/02-hoisting)*

### 1.3 `undefined` vs `not defined` vs TDZ
- **`undefined`**: Variable is declared, memory is allocated, but no value assigned yet.
- **`not defined`**: Variable was NEVER declared (ReferenceError).
- **TDZ (Temporal Dead Zone)**: Variable is declared with `let/const` (has memory), but cannot be accessed before the initialization line.

```javascript
console.log(typeof notDeclared); // "undefined" (Safe)
console.log(typeof tdzVar); // ❌ ReferenceError (TDZ blocks access)
let tdzVar = 10;
```

> **Micro-Concepts & Edge Cases:**
> | Concept | Explanation |
> | :--- | :--- |
> | **Different States** | `undefined` means declared but not assigned. `not defined` means never declared (ReferenceError). |
> | **Interview Tip** | Using `typeof undeclaredVar` safely returns `"undefined"` without throwing a ReferenceError. |
> | **TDZ Error** | Trying to access a `let`/`const` before initialization throws "Cannot access 'a' before initialization". |
>
> *Related Notes: [03-undefined-vs-not-defined](/javascript/1-foundations/01-basics/03-undefined-vs-not-defined)*

### 1.4 Data Types, Coercion, & Symbols
- **Primitives**: String, Number, BigInt, Boolean, Undefined, Null, Symbol. (Immutable, passed by value)
- **Reference**: Objects, Arrays, Functions. (Mutable, passed by reference)

> [!WARNING]
> **Gotcha: Implicit Coercion with `+` vs `-`**
```javascript
console.log("42" + 42); // "4242" (Concatenation)
console.log("42" - 42); // 0 (Numeric coercion)
console.log(typeof null === "object"); // ✅ true (Legacy JS bug)
console.log(typeof NaN === "number"); // ✅ true
```

> **Micro-Concepts & Edge Cases:**
> | Concept | Explanation |
> | :--- | :--- |
> | **Mutability** | Primitives are completely immutable (you replace the value, you don't change the original). References (Objects/Arrays) are mutable. |
> | **Loose vs Strict Equality** | `==` performs type coercion (`1 == '1'` is true). `===` strictly checks value and type (`1 === '1'` is false). |
> | **Type Conversion (+ vs -)** | `+` triggers string concatenation if any operand is a string. `-` always triggers numeric conversion. |
> | **Symbols** | `Symbol('id')` creates a primitive, guaranteed unique hidden identifier for object properties. They don't appear in `Object.keys()`. `Symbol.for()` checks the global registry and reuses a symbol if it exists. |
>
> *Related Notes: [04-data-types-and-coercion](/javascript/1-foundations/01-basics/04-data-types-and-coercion)*

### 1.5 Scope Chain & Lexical Environment
> [!TIP]
> **The 30-Second Interview Pitch**
> A **Lexical Environment** consists of local memory and a reference to its parent's lexical environment. The **Scope Chain** is the process where JS Engine traverses these parent references up to the Global Scope to find a variable.

```javascript
function outer() {
    let a = 10;
    function inner() {
        console.log(a); // Scope chain lookup: inner -> outer -> global
    }
    inner();
}
```

> **Micro-Concepts & Edge Cases:**
> | Concept | Explanation |
> | :--- | :--- |
> | **Lexical Environment** | Consists of local memory + a reference to the Lexical Environment of its parent. |
> | **"Lexical" meaning** | "Relating to the text/source code". It depends on where the code is *physically written* in the file. |
> | **Stopping the Scope Chain** | The chain stops at the Global Execution Context, whose parent reference is `null`. If a variable isn't found there, it throws a ReferenceError. |
>
> *Related Notes: [01-scope-chain-and-lexical-environment](/javascript/1-foundations/02-scope/01-scope-chain-and-lexical-environment)*

### 1.6 Block Scope & Shadowing (`var` vs `let`)
`let` and `const` are block-scoped (`{}`). `var` is strictly function-scoped and ignores blocks, which can lead to variable leaking.

> [!WARNING]
> **Gotcha: The `setTimeout` Loop Trap**
```javascript
// ❌ WRONG: 'var' leaks to global. Prints 3, 3, 3.
for (var i = 0; i < 3; i++) {
    setTimeout(() => console.log(i), 100); 
}

// ✅ CORRECT: 'let' creates a new block scope per iteration. Prints 0, 1, 2.
for (let j = 0; j < 3; j++) {
    setTimeout(() => console.log(j), 100);
}
```

> **Micro-Concepts & Edge Cases:**
> | Concept | Explanation |
> | :--- | :--- |
> | **Separate Memory Space** | `let`/`const` in a block `{...}` are stored in a separate block-scope memory space, not the global object. |
> | **Shadowing** | An inner variable with the same name "shadows" (hides) the outer variable within that block. |
> | **Illegal Shadowing** | You can shadow a `var` with `let`, but shadowing a `let` with `var` across the same boundary is illegal because `var` tries to leak out and conflict with the `let`. |
>
> *Related Notes: [02-let-const-temporal-dead-zone](/javascript/1-foundations/02-scope/02-let-const-temporal-dead-zone) • [03-block-scope-and-shadowing](/javascript/1-foundations/02-scope/03-block-scope-and-shadowing)*

### 1.7 Error Handling (`try/catch/finally`) & Strict Mode
- **`try`**: Code to execute.
- **`catch(err)`**: Executes on error.
- **`finally`**: Executes always.
- **`"use strict"`**: Catches silent errors, prevents global variable leaks.

```javascript
try {
    "use strict";
    undeclaredVar = 10; // ❌ ReferenceError in strict mode
} catch (e) {
    console.error(e);
} finally {
    console.log("Cleanup");
}
```

> **Micro-Concepts & Edge Cases:**
> | Concept | Explanation |
> | :--- | :--- |
> | **Synchronous Only** | Traditional `try...catch` cannot catch errors inside async callbacks (like `setTimeout`). Use `.catch()` on Promises or `try...catch` inside `async` functions. |
> | **`try...finally`** | The `catch` block is optional if you have `finally`. `finally` ALWAYS executes (great for cleanup), even if you `return` early inside `try`. |
> | **Strict Mode (`"use strict"`)** | A restricted variant of JS. It prevents accidental global variables, catches silent errors, and makes `this` default to `undefined` instead of `window` inside functions. |
>
> *Related Notes: [01-try-catch-finally](/javascript/1-foundations/03-error-handling/01-try-catch-finally) • [02-strict-mode](/javascript/1-foundations/03-error-handling/02-strict-mode)*

### 1.8 Control Flow (`switch` & Ternary)
> [!WARNING]
> **Gotcha: `switch` Fall-through**
> If you forget to add `break;` inside a `case`, JS will "fall through" and execute EVERY subsequent case block below it!

```javascript
// Ternary Operator
const status = age >= 18 ? "Adult" : "Minor";
```

> **Micro-Concepts & Edge Cases:**
> | Concept | Explanation |
> | :--- | :--- |
> | **Operands** | Unary (1: `!true`, `typeof`), Binary (2: `a + b`, `a === b`), Ternary (3: `condition ? true : false`). |
> | **Operator Precedence** | JS follows strict order of operations (e.g., `*` and `/` before `+` and `-`). |
> | **`switch` Fall-through** | Without a `break` statement, a matched `case` will continue to execute all following cases regardless of their condition. |
>
> *Related Notes: [05-operators-and-control-flow](/javascript/1-foundations/01-basics/05-operators-and-control-flow)*

### 1.9 Template Literals
Use backticks (` `) instead of quotes. They support multi-line strings natively and string interpolation via `${}`.

```javascript
const name = "Raj";
const multi = `
  Hello ${name},
  Sum is: ${2 + 2}
`;
```

> **Micro-Concepts & Edge Cases:**
> | Concept | Explanation |
> | :--- | :--- |
> | **Expressions (`${}`)** | You can inject any valid JS expression inside template literals (math: `${a + b}`, ternaries: `${isPro ? 'Pro' : 'Free'}`). |
>
> *Related Notes: [06-template-literals-and-strings](/javascript/1-foundations/01-basics/06-template-literals-and-strings)*

---

## 🗂️ 2. Objects & Arrays

### 2.1 Shallow vs Deep Copy
- **Shallow Copy**: Copies top-level properties. Nested objects still share the same memory reference.
- **Deep Copy**: Copies all levels, creating a completely independent clone.

```javascript
const obj = { name: "Raj", meta: { age: 25 } };

const shallow = { ...obj }; 
shallow.meta.age = 30; // ❌ Mutates original obj.meta.age too!

const deep = structuredClone(obj); // ✅ Native deep copy
deep.meta.age = 40; // Original remains untouched
```

> **Micro-Concepts & Edge Cases:**
> | Concept | Explanation |
> | :--- | :--- |
> | **References/Pointers** | Objects and arrays are reference types. Copying them with `=` just copies the memory pointer, not the actual data. |
> | **`JSON.parse(JSON.stringify())`** | Older deep copy method. Fails on functions, `undefined`, `Symbol`, and `RegExp` (removes or corrupts them). |
> | **`structuredClone()`** | Modern native deep copy. Handles complex types like Dates, Maps, Sets, and ArrayBuffers correctly. |
>
> *Related Notes: [01-shallow-vs-deep-copy](/javascript/2-objects-and-arrays/01-objects-and-es6/01-shallow-vs-deep-copy)*

### 2.2 Destructuring & Rest/Spread (`...`)
- **Spread**: Unpacks elements (right side of `=`).
- **Rest**: Packs elements into an array (left side of `=` or in function arguments).

```javascript
const user = { id: 1, name: "Raj", role: "admin" };
// Destructuring + Rest
const { id, ...details } = user; 
console.log(details); // { name: "Raj", role: "admin" }

// Spread
const merged = { ...user, active: true };
```

> **Micro-Concepts & Edge Cases:**
> | Concept | Explanation |
> | :--- | :--- |
> | **Expands vs Collects** | Spread expands an iterable into elements. Rest collects multiple elements and condenses them into a single array. |
> | **The "Last" Rule** | The Rest parameter must ALWAYS be the last element in destructuring or function arguments. |
> | **Useful Cases** | Passing arrays to functions needing lists: `Math.max(...arr)`, or skipping elements: `const [first, , third] = arr;`. |
>
> *Related Notes: [02-destructuring-spread-rest](/javascript/2-objects-and-arrays/01-objects-and-es6/02-destructuring-spread-rest)*

### 2.3 Optional Chaining (`?.`) & Nullish Coalescing (`??`)
- `?.` prevents errors when reading deeply nested properties that might be null/undefined.
- `??` provides a fallback ONLY if the left side is `null` or `undefined` (Unlike `||` which triggers on any falsy value like `0` or `""`).

```javascript
const config = { speed: 0 };

console.log(config.speed || 100); // ❌ 100 (0 is falsy, bug!)
console.log(config.speed ?? 100); // ✅ 0 (Only triggers on null/undefined)
console.log(config.user?.name); // undefined (safe, no crash)
```

> **Micro-Concepts & Edge Cases:**
> | Concept | Explanation |
> | :--- | :--- |
> | **Short-circuiting** | `?.` immediately stops evaluating and returns `undefined` if the reference on its left is nullish. |
> | **`??` vs `\|\|` (OR)** | The OR operator `\|\|` triggers on ANY falsy value (`0`, `""`, `false`). `??` ONLY triggers on `null` or `undefined`. |
>
> *Related Notes: [03-optional-chaining-nullish](/javascript/2-objects-and-arrays/01-objects-and-es6/03-optional-chaining-nullish)*

### 2.4 Array Methods & Loops
- **`map`**: Transforms array. Returns new array.
- **`forEach`**: Iterates array but returns `undefined`. Cannot be chained.
- **`filter`**: Filters based on condition. Returns new array.
- **`reduce`**: Accumulates values into a single output.

```javascript
const nums = [1, 2, 3, 4];
const sum = nums.reduce((acc, curr) => acc + curr, 0); // 10

// ❌ for...in loops over KEYS (indices in arrays). 
// ✅ for...of loops over VALUES (Iterables like arrays, maps, strings).
for (const val of nums) { console.log(val); }
```

> **Micro-Concepts & Edge Cases:**
> | Concept | Explanation |
> | :--- | :--- |
> | **`forEach` Gotchas** | Returns `undefined` (cannot chain). Cannot be stopped early with `break` or `continue`. |
> | **Mutating vs Non-Mutating** | `splice`, `sort`, `reverse`, `push`/`pop` mutate original array. `slice`, `map`, `filter`, `concat` return new arrays. |
> | **Array-Like Objects** | Objects with indexes and a `length` (like `NodeList` or `arguments`). Convert using `Array.from(obj)` or `[...obj]`. |
> | **Enumerable vs Iterable** | **Enumerables** (Objects) assign an `[[Enumerable]]` flag to their individual keys (like `user.name`) so they show up in `for...in` loops. **Iterables** (Arrays) implement `[Symbol.iterator]()` to stream values for `for...of`. |
> | **`for...in` vs `for...of`** | `for...in` loops over keys (enumerable properties) including prototype chain. `for...of` loops over iterable values directly. |
> | **`const` in Loops** | `const` works in BOTH `for...in` and `for...of` (new scope per iteration) but fails in standard `for (let i=0)` if you try `for (const i=0)` because it attempts to reassign `i`. |
>
> *Related Notes: [01-array-methods](/javascript/2-objects-and-arrays/02-array-methods/01-array-methods) • [01-loops-and-iteration](/javascript/2-objects-and-arrays/03-loops-and-iteration/01-loops-and-iteration)*

### 2.5 Maps & Sets
- **`Set`**: Collection of strictly unique values.
- **`Map`**: Key-value store where keys can be ANY type (objects, functions), unlike normal objects where keys are strings.

```javascript
const unique = [...new Set([1, 1, 2, 3])]; // [1, 2, 3]

const cache = new Map();
cache.set({ query: "users" }, [1, 2, 3]); // Object as a key!
```

> **Micro-Concepts & Edge Cases:**
> | Concept | Explanation |
> | :--- | :--- |
> | **Key Types & Size** | Maps can have objects/functions as keys, Objects cannot. Map size is easily checked via `map.size`, unlike `Object.keys(obj).length`. |
> | **Set Unique Values** | A Set guarantees each value may occur only once. Useful for stripping duplicates: `[...new Set(arr)]`. |
> | **Time Complexity** | `Set.has()` is `O(1)` (instant), whereas `Array.includes()` is `O(n)` (must scan). |
> | **WeakMap / WeakSet** | Only accept Objects as keys. Hold "weak references", allowing keys to be Garbage Collected if no other references exist (prevents memory leaks). |
>
> *Related Notes: [01-maps-and-sets](/javascript/2-objects-and-arrays/04-maps-and-sets/01-maps-and-sets)*

### 2.6 Advanced Object Methods & Proxy
- **`Object.freeze(obj)`**: Locks object completely (no add/delete/change).
- **`Object.seal(obj)`**: Prevents add/delete, but ALLOWS changing existing properties.

```javascript
const user = { 
    firstName: "Raj",
    get name() { return this.firstName; },
    set name(val) { this.firstName = val; } // Saving to differently named var avoids infinite loop
};
Object.seal(user);
user.firstName = "Pawar"; // ✅ Allowed in seal
delete user.firstName; // ❌ Ignored/Throws in strict
```

> **Micro-Concepts & Edge Cases:**
> | Concept | Explanation |
> | :--- | :--- |
> | **Freeze vs Seal** | `freeze()` is completely immutable. `seal()` is partially immutable (prevents add/delete but CAN modify existing properties). |
> | **Getters (`get`) & Setters (`set`)** | Intercept property access. Useful for validation/formatting. **Gotcha:** Inside a setter, you must save to a differently named internal variable (like `_price`) to avoid a Stack Overflow infinite loop! |
> | **Proxy & Reflect** | `Proxy` intercepts fundamental object operations (get, set). `Reflect` provides standard ways to invoke these intercepted operations safely instead of direct manipulation. |
>
> *Related Notes: [04-getters-and-setters](/javascript/2-objects-and-arrays/01-objects-and-es6/04-getters-and-setters) • [05-advanced-object-methods](/javascript/2-objects-and-arrays/01-objects-and-es6/05-advanced-object-methods)*

### 2.7 String Methods
> [!TIP]
> **The 30-Second Interview Pitch**
> Strings are primitives and therefore immutable. String methods that appear to modify a string actually return a completely *new* string by temporarily wrapping the primitive in a String Object.

```javascript
const name = "rajpawar";
console.log(name.slice(-3)); // "war"
console.log(name.substring(-3)); // "rajpawar" (Negative becomes 0)
```

> **Micro-Concepts & Edge Cases:**
> | Concept | Explanation |
> | :--- | :--- |
> | **`slice` vs `substring`** | `slice(start, end)` supports negative indexes (counts from end). `substring(start, end)` treats negative indexes as `0`. |
> | **Searching** | `indexOf` and `includes` search exact text. `search` and `match` accept Regular Expressions (e.g., `/text/i`). |
> | **String ↔️ Array** | Use `split(separator)` to convert a String to an Array, and `join(separator)` to convert it back. |
> | **String Object Gotcha** | `new String("Raj")` creates an Object, not a primitive. `primitive === objectStr` is `false`! Use `.valueOf()` to compare safely. |
>
> *Related Notes: [02-string-methods](/javascript/2-objects-and-arrays/02-array-methods/02-string-methods)*

---

## 🧠 3. Functions & Closures

### 3.1 First-Class & Higher-Order Functions
- **First-Class Functions**: In JS, functions are treated as variables (they can be assigned, passed as arguments, or returned).
- **Higher-Order Function (HOF)**: A function that accepts another function as an argument (callback) OR returns a function.

```javascript
// 'map' is a HOF. The arrow function is the Callback.
const doubled = [1, 2, 3].map(n => n * 2);
```

> **Micro-Concepts & Edge Cases:**
> | Concept | Explanation |
> | :--- | :--- |
> | **First-Class Citizens** | Functions can be assigned to variables, passed as arguments (Callbacks), and returned from other functions. |
> | **Higher-Order Function (HOF)** | Any function that accepts a function as an argument or returns one. Great for DRY (Don't Repeat Yourself) code (e.g., `map`, `filter`). |
> | **Function Declaration vs Expression** | Declarations (`function fn(){}`) are fully hoisted. Expressions (`const fn = function(){}`) are hoisted as variables. |
> | **IIFE (Immediately Invoked)** | `(function() { ... })()` runs instantly. Before ES6, IIFEs were the main way to create private data scopes and avoid polluting the global namespace. |
> | **Pure vs Impure** | Pure: Same input always equals same output with NO side effects. Impure: Relies on or mutates external state (API calls, DOM). |
>
> *Related Notes: [01-first-class-functions](/javascript/3-functions/01-functions/01-first-class-functions) • [02-callback-functions](/javascript/3-functions/01-functions/02-callback-functions) • [03-higher-order-functions](/javascript/3-functions/01-functions/03-higher-order-functions)*

### 3.2 Closures
> [!TIP]
> **The 30-Second Interview Pitch**
> A **Closure** is a function bundled together with its lexical environment. It allows a function to remember and access variables from its outer (parent) scope even after the parent function has finished executing and its execution context is destroyed.

> [!WARNING]
> **Gotcha: The Reference Trap**
> Closures capture *references* to variables, not their values at creation time.

```javascript
function createCounter() {
    let count = 0; // Private state hidden in closure backpack
    return function() {
        return ++count;
    }
}
const add = createCounter(); // createCounter finishes execution
console.log(add()); // 1 (remembers 'count')
console.log(add()); // 2
```

> **Micro-Concepts & Edge Cases:**
> | Concept | Explanation |
> | :--- | :--- |
> | **Scope Chain Capture** | Closures capture the *entire lexical environment* of their parent, maintaining active references, not just frozen values. |
> | **Private Variables** | They allow emulating private data (encapsulation) that cannot be modified directly from the outside. |
> | **React Hooks & Closures** | Hooks like `useState` and `useEffect` rely heavily on closures to "remember" state between component renders. |
> | **Memory Leaks** | If closures reference large objects and are kept alive unintentionally (e.g., on a global event listener), those objects cannot be garbage collected. |
>
> *Related Notes: [01-closures-basics](/javascript/3-functions/02-closures/01-closures-basics) • [02-closures-in-action](/javascript/3-functions/02-closures/02-closures-in-action)*

### 3.3 Currying & Partial Application
Transforming a function that takes multiple arguments into a sequence of functions that take one argument each.

```javascript
const multiply = (a) => (b) => (c) => a * b * c;
console.log(multiply(2)(3)(4)); // 24
```

> **Micro-Concepts & Edge Cases:**
> | Concept | Explanation |
> | :--- | :--- |
> | **Currying vs Partial App** | Currying transforms `f(a,b,c)` into `f(a)(b)(c)` (1 argument per call). Partial Application locks in *some* arguments upfront `f(a,b)(c)`. |
> | **Why Use It?** | Creating specialized reusable functions (e.g., an API fetcher pre-configured with a base URL or a logger pre-configured with a severity level). |
> | **Infinite Currying** | Implementing `sum(1)(2)(3)...()` relies on returning a function recursively until a termination condition (like an empty call `()`) is met. |
>
> *Related Notes: [04-currying](/javascript/3-functions/01-functions/04-currying) • [01-currying-partial-application](/javascript/7-interview/01-interview-patterns/01-currying-partial-application)*

### 3.4 Generators & Iterators (`function*`)
Generators can pause execution using `yield` and resume using `.next()`. They return an Iterator.

```javascript
function* idGenerator() {
    let id = 1;
    while (true) {
        yield id++; // Pauses here until .next() is called
    }
}
const gen = idGenerator();
console.log(gen.next().value); // 1
console.log(gen.next().value); // 2
```

> **Micro-Concepts & Edge Cases:**
> | Concept | Explanation |
> | :--- | :--- |
> | **Iterator Protocol** | Calling `.next()` returns an object: `{ value: ANY, done: BOOLEAN }`. This is exactly how `for...of` loops work under the hood! |
> | **Iterating Generators** | Yes, you can use `for...of` on a generator; it will automatically extract `value` and stop when `done` is true. |
> | **Real World Use** | State machines, infinite data streams (like IDs), or managing complex async flows (e.g., Redux Saga). |
>
> *Related Notes: [01-generators-and-iterators](/javascript/3-functions/03-generators-and-iterators/01-generators-and-iterators)*

### 3.5 Memoization
A performance optimization technique that **caches the results** of expensive function calls based on their inputs. If called again with the same arguments, it returns the cached result instantly.

```javascript
const cache = {};
function memoizedAdd(n) {
    if (n in cache) return cache[n];
    cache[n] = n + 10; // Expensive calculation
    return cache[n];
}
```

> **Micro-Concepts & Edge Cases:**
> | Concept | Explanation |
> | :--- | :--- |
> | **Ideal Use Cases** | Expensive recursive algorithms (Fibonacci), frequent API calls with same params, or heavy DOM queries. |
> | **Constraints** | Only works for **pure functions** (same input always equals same output). Trading memory (to store cache) for CPU speed. |
> | **React Equivalents** | `React.memo`, `useMemo`, and `useCallback` are React's built-in memoization tools. |
>
> *Related Notes: [05-memoization](/javascript/7-interview/01-interview-patterns/05-memoization)*

---

## 🎯 4. OOP & The `this` Keyword

### 4.1 The 4 Rules of `this`
> [!TIP]
> **The 30-Second Interview Pitch**
> In JavaScript, `this` is not determined by where a function is written, but by **how** it is called at execution time. The 4 rules are: `new` binding (points to newly created object), Explicit binding (`call/apply/bind`), Implicit binding (object left of the dot), and Default binding (`window` or `undefined`).

> [!WARNING]
> **Gotcha: Arrow Functions and `this`**
> Arrow functions do NOT have their own `this`. They lexically inherit it from their parent scope. You cannot override an arrow function's `this` with `.call()` or `.bind()`.

```javascript
const user = {
    name: "Raj",
    greet: function() { console.log(this.name); }, // 'this' points to user
    arrowGreet: () => console.log(this.name) // 'this' points to window/undefined
};
user.greet(); // "Raj"
user.arrowGreet(); // undefined
```

> **Micro-Concepts & Edge Cases:**
> | Concept | Explanation |
> | :--- | :--- |
> | **Global Objects** | Browsers have `window`, Node has `global`. Use `globalThis` for cross-platform access. |
> | **The "HOW" Rule** | `this` is NOT defined by where the function is written, but HOW it is invoked at runtime. |
> | **NEID Mnemonic** | 4 Rules of `this`: **N**ew binding (class instantiation), **E**xplicit (`call`/`apply`), **I**mplicit (`obj.fn()`), **D**efault (standalone `fn()`). |
>
> *Related Notes: [00-window-and-this](/javascript/4-oop/01-this-keyword/00-window-and-this) • [01-this-rules](/javascript/4-oop/01-this-keyword/01-this-rules)*

### 4.2 `call`, `apply`, and `bind`
- **`call(obj, arg1, arg2)`**: Executes immediately. Passes comma-separated arguments.
- **`apply(obj, [argsArray])`**: Executes immediately. Passes an array of arguments.
- **`bind(obj)`**: Does NOT execute immediately. Returns a *new function* permanently bound to `obj`.

```javascript
function introduce(lang) { console.log(`I am ${this.name}, coding in ${lang}`); }
const dev = { name: "Raj" };

introduce.call(dev, "JavaScript"); // Immediate execution
const boundFn = introduce.bind(dev); // Returns new fn
boundFn("TypeScript"); // Executes later
```

> **Micro-Concepts & Edge Cases:**
> | Concept | Explanation |
> | :--- | :--- |
> | **Memory Trick** | **A**pply uses **A**rrays (`[a, b, c]`). **C**all uses **C**omma-separated arguments (`a, b, c`). |
> | **`bind` vs Execution** | `call` and `apply` execute the function immediately. `bind` returns a *brand new function* that you can execute later. |
>
> *Related Notes: [02-call-apply-bind](/javascript/4-oop/01-this-keyword/02-call-apply-bind)*

### 4.3 Prototypes & Inheritance
- **Prototypes**: Every object has a hidden `[[Prototype]]` (accessible via `__proto__`). If a property isn't found, JS looks up the prototype chain.
- **Classes**: ES6 `class` is just syntactic sugar over prototypal inheritance.

```javascript
class Person {
    constructor(name) { this.name = name; }
    speak() { console.log("Hello"); }
}
// Under the hood, speak() is added to Person.prototype.speak
```

> **Micro-Concepts & Edge Cases:**
> | Concept | Explanation |
> | :--- | :--- |
> | **Prototype Chain** | A linked series of objects. If JS can't find a property on an object, it looks up the `__proto__` link until it hits `null`. |
> | **Syntactic Sugar** | ES6 Classes are just a cleaner syntax over traditional Constructor Functions and prototypal inheritance. |
> | **Method Overloading/Multiple Inheritance** | JavaScript does NOT support traditional method overloading or multiple inheritance out of the box (can be faked with `Object.assign`). |
>
> *Related Notes: [01-prototypal-inheritance](/javascript/4-oop/02-prototypes/01-prototypal-inheritance) • [02-classes-and-oop](/javascript/4-oop/02-prototypes/02-classes-and-oop)*

### 4.4 Type Checking (`typeof` vs `instanceof`)
- **`typeof`**: Checks primitives.
- **`instanceof`**: Checks if a constructor is in an object's prototype chain.

> [!WARNING]
> **Gotcha: `isNaN()` vs `Number.isNaN()`**
> The global `isNaN("text")` returns `true` because it forcefully coerces the string to a number first. Always use `Number.isNaN("text")` which strictly checks and returns `false`!

> [!WARNING]
> **Gotcha: The `instanceof` Iframe Bug**
> `instanceof Array` fails if the array comes from a different window/iframe because each iframe has its own isolated global environment and constructors! Always use `Array.isArray(arr)`.

```javascript
console.log(typeof null); // "object" (Legacy bug)
console.log([] instanceof Array); // true (Usually)
console.log(Array.isArray([])); // ✅ Best practice
```

> **Micro-Concepts & Edge Cases:**
> | Concept | Explanation |
> | :--- | :--- |
> | **The Iframe Bug** | `instanceof Array` fails across iframes because each window has its own global `Array` constructor. Use `Array.isArray()`. |
> | **Ultimate Type Check** | `Object.prototype.toString.call(value)` is the safest way to extract precise internal types (returns `[object Array]`, etc.). |
>
> *Related Notes: [01-type-checking](/javascript/4-oop/03-type-checking/01-type-checking)*

---

## ⏳ 5. Asynchronous JavaScript & The Event Loop

### 5.1 The Event Loop Architecture
> [!TIP]
> **The 30-Second Interview Pitch**
> JavaScript is single-threaded. To handle async operations, it delegates heavy lifting to Web APIs (browser C++ threads). When finished, callbacks are pushed to either the **Microtask Queue** (Promises) or **Macrotask Queue** (Timers/Events). The **Event Loop** constantly checks the Call Stack; when empty, it drains the *entire* Microtask Queue before processing exactly one item from the Macrotask Queue.

> [!WARNING]
> **Gotcha: The Starvation Problem**
> Because the Microtask Queue is completely drained first, if a Promise keeps recursively resolving other Promises, the Macrotask Queue (e.g., UI updates, `setTimeout`) will never execute, freezing the browser!

```javascript
console.log("1");
setTimeout(() => console.log("4"), 0); // Macrotask
Promise.resolve().then(() => console.log("3")); // Microtask
console.log("2");
// Output: 1, 2, 3, 4
```

> **Micro-Concepts & Edge Cases:**
> | Concept | Explanation |
> | :--- | :--- |
> | **Single Thread & C++ APIs** | JS executes one thing at a time. It hands off async work (timers, fetch) to browser Web APIs (C++ threads) which run in the background. |
> | **Microtask vs Macrotask** | Microtasks (Promises, MutationObserver) go to the VIP queue. Macrotasks (`setTimeout`, UI Events) go to the standard queue. |
> | **The Event Loop Rules** | 1. Run all synchronous code. 2. Drain the ENTIRE Microtask queue (absolute priority). 3. Run EXACTLY ONE Macrotask. Repeat. |
> | **Starvation Problem** | If a Microtask recursively spawns more Microtasks, Macrotasks (like rendering or timers) will be permanently blocked (starved). |
>
> *Related Notes: [01-sync-vs-async](/javascript/5-async/01-intro/01-sync-vs-async) • [00-async-glossary](/javascript/5-async/02-async/00-async-glossary) • [01-event-loop](/javascript/5-async/02-async/01-event-loop) • [06-execution-walkthroughs](/javascript/5-async/02-async/06-execution-walkthroughs) • [04-event-loop-output-questions](/javascript/7-interview/01-interview-patterns/04-event-loop-output-questions)*

### 5.2 JS Engine Architecture (JIT)
V8 uses **Just-In-Time (JIT) Compilation**:
1. **Ignition (Interpreter)**: Runs code immediately line-by-line for fast startup.
2. **TurboFan (Compiler)**: Takes "hot" (frequently run) code from Ignition and optimizes it into highly efficient machine code in the background.

> **Micro-Concepts & Edge Cases:**
> | Concept | Explanation |
> | :--- | :--- |
> | **Compilation Pipeline** | Code -> Tokenization -> AST (Abstract Syntax Tree) -> Interpreter (Ignition) -> Compiler (TurboFan). |
> | **Profiler & Deoptimization** | The engine profiles running code to optimize hot paths. If assumptions change (e.g., passing a string to a function that only saw numbers before), it "deoptimizes" back to slower code. |
>
> *Related Notes: [02-js-engine-architecture](/javascript/5-async/02-async/02-js-engine-architecture)*

### 5.3 Promises vs Async/Await
- **Promises**: Objects representing eventual completion/failure. States: Pending, Fulfilled, Rejected.
- **Async/Await**: Syntax sugar over Promises. `await` pauses the execution of the async function locally but does NOT block the main thread.

```javascript
async function fetchUser() {
    try {
        const response = await fetch("api/user");
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Failed:", error);
    }
}
```

> **Micro-Concepts & Edge Cases:**
> | Concept | Explanation |
> | :--- | :--- |
> | **Solving Inversion of Control** | Promises fix "Callback Hell" by returning a placeholder object you control, rather than passing your callback blindly into external functions. |
> | **The `.then()` Rule** | Every `.then()` ALWAYS returns a brand new Promise, which is why they can be chained indefinitely. |
> | **Three States** | Pending (waiting), Fulfilled (success), Rejected (failed). |
>
> *Related Notes: [03-promises](/javascript/5-async/02-async/03-promises) • [04-async-await](/javascript/5-async/02-async/04-async-await)*

### 5.4 Promise Combinators
- **`Promise.all`**: Resolves when ALL resolve. Fails completely if ONE rejects (Fail-fast).
- **`Promise.allSettled`**: Waits for all to finish, regardless of success or failure. Never rejects.
- **`Promise.race`**: Returns the very first one to settle (success or failure).
- **`Promise.any`**: Returns the first to resolve. Rejects only if ALL reject (AggregateError).

> **Micro-Concepts & Edge Cases:**
> | Concept | Explanation |
> | :--- | :--- |
> | **All or Nothing** | `Promise.all()` resolves with an array of values ONLY if all succeed. If even one fails, the entire batch fails instantly. |
> | **First Success vs First Settled** | `Promise.any()` waits for the FIRST SUCCESS. `Promise.race()` returns the FIRST TO SETTLE (success or failure). |
> | **Order Preservation** | In polyfills, you must use `results[index] = value` instead of `results.push()` to ensure the output array matches the input order, since promises resolve at different times. |
>
> *Related Notes: [04-promise-apis](/javascript/5-async/02-async/04-promise-apis) • [02-promise-polyfills](/javascript/8-machine-coding/02-promise-polyfills)*

### 5.5 Modules (ESM vs CommonJS)
- **ESM (`import`/`export`)**: Asynchronous, supports static analysis (tree-shaking), modern web/Node standard.
- **CommonJS (`require`/`module.exports`)**: Synchronous, dynamic, legacy Node.js standard.

```javascript
// ESM (Modern)
import { api } from './api.js';

// CommonJS (Legacy Node)
const api = require('./api.js');
```

> **Micro-Concepts & Edge Cases:**
> | Concept | Explanation |
> | :--- | :--- |
> | **Sync vs Async** | CJS (`require`) is synchronous and dynamic (can be inside `if` statements). ESM (`import`) is asynchronous and static (must be top-level). |
> | **Strict Mode & Scope** | ESM files are automatically in strict mode and maintain a private scope. |
> | **Dynamic Imports** | ESM supports conditional dynamic loading using `import('./module.js').then(...)`. |
>
> *Related Notes: [01-esm-vs-commonjs](/javascript/5-async/03-modules/01-esm-vs-commonjs) • [02-es6-modules-syntax](/javascript/5-async/03-modules/02-es6-modules-syntax)*

### 5.6 The `fetch` API Quirks
> [!WARNING]
> **Gotcha: `fetch` Doesn't Reject on HTTP Errors!**
> A `fetch()` Promise only rejects on **network failures** (like no internet). It will NOT reject on a 404 or 500 status. You must manually check `response.ok`.

```javascript
fetch("api/missing")
    .then(res => {
        if (!res.ok) throw new Error("HTTP Error " + res.status);
        return res.json();
    })
    .catch(err => console.error(err)); // Catches 404s properly now!
```

> **Micro-Concepts & Edge Cases:**
> | Concept | Explanation |
> | :--- | :--- |
> | **Concurrency in JS** | Achieved via Non-Blocking I/O. JS hands off requests to Web APIs and keeps executing other code while waiting. |
> | **Rejection Quirks** | `fetch()` ONLY rejects on severe network failures. A 404 or 500 status code resolves normally, so you must manually check `!response.ok`. |
>
> *Related Notes: [07-fetch-api-and-concurrency](/javascript/5-async/02-async/07-fetch-api-and-concurrency)*

---

## 🛠️ 6. Web APIs & Browser DOM

### 6.1 Event Delegation (Bubbling)
> [!TIP]
> **The 30-Second Interview Pitch**
> Instead of attaching 100 event listeners to 100 child elements, you attach ONE listener to their parent. Because events "bubble" up the DOM tree, the parent can catch the event and check `e.target` to see exactly which child triggered it, saving massive amounts of memory.

```javascript
document.getElementById("parent-ul").addEventListener("click", (e) => {
    if (e.target.tagName === "LI") {
        console.log("Clicked item:", e.target.textContent);
    }
});
```

> **Micro-Concepts & Edge Cases:**
> | Concept | Explanation |
> | :--- | :--- |
> | **Event Propagation** | Events travel down (Capturing), hit the element (Target), and travel back up (Bubbling). Stopping propagation uses `e.stopPropagation()`. |
> | **Why Delegate?** | Attach ONE listener to a parent instead of hundreds to children. Uses less memory and automatically handles dynamic elements added later. |
> | **`target` vs `currentTarget`** | `event.target` is the actual exact element clicked (e.g., the `<li>`). `event.currentTarget` is the element holding the listener (e.g., the `<ul>`). |
>
> *Related Notes: [01-event-delegation](/javascript/6-web-apis/01-dom-and-browser/01-event-delegation) • [04-dom-and-events](/javascript/6-web-apis/01-dom-and-browser/04-dom-and-events)*

### 6.2 Debounce vs Throttle
- **Debounce**: Waits for a "pause" in user action. (e.g., Wait 300ms after user stops typing to trigger search).
- **Throttle**: Guarantees a steady execution rate. (e.g., Execute maximum once every 300ms during continuous scrolling).

```javascript
// Debounce Polyfill Core Logic
function debounce(fn, delay) {
    let timer;
    return function(...args) {
        clearTimeout(timer); // Reset clock on every keystroke
        timer = setTimeout(() => fn.apply(this, args), delay);
    }
}
```

> **Micro-Concepts & Edge Cases:**
> | Concept | Explanation |
> | :--- | :--- |
> | **Debouncing** | Fires only after the user has STOPPED acting for a duration (resets timer if action repeats). Best for search bars. |
> | **Throttling** | Fires *at most once* per specified duration, guaranteeing a steady execution rate. Best for scroll/resize listeners. |
> | **Closure Dependency** | Both patterns require returning a function that relies on Closures to retain the `timer` or `inThrottle` state across multiple calls. |
>
> *Related Notes: [02-debounce-and-throttle](/javascript/6-web-apis/01-dom-and-browser/02-debounce-and-throttle)*

### 6.3 DOM Performance (DocumentFragment)
DOM manipulation is expensive (Repaints & Reflows). Use `DocumentFragment` to batch updates in memory, appending to the real DOM only once.

```javascript
const frag = document.createDocumentFragment();
for(let i=0; i<100; i++) {
    const div = document.createElement("div");
    frag.appendChild(div); // Memory only, no reflow
}
document.body.appendChild(frag); // Only ONE reflow triggered
```

> **Micro-Concepts & Edge Cases:**
> | Concept | Explanation |
> | :--- | :--- |
> | **Repaints & Reflows** | Modifying the DOM directly triggers layout recalculations (Reflows) which are expensive. |
> | **Why `DocumentFragment`?** | It acts as an invisible, off-screen DOM wrapper. You append hundreds of elements to it in memory (0 reflows), then append the fragment to the real DOM (1 reflow). |
> | **Drag & Drop Events** | Require `draggable="true"` and a sequence of events (`dragstart`, `dragover`, `drop`). You must `e.preventDefault()` on `dragover` to allow dropping. |
>
> *Related Notes: [05-dom-performance-and-apis](/javascript/6-web-apis/01-dom-and-browser/05-dom-performance-and-apis)*

### 6.4 Web Storage (Local, Session, Cookies)
- **`localStorage`**: Persists indefinitely (until manually cleared).
- **`sessionStorage`**: Cleared the moment the browser tab is closed.
- **Cookies**: Sent automatically with every HTTP request. Small (4KB limit).

```javascript
localStorage.setItem("theme", "dark");
console.log(sessionStorage.getItem("cart"));
document.cookie = "token=123; Secure; HttpOnly";
```

> **Micro-Concepts & Edge Cases:**
> | Concept | Explanation |
> | :--- | :--- |
> | **Lifetimes** | `localStorage` persists forever. `sessionStorage` dies when tab closes. Cookies expire based on `Max-Age` or `Expires`. |
> | **Network Impact** | Cookies are automatically sent with every HTTP request, bloating bandwidth. Local/Session storage stay strictly on the client. |
> | **Security** | Never store sensitive data (JWTs/passwords) in pure `localStorage` as it's vulnerable to XSS. Use Secure/HttpOnly Cookies for auth. |
>
> *Related Notes: [03-storage-cookies](/javascript/6-web-apis/01-dom-and-browser/03-storage-cookies)*

---

## 🧠 7. Interview & Machine Coding Patterns

### 7.1 Memory Leaks (Garbage Collection)
JS uses the **Mark-and-Sweep** algorithm. 
**Common Leak Sources**:
1. Accidental Global Variables (forgetting `let`/`const`).
2. Uncleared Intervals (`setInterval` without `clearInterval`).
3. Detached DOM Elements (keeping a JS reference to an HTML node you removed).
4. Unclosed Closures holding large objects.

> **Micro-Concepts & Edge Cases:**
> | Concept | Explanation |
> | :--- | :--- |
> | **Mark-and-Sweep** | GC starts from roots (global object). It "marks" everything reachable. It "sweeps" (deletes) everything unmarked. |
> | **Common Fixes** | Use `'use strict'` to avoid accidental globals. Always `clearInterval()`. Set removed DOM references to `null`. |
> | **Advanced Patterns** | Controlling concurrency (e.g., `Parallel Limit` fetching) prevents memory spikes by limiting active promises. |
>
> *Related Notes: [01-memory-leaks](/javascript/7-interview/02-memory-leaks/01-memory-leaks) • [03-advanced-machine-coding](/javascript/8-machine-coding/03-advanced-machine-coding)*

### 7.2 Web Security (XSS vs CSRF)
- **XSS (Cross-Site Scripting)**: Malicious JS injected into UI. 
  - *Fix*: Sanitize user input. Never blindly trust `innerHTML` or use `eval()`.
- **CSRF (Cross-Site Request Forgery)**: Tricking browser into executing actions on a trusted site using stored cookies.
  - *Fix*: Use Anti-CSRF tokens and SameSite cookie attributes.

> **Micro-Concepts & Edge Cases:**
> | Concept | Explanation |
> | :--- | :--- |
> | **Preventing XSS** | Never trust user input. Sanitize data using libraries like `DOMPurify`. Prefer `element.textContent` over `element.innerHTML` to block script execution. |
> | **The `eval()` Risk** | It executes text as code. Passing user input to `eval()` allows instant XSS injection. |
> | **Server-Side Validation** | Client-side security is easily bypassed. You MUST always validate data again on the server. |
>
> *Related Notes: [01-security-and-performance](/javascript/7-interview/03-security-and-performance/01-security-and-performance)*

### 7.3 Truthy vs Falsy Values
- **Falsy Values**: `0`, `""`, `null`, `undefined`, `NaN`, `false`. 
- **Truthy Values**: EVERYTHING else (including empty arrays `[]` and empty objects `{}`).

```javascript
if ([]) console.log("Empty array is truthy!"); // Prints
if (0) console.log("0 is falsy"); // Does not print
```

> **Micro-Concepts & Edge Cases:**
> | Concept | Explanation |
> | :--- | :--- |
> | **Loosely Typed** | JS auto-coerces types. `null == undefined` is true, but `null === undefined` is false. |
> | **Falsy Values** | There are exactly 6 falsy values: `0`, `""`, `null`, `undefined`, `NaN`, `false`. Everything else (like `"false"`, `[]`, `{}`) is truthy! |
> | **Safe Checks** | Don't check for arrays using truthiness. Use `Array.isArray(value)`. Explicitly cast using `Boolean(val)` when uncertain. |
>
> *Related Notes: [03-type-coercion-truthy-falsy](/javascript/7-interview/01-interview-patterns/03-type-coercion-truthy-falsy)*

### 7.4 Array/Function Polyfills (Machine Coding)
Be ready to write `map`, `reduce`, or `bind` from scratch!

```javascript
// Polyfill for Function.prototype.bind
Function.prototype.myBind = function(context, ...args) {
    const fn = this; // The original function
    return function(...newArgs) {
        // Apply context and merge bound args with invocation args
        return fn.apply(context, [...args, ...newArgs]);
    }
}
```

> [!NOTE]
> Need to dig deeper into any of these concepts? Head over to the [🗺️ Master Navigation Hub](/javascript/00-overview) to explore dedicated markdown files for every single topic, complete with detailed walkthroughs and machine-coding examples!

> **Micro-Concepts & Edge Cases:**
> | Concept | Explanation |
> | :--- | :--- |
> | **Why Learn Polyfills?** | Interviewers ask them to test your understanding of "how built-in methods work internally", particularly context binding and closures. |
> | **`reduce` Gotcha** | When polyfilling `reduce`, you must carefully handle whether an `initialValue` was provided. If not, the first array element becomes the accumulator. |
> | **Prototype Extension** | You attach polyfills via `Array.prototype.myMethod = function() {...}`. |
>
> *Related Notes: [02-polyfills](/javascript/7-interview/01-interview-patterns/02-polyfills) • [01-array-and-function-polyfills](/javascript/8-machine-coding/01-array-and-function-polyfills)*

### 7.5 Advanced Machine Coding Strategies
> [!TIP]
> **The 30-Second Interview Pitch**
> Advanced machine coding rounds test your ability to implement complex utility functions. The key is recognizing the core pattern: recursion (for deeply nested objects/retries), closures (for state retention like caching/timers), or pub-sub (for event emitters).

> **Micro-Concepts & Edge Cases:**
> | Concept | Explanation |
> | :--- | :--- |
> | **Deep Flatten (Object/Array)** | Strategy: **Recursion**. Iterate over keys. If the value is an object/array, call the flatten function recursively (passing down the accumulated prefix like `user.address.`). |
> | **Event Emitter (Pub/Sub)** | Strategy: **Dictionary of Arrays**. Maintain `this.events = {}`. `.on()` pushes callbacks to an array. `.emit()` loops through the array and executes them. |
> | **API Retry Wrapper** | Strategy: **Async Recursion**. Wrap `await fetch()` in a `try/catch`. In the `catch` block, if retries are > 1, decrement the retry count and return the function call again. |
> | **Parallel Limit (Concurrency)** | Strategy: **`Promise.race()`**. Keep an array of executing promises. If length >= limit, `await Promise.race(executing)` to wait for at least one to finish before starting the next loop iteration. |
>
> *Related Notes: [03-advanced-machine-coding](/javascript/8-machine-coding/03-advanced-machine-coding)*