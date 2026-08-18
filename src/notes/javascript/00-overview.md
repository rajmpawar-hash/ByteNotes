# 🗺️ JavaScript — Master Navigation Hub

This is your master navigation hub. Every concept below is covered in a dedicated note. Use this index to easily navigate and understand how all JavaScript concepts connect to each other logically, from the bottom up!

## 📂 Section Index

### ⚙️ 1. Foundations
| Section | Topics |
|:--------|:-------|
| [**01-basics**](/javascript/1-foundations/01-basics/01-execution-context-and-call-stack) | Execution Context, Call Stack, Hoisting, `undefined` vs `not defined` |
| [**02-scope**](/javascript/1-foundations/02-scope/01-scope-chain-and-lexical-environment) | Scope Chain, Lexical Environment, `let`/`const`/TDZ, Block Scope, Shadowing |
| [**03-error-handling**](/javascript/1-foundations/03-error-handling/01-try-catch-finally) | `try`/`catch`/`finally`, Strict Mode |

### 🗃️ 2. Objects and Arrays
| Section | Topics |
|:--------|:-------|
| [**01-objects-and-es6**](/javascript/2-objects-and-arrays/01-objects-and-es6/01-shallow-vs-deep-copy) | Shallow/Deep Copy, Destructuring, Spread/Rest, Optional Chaining |
| [**02-array-methods**](/javascript/2-objects-and-arrays/02-array-methods/01-array-methods) | Array Methods (Mutating vs Non-Mutating, slice vs splice) |
| [**03-loops-and-iteration**](/javascript/2-objects-and-arrays/03-loops-and-iteration/01-loops-and-iteration) | `for...in`, `for...of`, `while`, `break`/`continue` |
| [**04-maps-and-sets**](/javascript/2-objects-and-arrays/04-maps-and-sets/01-maps-and-sets) | `Map`, `Set`, `WeakMap`, `WeakSet` |

### 🧩 3. Functions
| Section | Topics |
|:--------|:-------|
| [**01-functions**](/javascript/3-functions/01-functions/01-first-class-functions) | First-Class Functions, Callbacks, Higher-Order Functions, `map`/`filter`/`reduce` |
| [**02-closures**](/javascript/3-functions/02-closures/01-closures-basics) | Closures Basics, Data Hiding, Module Pattern, Currying, `var` Loop Bug |
| [**03-generators-and-iterators**](/javascript/3-functions/03-generators-and-iterators/01-generators-and-iterators) | `function*`, `yield`, The Iterator Protocol |

### 📦 4. Object-Oriented Programming (OOP)
| Section | Topics |
|:--------|:-------|
| [**01-this-keyword**](/javascript/4-oop/01-this-keyword/00-window-and-this) | Global `this`, Binding Rules, `call`/`apply`/`bind` |
| [**02-prototypes**](/javascript/4-oop/02-prototypes/01-prototypal-inheritance) | Prototype Chain, Prototypal Inheritance, ES6 Classes |
| [**03-type-checking**](/javascript/4-oop/03-type-checking/01-type-checking) | Type Checking, `typeof`, `instanceof`, `Array.isArray` |

### ⏳ 5. Asynchronous JavaScript
| Section | Topics |
|:--------|:-------|
| [**01-intro**](/javascript/5-async/01-intro/01-sync-vs-async) | Synchronous vs Asynchronous, Blocking the Main Thread |
| [**02-async**](/javascript/5-async/02-async/00-async-glossary) | Event Loop, V8 Architecture, Promises, `async`/`await`, Promise APIs |
| [**03-modules**](/javascript/5-async/03-modules/01-esm-vs-commonjs) | ES Modules vs CommonJS, Dynamic Imports |

### 🌐 6. Web APIs
| Section | Topics |
|:--------|:-------|
| [**01-dom-and-browser**](/javascript/6-web-apis/01-dom-and-browser/01-event-delegation) ⚠️ *(Browser-specific)* | Event Delegation, Debounce/Throttle, Storage & Cookies |

### 🎓 7. Interview Prep
| Section | Topics |
|:--------|:-------|
| [**01-interview-patterns**](/javascript/7-interview/01-interview-patterns/01-currying-partial-application) | Currying, Polyfills, Type Coercion, Event Loop Output Questions, Memoization |
| [**02-memory-leaks**](/javascript/7-interview/02-memory-leaks/01-memory-leaks) | Garbage Collection, Mark & Sweep, 4 Common Memory Leaks |

> **💡 Note:** Section `01-dom-and-browser` in the Web APIs tier is specifically for browser-based JavaScript. If you only work with Node.js, feel free to skip it entirely — all other sections are runtime-agnostic!