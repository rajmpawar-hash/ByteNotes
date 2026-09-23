# 🚀 JavaScript Ultimate Revision Cheat Sheet

> [!NOTE]
> This is a comprehensive, deep-dive revision guide. It contains all critical interview concepts, 30-second pitches, and gotchas extracted from the entire JavaScript module. Use this to blindly trust your revision before interviews.

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
> - [01-execution-context-and-call-stack](/javascript/1-foundations/01-basics/01-execution-context-and-call-stack): Restaurant Kitchen • two strict phases • Phase 1: The Setup (Memory Creation): • Phase 2: The Cooking (Code Execution): • Global Execution Context (GEC) • No code is actually run yet! • Gotcha: What about `let` and `const`? • function invocation • Local Execution Context • Memory Phase: • Code Phase: • completely destroyed and deleted from memory • Stack of Plates • Global Execution Context • popped • fixed physical size limit • Stack Overflow • recursive functions • Q: What is the difference between Execution Context and Scope? • Example to make it click: • var square2 • 2 * 2 • square2

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
> - [02-hoisting](/javascript/1-foundations/01-basics/02-hoisting): Phase 1 (Compilation / Memory Creation) • not initialized • What is the Temporal Dead Zone (TDZ)? • entirely • Gotcha: Function Expressions are variables! • function () {}

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
> - [03-undefined-vs-not-defined](/javascript/1-foundations/01-basics/03-undefined-vs-not-defined): two completely different things • Why is it bad? • third state • exists • Interview Tip: • x is not defined • Cannot access 'a' before initialization • typeof undeclaredVar

### 1.4 Data Types & Coercion
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
> - [04-data-types-and-coercion](/javascript/1-foundations/01-basics/04-data-types-and-coercion): They are completely immutable. • They are mutable. • guaranteed unique property keys • Symbol vs Symbol.for() • Type Conversion • Gotcha: The `+` vs `-` Operator • Why does this happen? • Symbol() • Symbol.for()

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
> - [01-scope-chain-and-lexical-environment](/javascript/1-foundations/02-scope/01-scope-chain-and-lexical-environment): Reference to the Lexical Environment of its Parent • "relating to the text/source code" • physically written • exactly the same way • how many scopes • Key Insight: • more links • Q: What is the Lexical Environment made of? • Q: How does the Scope Chain stop? • c() • x = 10 • x = 100 • { }

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
> - [02-let-const-temporal-dead-zone](/javascript/1-foundations/02-scope/02-let-const-temporal-dead-zone): separate memory space • Required immediately • Pro Tip: • Q: What is the Temporal Dead Zone (TDZ)?
> - [03-block-scope-and-shadowing](/javascript/1-foundations/02-scope/03-block-scope-and-shadowing): shadows • JavaScript Compilation Phase • Q: What is Illegal Shadowing? • Q: Can you shadow a `var` with a `let`? • { ... }

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
> - [01-try-catch-finally](/javascript/1-foundations/03-error-handling/01-try-catch-finally): Is the `catch` block mandatory? • Why do this? • Gotcha: Synchronous Only! • 1. Using `.catch()` on a Promise: • 2. Using `try...catch` inside an `async` function: • Q: When is the `finally` block executed? • try...catch...finally • try...finally • RangeError • URIError • Field: ${error.field}, Error: ${error.message} • try...catch • .catch() • throw new Error("message")
> - [02-strict-mode](/javascript/1-foundations/03-error-handling/02-strict-mode): restricted variant of JavaScript • Note: • What happens without strict mode? • Why is this beneficial? • very top • sum(1, 2, 3) • this.name = "John" • TypeError: Cannot set properties of undefined • this = undefined

### 1.8 Control Flow (`switch` & Ternary)
> [!WARNING]
> **Gotcha: `switch` Fall-through**
> If you forget to add `break;` inside a `case`, JS will "fall through" and execute EVERY subsequent case block below it!

```javascript
// Ternary Operator
const status = age >= 18 ? "Adult" : "Minor";
```

> **Micro-Concepts & Edge Cases:**
> - [05-operators-and-control-flow](/javascript/1-foundations/01-basics/05-operators-and-control-flow): Unary (1 operand): • Binary (2 operands): • Ternary (3 operands): • Operator Precedence (The Order of Operations) • Gotcha: The Missing `break` (Fall-through) • if...else • ++a • a-- • !true • typeof "hello" • a + b • a === b • a && b • condition ? exprIfTrue : exprIfFalse • a++ • * / • + - • < > • if / else if / else • if/else

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
> - [06-template-literals-and-strings](/javascript/1-foundations/01-basics/06-template-literals-and-strings): ${expression} • The sum of a and b is ${a + b}. • User status: ${isPremium ? 'Pro' : 'Free'}

