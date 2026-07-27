# 🗺️ JavaScript — The Complete Mind Map

This is your master navigation hub. Every concept below is covered in a dedicated note. Use this map to understand how all JavaScript concepts connect to each other!

```mermaid
mindmap
  root((JavaScript))
    Engine & Runtime
      Execution Context
        Memory Phase
        Code Phase
      Call Stack
        LIFO
        Push & Pop
      V8 Architecture
        Ignition Interpreter
        TurboFan Compiler
        JIT Compilation
      Garbage Collection
        Mark and Sweep
    Variables & Scope
      var / let / const
        Hoisting
        Temporal Dead Zone
      Scope
        Global Scope
        Function Scope
        Block Scope
      Scope Chain
        Lexical Environment
      Shadowing
        Illegal Shadowing
      undefined vs not defined
      window & this
    Functions
      First Class Functions
        Function Statement
        Function Expression
      Anonymous Functions
      Arrow Functions
      Callback Functions
        Callback Hell
        Inversion of Control
      Higher Order Functions
        map / filter / reduce
    Closures
      Lexical Scope + Function
      Data Hiding
      Module Pattern
      Currying
    this Keyword
      Default Binding
      Implicit Binding
      Explicit Binding
        call
        apply
        bind
      new Binding
      Arrow Function this
    Prototypes & OOP
      Prototype Chain
      Prototypal Inheritance
      ES6 Classes
        constructor
        extends
        super
    Objects & ES6+
      Shallow vs Deep Copy
      Destructuring
      Spread & Rest
      Optional Chaining
      Nullish Coalescing
    Async JavaScript
      Event Loop
        Call Stack
        Web APIs
        Callback Queue
        Microtask Queue
      Promises
        States pending/fulfilled/rejected
        Chaining
      async / await
        try...catch
      Promise APIs
        Promise.all
        Promise.allSettled
        Promise.race
        Promise.any
    DOM & Browser
      Event Delegation
        Bubbling
        Capturing
      Debounce & Throttle
      Storage
        localStorage
        sessionStorage
        Cookies
    Interview Patterns
      Polyfills
      Type Coercion
      Truthy & Falsy
      Memoization
      Output Questions
    Error Handling
      try / catch / finally
      Strict Mode
```

---

## 📂 Section Index

| # | Section | Topics | Notes |
|:--|:--------|:-------|:------|
| 01 | **Basics** | Execution Context, Call Stack, Hoisting, `window` & `this`, `undefined` vs `not defined` | Universal |
| 02 | **Scope** | Scope Chain, Lexical Environment, `let`/`const`/TDZ, Block Scope, Shadowing | Universal |
| 03 | **Closures** | Closures Basics, Data Hiding, Module Pattern, Currying, `var` Loop Bug | Universal |
| 04 | **Functions** | First-Class Functions, Callbacks, Higher-Order Functions, `map`/`filter`/`reduce` | Universal |
| 05 | **Async** | Event Loop, V8 Architecture, Promises, `async`/`await`, Promise APIs | Universal |
| 06 | **`this` Keyword** | Binding Rules, `call`/`apply`/`bind` | Universal |
| 07 | **Prototypes** | Prototype Chain, Prototypal Inheritance, ES6 Classes | Universal |
| 08 | **Objects & ES6+** | Shallow/Deep Copy, Destructuring, Spread/Rest, Optional Chaining | Universal |
| 09 | **DOM & Browser** | Event Delegation, Debounce/Throttle, Storage & Cookies | ⚠️ Browser-specific (skip if Node.js only) |
| 10 | **Interview Patterns** | Currying, Polyfills, Type Coercion, Event Loop Output Questions, Memoization | Universal |
| 11 | **Error Handling** | `try`/`catch`/`finally`, Strict Mode | Universal |

> **💡 Note:** Section 09 (DOM & Browser) is specifically for browser-based JavaScript. If you only work with Node.js, feel free to skip it entirely — all other sections are runtime-agnostic!
