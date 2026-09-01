# 🚨 Error Handling in JavaScript

> [!TIP]
> **The 30-Second Interview Pitch**
> Error handling in JavaScript is primarily managed using `try...catch...finally` blocks. This allows developers to gracefully handle runtime errors without crashing the entire application. The `throw` keyword lets you generate custom errors, and the `finally` block ensures cleanup code runs regardless of whether an error occurred.

## 1. The `try...catch` Statement

The `try...catch` construct is used to handle exceptions (errors) that occur during the execution of a block of code.

```javascript
try {
    // Code that might throw an error
    let user = JSON.parse("{ invalid json }");
    console.log(user);
} catch (error) {
    // Code that runs if an error occurs in the 'try' block
    console.error("Oops! Something went wrong:");
    console.error(error.name);    // e.g., SyntaxError
    console.error(error.message); // e.g., Unexpected token i in JSON at position 2
}
```

> [!WARNING]
> **Gotcha: Synchronous Only!**
> A standard `try...catch` only catches **synchronous** errors. If an error happens inside an asynchronous callback (like `setTimeout`), the `try...catch` will miss it!

```javascript
// ❌ WRONG: The catch block won't trigger!
try {
    setTimeout(() => {
        throw new Error("Async Error!");
    }, 1000);
} catch (err) {
    console.log("Caught:", err);
}
```
*(To handle async errors, you must use `try...catch` inside an `async` function, or use `.catch()` on a Promise).*

---

## 2. The `finally` Block

The `finally` block executes **after** the `try` and `catch` blocks, regardless of whether an exception was thrown or caught. It is typically used for cleanup (e.g., closing file streams, stopping loading spinners).

```javascript
let isLoading = true;

try {
    console.log("Fetching data...");
    // simulate error
    throw new Error("Network timeout");
} catch (error) {
    console.error("Error fetching data:", error.message);
} finally {
    // This will ALWAYS run
    isLoading = false;
    console.log("Loading state reset to:", isLoading);
}
```

---

## 3. The `throw` Keyword (Custom Errors)

You can use the `throw` statement to generate user-defined exceptions. You can throw strings, numbers, or (best practice) built-in `Error` objects.

```javascript
function withdraw(amount) {
    const balance = 100;
    
    if (amount > balance) {
        // Throwing a custom error
        throw new Error("Insufficient funds!");
    }
    
    return balance - amount;
}

try {
    withdraw(500);
} catch (err) {
    console.log(err.message); // "Insufficient funds!"
}
```

### Built-in Error Types
JavaScript has several built-in error constructors:
- `Error`: Generic error.
- `ReferenceError`: Using an undeclared variable.
- `SyntaxError`: Invalid JavaScript syntax (often caught at compile-time).
- `TypeError`: Value is not of the expected type (e.g., calling a string as a function).

---

## 4. Error Propagation (Bubbling)

If an error is thrown inside a function and that function doesn't have a `try...catch`, the error "bubbles up" the call stack to the nearest `catch` block.

```javascript
function a() { b(); }
function b() { c(); }
function c() { 
    throw new Error("Deep error!"); 
}

try {
    a();
} catch (err) {
    // The error bubbles all the way up here!
    console.log("Caught at the top level:", err.message);
}
```