### 1.10 Illegal Shadowing
You can safely shadow a `var` with a `let`, but you **cannot** shadow a `let` with a `var` in the same block (SyntaxError: Identifier has already been declared).

### 1.11 `==` vs `===`
- **`==` (Loose equality)**: Performs implicit type coercion (e.g., `1 == '1'` is `true`).
- **`===` (Strict equality)**: Checks both value AND type. No coercion (e.g., `1 === '1'` is `false`).

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
> - [01-shallow-vs-deep-copy](/javascript/2-objects-and-arrays/01-objects-and-es6/01-shallow-vs-deep-copy): primitive types • reference types • pointer • new object • Limitations: • Advantages over JSON method: • Q: How does `structuredClone()` differ from `JSON.parse(JSON.stringify())`? • JSON.parse(JSON.stringify()) • RegExp • structuredClone() • ArrayBuffer • Object.assign • _.cloneDeep

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
> - [02-destructuring-spread-rest](/javascript/2-objects-and-arrays/01-objects-and-es6/02-destructuring-spread-rest): everywhere • expands • collects • receiving • Rule: • last • Purpose • const [first, ...middle, last] • Math.max(...arr)

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
> - [03-optional-chaining-nullish](/javascript/2-objects-and-arrays/01-objects-and-es6/03-optional-chaining-nullish): short-circuits • \|\|

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
> - [01-array-methods](/javascript/2-objects-and-arrays/02-array-methods/01-array-methods): does not return anything • Gotchas of `forEach()` • does not mutate • What is an Array-Like Object? • How to convert an Array-Like Object to a real Array: • splice • sort • forEach() • push() • pop() • concat() • shift() • unshift() • slice() • splice() • flat() • reverse() • join() • fill() • sort() • filter() • reduce() • splice(start, deleteCount, ...items) • arr.map().forEach().filter() • obj[0] • length • NodeList • document.querySelectorAll • Array.from(arrayLike) • [...arrayLike] • Array.prototype.slice.call(arrayLike)
> - [01-loops-and-iteration](/javascript/2-objects-and-arrays/03-loops-and-iteration/01-loops-and-iteration): enumerable properties • Mnemonic: • indexes as strings • not iterable • `break` • `continue` • Why does it work? • However, `const` FAILS in a standard `for` loop: • Why? • Q: What is the main difference between `for...in` and `for...of`? • "0" • Object.values(user) • Object.entries(user) • do...while • Array.prototype

### 2.5 Maps & Sets
- **`Set`**: Collection of strictly unique values.
- **`Map`**: Key-value store where keys can be ANY type (objects, functions), unlike normal objects where keys are strings.

```javascript
const unique = [...new Set([1, 1, 2, 3])]; // [1, 2, 3]

const cache = new Map();
cache.set({ query: "users" }, [1, 2, 3]); // Object as a key!
```

> **Micro-Concepts & Edge Cases:**
> - [01-maps-and-sets](/javascript/2-objects-and-arrays/04-maps-and-sets/01-maps-and-sets): Map allows keys of any type • Key Types • Size • each value may occur only once • only accept Objects as keys/values • weak references • Q: Why would you use a `WeakMap`? • Q: What is the time complexity of searching a Set? • map.size • Object.keys(obj).length • .size • const unique = [...new Set(myArray)]; • Set.has(value) • O(1) • Array.includes(value) • O(n)

### 2.6 Advanced Object Methods & Getters/Setters
- **`Object.freeze(obj)`**: Locks object completely (no add/delete/change).
- **`Object.seal(obj)`**: Prevents add/delete, but ALLOWS changing existing properties.
- **`Object.keys/values/entries`**: Returns arrays of keys, values, or key-value pairs.

```javascript
const user = { 
    firstName: "Raj",
    get name() { return this.firstName; },
    set name(val) { this.firstName = val; }
};
Object.seal(user);
user.firstName = "Pawar"; // ✅ Allowed in seal
delete user.firstName; // ❌ Ignored/Throws in strict
```

