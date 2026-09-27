# 🍛 Currying & Partial Application

> [!TIP]
> **The 30-Second Interview Pitch**
> **Currying** is an advanced functional programming technique where a function with multiple arguments is transformed into a sequence of nested functions, each taking a single argument (e.g., `f(a, b, c)` becomes `f(a)(b)(c)`). It utilizes **closures** to remember the arguments passed in previous calls. **Partial application** is similar, but it pre-fills *some* arguments and returns a function that takes the rest.

## 1. What is Currying?

In JavaScript, currying is achieved by returning a function from a function. The inner functions maintain access to the outer function's scope via closures.

### Standard Function vs Curried Function

```javascript
// Standard Function
function add(a, b, c) {
    return a + b + c;
}
console.log(add(2, 3, 4)); // 9

// Curried Version
function curriedAdd(a) {
    return function(b) {
        return function(c) {
            return a + b + c;
        };
    };
}

console.log(curriedAdd(2)(3)(4)); // 9
```

### Why use Currying?
Currying lets you create **specialized functions** from generic ones:

```javascript
// Generic logger
function log(level) {
    return function(component) {
        return function(message) {
            console.log(`[${level}] [${component}]: ${message}`);
        };
    };
}

// Create specialized loggers
const errorLog = log("ERROR");
const errorAuth = errorLog("Auth");
const errorDB = errorLog("Database");

errorAuth("Login failed");   // [ERROR] [Auth]: Login failed
errorDB("Connection lost");  // [ERROR] [Database]: Connection lost
```

---

## 2. Generic Curry Utility

*"Write a function that converts any regular function into a curried version."*

```javascript
function curry(fn) {
    return function curried(...args) {
        // If we have enough arguments, call the original function
        if (args.length >= fn.length) {
            return fn.apply(this, args);
        }
        // Otherwise, return a function that waits for more arguments
        return function(...nextArgs) {
            return curried.apply(this, [...args, ...nextArgs]);
        };
    };
}

// Usage:
function multiply(a, b, c) {
    return a * b * c;
}

const curriedMultiply = curry(multiply);

curriedMultiply(2)(3)(4);    // 24
curriedMultiply(2, 3)(4);    // 24 — partial application also works!
curriedMultiply(2)(3, 4);    // 24
curriedMultiply(2, 3, 4);    // 24
```

```mermaid
flowchart TD
    A["curry(multiply)"] --> B["args.length >= fn.length?"]
    B -->|Yes (3 args)| C["Call multiply(a, b, c)"]
    B -->|No (< 3 args)| D["Return new function waiting for more"]
    D --> B
```

---

## 3. Infinite Currying

Infinite currying is a common machine-coding interview question. The goal is to create a curried function that can be chained an arbitrary number of times, and only calculates the total when invoked with no arguments (or a specific terminating condition).

> [!IMPORTANT]
> **The Key Concept:** The inner function must return *itself* to allow continuous chaining. We use a **termination condition** (like `undefined` arguments) to break the chain and return the accumulated result.

### Implementation:

```javascript
function sum(a) {
    let total = a;

    function inner(b) {
        // Termination condition: If no argument is passed
        if (b === undefined) {
            return total;
        }
        total += b;
        return inner; // Return the function itself for the next call!
    }

    return inner; 
}

console.log(sum(1)(2)(3)(4)()); // Output: 10
console.log(sum(10)(20)());     // Output: 30
```

### ES6 Arrow Function Variant (One-Liner):
```javascript
const sumES6 = a => b => b !== undefined ? sumES6(a + b) : a;

console.log(sumES6(1)(2)(3)(4)()); // 10
```

---

## 4. Partial Application vs Currying

Partial application is related but different: you fix (pre-fill) **some** arguments and return a function that takes the rest. With currying, each function takes exactly one argument; with partial application, a function can take any number.

```javascript
// Using bind for partial application
function greet(greeting, name) {
    return `${greeting}, ${name}!`;
}

const sayHello = greet.bind(null, "Hello");
sayHello("Raj");    // "Hello, Raj!"
sayHello("Alice");  // "Hello, Alice!"
```

| | Currying | Partial Application |
|:---|:---|:---|
| **Arguments per call** | Exactly 1 | Any number |
| **Chain length** | Always N calls (for N args) | Fewer calls (some args pre-filled) |
| **Example** | `f(a)(b)(c)` | `f(a, b)(c)` |
| **Creates** | Chain of unary functions | A new function with fewer params |

---

## 🎯 Common Interview Questions

**Q: What is the difference between Partial Application and Currying?**
- **A:** Currying transforms a function into a sequence of functions that each take exactly *one* argument. Partial application binds *some* (one or more) arguments of a function ahead of time, returning a function that takes the remaining arguments.

**Q: How does infinite currying avoid a maximum call stack error?**
- **A:** It doesn't use standard recursive execution where functions wait for each other. Instead, each call returns the inner function immediately, yielding control back to the caller. The call stack clears between each set of parentheses!
