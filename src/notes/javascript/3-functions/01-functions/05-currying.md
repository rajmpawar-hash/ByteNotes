# 🍛 Currying & Infinite Currying

> [!TIP]
> **The 30-Second Interview Pitch**
> Currying is an advanced functional programming technique where a function with multiple arguments is transformed into a sequence of nested functions, each taking a single argument (e.g., `f(a, b, c)` becomes `f(a)(b)(c)`). It utilizes **closures** to remember the arguments passed in previous calls.

## 1. What is Currying?

In JavaScript, currying is achieved by returning a function from a function. The inner functions maintain access to the outer function's scope via closures.

### Why use Currying?
1. **Reusability:** It helps create specialized versions of functions.
2. **Avoiding Redundancy:** You don't have to pass the same variable repeatedly.

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

---

## 2. Real-World Use Case: specialized loggers

Currying is extremely useful for generating specialized, reusable functions.

```javascript
function createLogger(level) {
    return function(message) {
        console.log(`[${level.toUpperCase()}]: ${message}`);
    };
}

const logError = createLogger('error');
const logInfo = createLogger('info');

logError("Failed to fetch data!"); // [ERROR]: Failed to fetch data!
logInfo("Server started on port 3000."); // [INFO]: Server started on port 3000.
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

## 🎯 Common Interview Questions

**Q: What is the difference between Partial Application and Currying?**
- **A:** Currying transforms a function into a sequence of functions that each take exactly *one* argument. Partial application binds *some* (one or more) arguments of a function ahead of time, returning a function that takes the remaining arguments.

**Q: How does infinite currying avoid a maximum call stack error?**
- **A:** It doesn't use standard recursive execution where functions wait for each other. Instead, each call returns the inner function immediately, yielding control back to the caller. The call stack clears between each set of parentheses!