> **Micro-Concepts & Edge Cases:**
> - [05-advanced-object-methods](/javascript/2-objects-and-arrays/01-objects-and-es6/05-advanced-object-methods): completely immutable • partially immutable • CAN modify existing properties! • Syntax: • handler • Why use Reflect? • Object.freeze() • Object.seal() • Object.defineProperty() • hasOwnProperty() • new Proxy(target, handler) • deleteProperty • Reflect.get() • Reflect.set() • [LOG]: Accessing ${prop}

### 2.7 String Methods (slice vs substring)
- **`slice(start, end)`**: Extracts a section. Supports negative indices (counts from end).
- **`substring(start, end)`**: Similar to slice, but treats negative indices as `0`.

```javascript
const str = "JavaScript";
console.log(str.slice(-6)); // "Script"
console.log(str.substring(-6)); // "JavaScript" (Negative becomes 0)
```

### 2.8 Symbols
A primitive type used to create unique, hidden identifiers for object properties. They do not show up in `Object.keys()`.
```javascript
const id = Symbol('id');
const user = { [id]: 1234, name: "Raj" }; 
```

### 2.9 Proxy & Reflect
ES6 Metaprogramming. `Proxy` intercepts fundamental object operations (like `get` and `set`).
```javascript
const p = new Proxy({}, {
    get: (target, prop) => prop in target ? target[prop] : "Not Found"
});
```

### 2.10 WeakMap & WeakSet
Similar to Map/Set, but **keys MUST be objects**. They hold "weak" references, meaning if the key object is removed from the DOM or set to null, it is automatically Garbage Collected (prevents memory leaks!).

---

## 🧠 3. Functions & Closures

### 3.1 First-Class & Higher-Order Functions
- **First-Class Functions**: In JS, functions are treated as variables (they can be assigned, passed as arguments, or returned).
- **Higher-Order Function (HOF)**: A function that accepts another function as an argument (callback) OR returns a function.
A function that accepts another function as an argument (callback) OR returns a function.

```javascript
// 'map' is a HOF. The arrow function is the Callback.
const doubled = [1, 2, 3].map(n => n * 2);
```

