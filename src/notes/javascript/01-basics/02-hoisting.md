# Hoisting in JavaScript

**Hoisting** is a phenomenon in JavaScript where you can access variables and functions even *before* you have initialized or declared them in your code.

This behavior often confuses developers coming from other languages, but it makes perfect sense once you understand the **Memory Creation Phase** of the Execution Context.

## How it Works

Before JavaScript executes a single line of your code, it scans the entire script and allocates memory for every variable and function. 

During this phase:
- **Functions** are stored in memory with their *entire code block*.
- **Variables** (declared with `var`) are stored in memory and given a special placeholder value called `undefined`.

## Example in Action

```javascript
// Calling the function before declaring it!
greet(); 

// Accessing the variable before assigning it!
console.log(age); 

var age = 25;

function greet() {
    console.log("Welcome to ByteNotes!");
}
```

**Output:**
```text
Welcome to ByteNotes!
undefined
```

Because of hoisting, the `greet` function runs perfectly even though it's called at the top of the file. However, `age` prints `undefined` because during the memory allocation phase, `var` variables are assigned `undefined` until the code execution phase reaches the actual line where `25` is assigned.

## Arrow Functions and Hoisting

Be careful! If you define a function using an arrow function or a function expression and assign it to a `var`, it behaves like a regular variable, not a function.

```javascript
hello(); // Uncaught TypeError: hello is not a function

var hello = () => {
    console.log("Hi there!");
}
```

During memory creation, `hello` is treated as a variable and given the value `undefined`. When you try to invoke `undefined()`, JavaScript throws an error!
