# The Global Object (window) and `this`

What happens when you run a completely empty JavaScript file? 

Even if you write absolutely zero lines of code, the JavaScript engine still does a lot of work behind the scenes. It creates the **Global Execution Context** and it sets up global memory space.

Along with this, it automatically creates two very important things:
1. The **Global Object**
2. The `this` keyword

## The Window Object

In the browser, the Global Object is known as `window`. It contains a massive collection of functions and properties provided by the browser (like `setTimeout`, `localStorage`, `document`, etc.).

If you run JavaScript in Node.js, the global object is simply called `global`.

## The `this` Keyword

Whenever an execution context is created, a `this` keyword is generated along with it. 

At the global level (outside of any functions), `this` points directly to the Global Object.

```javascript
console.log(this === window); // true (in a browser environment)
```

## Global Space

Any variable or function that you declare *outside* of a function is attached to the global space. Because they are in the global space, they are automatically attached to the Global Object.

```javascript
var fruit = "Apple";

function showFruit() {
    console.log("Inside function");
}

// These all access the exact same variable!
console.log(fruit);
console.log(window.fruit);
console.log(this.fruit);
```

> [!WARNING]
> While `var` declarations are attached to the `window` object, variables declared with `let` and `const` are *not* attached to the `window` object, even if they are declared in the global scope.
