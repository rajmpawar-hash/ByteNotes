# Execution Context and the Call Stack

Have you ever wondered what exactly happens behind the scenes when you run a JavaScript program? 

Everything in JavaScript happens inside an **Execution Context**. You can think of the Execution Context as a big, sealed-off box where your JavaScript code is evaluated and executed.

## The Two Components of the Box

The Execution Context box is divided into two distinct parts:

1. **Memory Component (Variable Environment):** This is where JavaScript stores all your variables and functions as key-value pairs before the code even starts running.
2. **Code Component (Thread of Execution):** This is the place where your actual JavaScript code is executed, strictly one line at a time.

> [!NOTE]
> JavaScript is a **synchronous, single-threaded** language. This means it can only execute one command at a time, in a specific order, moving to the next line only when the current line finishes running.

## The Call Stack

When a JavaScript program starts, a **Global Execution Context (GEC)** is created. But what happens when you call a function? 

Every time a function is invoked, a brand new, mini Execution Context is created just for that function. Once the function finishes, its execution context is deleted.

To manage all these execution contexts, JavaScript uses a **Call Stack**.

- At the very bottom of the Call Stack is always the Global Execution Context.
- When you invoke a function, its execution context is **pushed** onto the top of the stack.
- When the function finishes executing, it is **popped** off the stack, and control goes back to the context below it.

```javascript
function sayHello() {
    console.log("Hello!"); // This runs inside sayHello's execution context
}

console.log("Start"); // Runs in Global Execution Context
sayHello();           // Creates a new execution context on top of the stack
console.log("End");   // Runs in Global Execution Context again
```

The Call Stack ensures that the single thread of execution never loses its place and always knows what code is currently running!