> **Micro-Concepts & Edge Cases:**
> - [01-first-class-functions](/javascript/3-functions/01-functions/01-first-class-functions): Assigned to a variable: • Passed as an argument (Callback): • Returned from a function: • Callback Function: • Higher-Order Function: • Pure Function: • Impure Function: • Q: Difference between Function Declaration and Function Expression? • Q: What is a Pure Function? • useMemo
> - [02-callback-functions](/javascript/3-functions/01-functions/02-callback-functions): Callback Function • 💡 Note on Asynchronous Callbacks: • processUserInput • processUserInput(greet)
> - [03-higher-order-functions](/javascript/3-functions/01-functions/03-higher-order-functions): DRY (Don't Repeat Yourself) • Q: What defines a Higher-Order Function (HOF)? • Q: Why use HOFs? • What about `map`, `filter`, and `reduce`? • calculate • Array.prototype.map

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
> - [01-closures-basics](/javascript/3-functions/02-closures/01-closures-basics): entire scope chain • Key Detail: • entire lexical environment • Q: Define a Closure in one sentence. • Q: Do closures capture values or references?
> - [02-closures-in-action](/javascript/3-functions/02-closures/02-closures-in-action): Gotcha: Memory Leaks • React Hooks • sequence of nested functions • You expect: • It actually prints: • Q: How can closures be used to create private variables? • Q: How does React use Closures? • account = null; • useState • useEffect • 4, 4, 4

### 3.3 Currying & Partial Application
Transforming a function that takes multiple arguments into a sequence of functions that take one argument each.

```javascript
const multiply = (a) => (b) => (c) => a * b * c;
console.log(multiply(2)(3)(4)); // 24
```

> **Micro-Concepts & Edge Cases:**
> - [04-currying](/javascript/3-functions/01-functions/04-currying): Reusability: • Avoiding Redundancy: • The Key Concept: • termination condition • Q: What is the difference between Partial Application and Currying? • f(a, b, c) • f(a)(b)(c) • [${level.toUpperCase()}]: ${message}
> - [01-currying-partial-application](/javascript/7-interview/01-interview-patterns/01-currying-partial-application): specialized functions • some • Arguments per call • Chain length • [${level}] [${component}]: ${message} • ${greeting}, ${name}! • f(a, b)(c) • sum(1)(2)(3)...() • add(1,2)(3)(4,5,6)()

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
> - [01-generators-and-iterators](/javascript/3-functions/03-generators-and-iterators/01-generators-and-iterators): Iterator Protocol • this is exactly how `for...of` loops work under the hood! • Real World Use Case: • Redux Saga • Q: What does an Iterator's `next()` method return? • Q: Can you use a `for...of` loop on a Generator? • { value: 1, done: false } • done • The sum is ${x + y}

### 3.5 IIFE (Immediately Invoked Function Expression)
Functions that run the moment they are defined. Before ES6 `let/const`, IIFEs were the primary way to create private data and avoid polluting the global namespace.

```javascript
(function() {
    var privateData = "Secret";
    console.log("Ran immediately!");
})();
// console.log(privateData); // ❌ ReferenceError
```

### 3.6 Memoization
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
> - [05-memoization](/javascript/7-interview/01-interview-patterns/05-memoization): multiple times • API Responses • DOM Queries • Complex Calculations • React Components • Recursive Algorithms • Memory trade-off: • Only works for pure functions: • Cache invalidation: • cache function results • Dynamic Programming • fib(3) • fib(2) • querySelector • React.memo() • useMemo() • useCallback() • JSON.stringify(args)

### 3.7 Pure vs Impure Functions
- **Pure Function**: Always returns the same output for the same input. Has NO side effects (mutates nothing outside its scope).
- **Impure Function**: Relies on or modifies external state (e.g., `Math.random()`, API calls, DOM updates).

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
> - [00-window-and-this](/javascript/4-oop/01-this-keyword/00-window-and-this): Cross-platform tip: • Q: Does every JS file have a `window` object? • Q: Do `let` and `const` attach to the global object? • globalThis • globalThis === window • globalThis === global
> - [01-this-rules](/javascript/4-oop/01-this-keyword/01-this-rules): `this` depends on HOW and WHERE a function is called • master key • global object • method of an object • brand new empty object • Key Rule: • Memory trick: • NEID • fn() • obj.fn() • fn.call(obj) • fn.apply(obj) • fn.bind(obj) • new Fn() • () => {}

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
> - [02-call-apply-bind](/javascript/4-oop/01-this-keyword/02-call-apply-bind): every function • explicitly set • one by one • identical • Memory Trick: • brand new function • very common interview question • apply() • ${this.name} from ${city}, ${country} • greet.call(user, ...) • this = user • "Mumbai" • "India" • fn.call(this, a, b, c) • fn.apply(this, [a, b, c]) • fn.bind(this, a, b)

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
> - [01-prototypal-inheritance](/javascript/4-oop/02-prototypes/01-prototypal-inheritance): most confusing • link • Q: What is the Prototype Chain? • Object.create() • Object.create(proto) • Object.prototype.__proto__
> - [02-classes-and-oop](/javascript/4-oop/02-prototypes/02-classes-and-oop): Gotcha: Classes vs Constructor Functions • Method Overriding: • Method Overloading: • JavaScript does NOT support traditional method overloading. • Q: Are ES6 Classes just syntactic sugar over Prototypal Inheritance? • Q: Does JavaScript support multiple inheritance? • extends • Hi, I'm ${this.name} and I'm ${this.age} • function User() {} • super • Dog.speak() • Object.assign()

### 4.4 Type Checking (`typeof` vs `instanceof`)
- **`typeof`**: Checks primitives.
- **`instanceof`**: Checks if a constructor is in an object's prototype chain.

> [!WARNING]
> **Gotcha: The `instanceof` Iframe Bug**
> `instanceof Array` fails if the array comes from a different window/iframe because each iframe has its own isolated global environment and constructors! Always use `Array.isArray(arr)`.

```javascript
console.log(typeof null); // "object" (Legacy bug)
console.log([] instanceof Array); // true (Usually)
console.log(Array.isArray([])); // ✅ Best practice
```

> **Micro-Concepts & Edge Cases:**
> - [01-type-checking](/javascript/4-oop/03-type-checking/01-type-checking): multiple windows or iframes • Analogy: • Always use `Number.isNaN()` for strict checking. • arr instanceof Array • Array.isArray() • typeof [] • isNaN("hello") • Number.isNaN("hello") • [[Class]] • Object.prototype.toString.call()

### 4.5 Checking for `NaN`
> [!WARNING]
> **Gotcha: `isNaN()` vs `Number.isNaN()`**
> The global `isNaN("text")` returns `true` because it forcefully coerces the string to a number first. Always use `Number.isNaN("text")` which correctly returns `false`!

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
> - [01-sync-vs-async](/javascript/5-async/01-intro/01-sync-vs-async): Single Thread • one barista • cannot run • C++ APIs
> - [00-async-glossary](/javascript/5-async/02-async/00-async-glossary): 1. Synchronous Code • 2. Asynchronous Code (Async) • 3. The Call Stack • one thing at a time • 4. Web APIs (Browser APIs) • 5. Callback Queue (Task Queue / Macrotask Queue) • 6. Microtask Queue (VIP Queue) • 7. The Event Loop • 8. Promise • 9. Async/Await • .then() • MutationObserver
> - [01-event-loop](/javascript/5-async/02-async/01-event-loop): synchronous, single-threaded language • Restaurant Analogy • The Waiter (Call Stack): • The Kitchen (Web APIs): • The Delivery Counter (Callback Queue / Macrotask Queue): • The VIP Window (Microtask Queue): • The Maître D' (The Event Loop): • Waiter takes order: • Waiter passes order to kitchen: • Waiter takes next order: • Kitchen cooks in background: • Food placed on counter: • Maître D' checks: • Waiter serves food: • absolute priority • Mutation Observers • UI Events • Network Callbacks • The Starvation Problem: • Run ALL synchronous code • Drain the ENTIRE Microtask Queue • Execute EXACTLY ONE Macrotask • Repeat Step 2 • Repeat Step 3 • The Answer: • Multi-Threaded • Web APIs (written in C++ by the browser) • zero computation • timerCallback • .finally() • 06-execution-walkthroughs.md • setTimeout()
> - [06-execution-walkthroughs](/javascript/5-async/02-async/06-execution-walkthroughs): `t = 0` (Code begins executing) • `t = 0` (Next line) • Web APIs (Kitchen) • `t = 2000ms` (Timer finishes) • Callback Queue (Delivery Counter) • `t = 2001ms` (Event Loop triggers) • Event Loop checks: • `t = 0` (Synchronous Execution) • Output: `1` • Callback Queue (Macrotask) • Microtask Queue (VIP Window) • Output: `4` • `t = 1` (Event Loop kicks in) • Output: `3` • `t = 2` (Macrotasks run) • Output: `2` • Final Output: • Step 1: Synchronous Phase • Callback Queue • Output: `"Sync Code"` • Step 2: Drain the Microtasks • Output: `"Microtask 1"` • Step 3: Run ONE Macrotask • Output: `"Macrotask 1"` • Step 4: Drain Microtasks Again • Output: `"Microtask inside Macro"` • Step 5: Run Next Macrotask • Output: `"Macrotask inside Micro"` • "Start" • setTimeout(...) • "End" • t = 2000ms • t = 2001ms • "Timer done" • t = 1 • t = 2 • Promise.then • "Sync Code" • "Microtask 1" • "Macrotask 1" • "Microtask inside Macro" • "Macrotask inside Micro"
> - [04-event-loop-output-questions](/javascript/7-interview/01-interview-patterns/04-event-loop-output-questions): most popular interview questions • Synchronous code always runs first • Microtasks drain completely • One Macrotask at a time • before the next macrotask • "Promise 1" • "Timeout 1" • "Promise inside Timeout" • "Timeout inside Promise" • "script start" • foo() • "foo start" • await bar() • bar() • "bar" • foo • "script end" • "foo end" • setTimeout("2") • setTimeout("6") • "8" • setTimeout("4") • .then("5") • "5" • "6" • Promise("7") • "7" • queueMicrotask

### 5.2 JS Engine Architecture (JIT)
V8 uses **Just-In-Time (JIT) Compilation**:
1. **Ignition (Interpreter)**: Runs code immediately line-by-line for fast startup.
2. **TurboFan (Compiler)**: Takes "hot" (frequently run) code from Ignition and optimizes it into highly efficient machine code in the background.

> **Micro-Concepts & Edge Cases:**
> - [02-js-engine-architecture](/javascript/5-async/02-async/02-js-engine-architecture): JS Plain Code: • Tokenization (Lexical Analysis): • Parsing: • AST (Abstract Syntax Tree): • Profiler • deoptimizes • Memory Heap: • Call Stack: • Mark and Sweep • x + y

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
> - [03-promises](/javascript/5-async/02-async/03-promises): Callback Hell • Inversion of Control • placeholder • Crucial Rule: • The Golden Rule of `.then()`: • always returns a brand new Promise • Q: What are the three states of a Promise? • Promise.resolve(20)
> - [04-async-await](/javascript/5-async/02-async/04-async-await): NO! • Using `.then()` chains: • Rewritten with `async/await`: • /api/posts/${user.id}

### 5.4 Promise Combinators
- **`Promise.all`**: Resolves when ALL resolve. Fails completely if ONE rejects (Fail-fast).
- **`Promise.allSettled`**: Waits for all to finish, regardless of success or failure. Never rejects.
- **`Promise.race`**: Returns the very first one to settle (success or failure).
- **`Promise.any`**: Returns the first to resolve. Rejects only if ALL reject (AggregateError).

> **Micro-Concepts & Edge Cases:**
> - [04-promise-apis](/javascript/5-async/02-async/04-promise-apis): Success: • Failure: • "All or Nothing!" • Result: • FIRST SUCCESS • Promise.all([p1, p2, p3]) • [val1, val2, val3] • Promise.allSettled([p1, p2, p3]) • Promise.race([p1, p2, p3]) • Promise.any([p1, p2, p3]) • "All promises were rejected" • Promise.all() • Promise.any() • Promise.race()
> - [02-promise-polyfills](/javascript/8-machine-coding/02-promise-polyfills): only if ALL promises resolve • even one • results[index] = value • results.push(value) • results[index] • Promise.allSettled() • Promise.prototype.finally()

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
> - [01-esm-vs-commonjs](/javascript/5-async/03-modules/01-esm-vs-commonjs): CommonJS (CJS) • ES Modules (ESM) • Synchronous Loading: • Dynamic: • Environment: • official standard • Asynchronous Loading: • Static: • top level • Strict Mode: • Dynamic Imports • Loading • Native Support • module.exports = { ... } • exports.myFunc = ... • const module = require('./module.js') • require() • export const func = ... • export default ... • import { func } from './module.js' • <script type="module"> • import()
> - [02-es6-modules-syntax](/javascript/5-async/03-modules/02-es6-modules-syntax): private scope • must use the exact same names • do not use curly braces • utils.js • app.js • Q: What is the difference between ES6 Modules and CommonJS? • Q: Can you conditionally `import` a module? • import { add as sum } from './math.js'; • * as • import/export • require()/module.exports • import('./module.js').then(...)

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
> - [07-fetch-api-and-concurrency](/javascript/5-async/02-async/07-fetch-api-and-concurrency): concurrency • Non-Blocking I/O • What just happened? • It always returns a Promise • Gotcha: `fetch()` only rejects on network failure! • It won't! • Q: How does JavaScript achieve concurrency if it's single-threaded? • task1 • task2 • HTTP error! status: ${response.status} • options

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
> - [01-event-delegation](/javascript/6-web-apis/01-dom-and-browser/01-event-delegation): browser-specific • event propagation • bubbles up • every single child • single listener • Dynamic elements • Less memory • 💡 Skip Note for Node.js: • <div> • <body> • { capture: true } • event.stopPropagation()
> - [04-dom-and-events](/javascript/6-web-apis/01-dom-and-browser/04-dom-and-events): Event Bubbling • Event Capturing • `event.preventDefault()` • Capturing Phase: • Target Phase: • Bubbling Phase: • Gotcha: Stopping the Flow • Performance: • Dynamic Elements: • Q: What is Event Delegation? • Q: Difference between `event.target` and `event.currentTarget`? • event.preventDefault() • <a> • event.target • <li> • event.currentTarget

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
> - [02-debounce-and-throttle](/javascript/6-web-apis/01-dom-and-browser/02-debounce-and-throttle): Debouncing • Throttling • after the user has STOPPED performing an action • at most once • When it fires • at most • Guarantees execution? • Best for • If user keeps acting • Gotcha: Both rely on Closures! • inThrottle

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
> - [05-dom-performance-and-apis](/javascript/6-web-apis/01-dom-and-browser/05-dom-performance-and-apis): Drag and Drop API • Dragging Events: • Drop Zone Events: • Q: Why is `DocumentFragment` faster than appending directly? • Item ${i} • draggable="true" • dragstart • drag • dragend • dragover • e.preventDefault() • dragenter • dragleave • drop

### 6.4 Event Flow (Capturing vs Bubbling)
Events travel in three phases:
1. **Capture Phase**: Down from `window` to the target.
2. **Target Phase**: Reaches the clicked element.
3. **Bubble Phase**: Bubbles back up to `window`.

> [!WARNING]
> **Gotcha: Stopping the Event**
> Use `e.stopPropagation()` to prevent an event from bubbling up and triggering parent listeners.

### 6.5 Web Storage (Local, Session, Cookies)
- **`localStorage`**: Persists indefinitely (until manually cleared).
- **`sessionStorage`**: Cleared the moment the browser tab is closed.
- **Cookies**: Sent automatically with every HTTP request. Small (4KB limit).

```javascript
localStorage.setItem("theme", "dark");
console.log(sessionStorage.getItem("cart"));
document.cookie = "token=123; Secure; HttpOnly";
```

> **Micro-Concepts & Edge Cases:**
> - [03-storage-cookies](/javascript/6-web-apis/01-dom-and-browser/03-storage-cookies): persists forever • Capacity: • Scope: • Access: • Sent with requests? • tab or window is closed • authentication • tracking • automatically sent with every HTTP request • Capacity • Lifetime • Sent to server? • Never store sensitive data • path • domain • Max-Age • Expires

### 6.6 The Danger of `eval()`
`eval()` executes a string of JavaScript code. NEVER use it, especially with user input, as it opens your app to severe XSS vulnerabilities.

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
> - [01-memory-leaks](/javascript/7-interview/02-memory-leaks/01-memory-leaks): Garbage Collection (GC) • Roots: • Mark: • Sweep: • Fix: • 'use strict'; • clearInterval() • buttonRef = null
> - [03-advanced-machine-coding](/javascript/8-machine-coding/03-advanced-machine-coding): Maplimit • Parallel Limit • ${prefix}${key}. • ${prefix}${key} • Failed. Retrying... (${retries - 1} left)

### 7.2 Web Security (XSS vs CSRF)
- **XSS (Cross-Site Scripting)**: Malicious JS injected into UI. 
  - *Fix*: Sanitize user input. Never blindly trust `innerHTML`.
- **CSRF (Cross-Site Request Forgery)**: Tricking browser into executing actions on a trusted site using stored cookies.
  - *Fix*: Use Anti-CSRF tokens and SameSite cookie attributes.

> **Micro-Concepts & Edge Cases:**
> - [01-security-and-performance](/javascript/7-interview/03-security-and-performance/01-security-and-performance): Never use `eval()` on untrusted input! • How to prevent it: • Never trust user input: • Sanitize Data: • Use Text Methods: • Client-Side (HTML5): • Client-Side (JavaScript/React): • Server-Side (Critical): • You must always validate again on the server! • Minimize DOM Manipulation: • Use Async Operations: • Debounce & Throttle: • Lazy Loading: • Minification & Bundling: • Browser Storage: • Q: Why is `eval()` considered bad practice? • Q: How do you prevent XSS attacks? • DOMPurify • element.textContent • element.innerHTML

### 7.3 Truthy vs Falsy Values
- **Falsy Values**: `0`, `""`, `null`, `undefined`, `NaN`, `false`. 
- **Truthy Values**: EVERYTHING else (including empty arrays `[]` and empty objects `{}`).

```javascript
if ([]) console.log("Empty array is truthy!"); // Prints
if (0) console.log("0 is falsy"); // Does not print
```

> **Micro-Concepts & Edge Cases:**
> - [03-type-coercion-truthy-falsy](/javascript/7-interview/01-interview-patterns/03-type-coercion-truthy-falsy): loosely typed • Best Practice: • Everything else is truthy! • null == undefined • value === null • Array.isArray(value) • Number() • String() • Boolean() • "string" • "true" • "boolean" • "false" • "null" • "[object Object]" • function(){} • "function(){}" • "function"

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
> - [02-polyfills](/javascript/7-interview/01-interview-patterns/02-polyfills): most commonly asked • how built-in methods work internally • first failure • Array.prototype.map() • Array.prototype.filter() • Array.prototype.reduce() • Function.prototype.bind() • ${greeting}, ${this.name}${punctuation} • Array.prototype.flat()
> - [01-array-and-function-polyfills](/javascript/8-machine-coding/01-array-and-function-polyfills): initialValue • Array.prototype.forEach() • find() • Function.prototype.call() • ${this.name} is ${age} • Function.prototype.apply()

---