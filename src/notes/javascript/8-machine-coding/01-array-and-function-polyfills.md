# ⚙️ Array & Function Polyfills

> [!TIP]
> **The 30-Second Interview Pitch**
> A polyfill is a piece of code that provides the technology that you expect the browser to provide natively. Writing polyfills for standard Array and Function methods is a very common machine-coding interview question to test your understanding of the `this` keyword, prototypes, and higher-order functions.

---

## 1. Array Polyfills

To write an array polyfill, we add our custom function directly to the `Array.prototype`. This allows us to call it on any array, and we use `this` to refer to the array it was called on.

### `Array.prototype.map()`
The `map` method creates a new array populated with the results of calling a provided function on every element.
```javascript
Array.prototype.myMap = function(callback) {
    let result = [];
    for (let i = 0; i < this.length; i++) {
        // Pass the current element, index, and the original array
        result.push(callback(this[i], i, this));
    }
    return result;
};

// Usage
const arr = [1, 2, 3];
console.log(arr.myMap(x => x * 2)); // [2, 4, 6]
```

### `Array.prototype.filter()`
```javascript
Array.prototype.myFilter = function(callback) {
    let result = [];
    for (let i = 0; i < this.length; i++) {
        // Only push if the callback returns true
        if (callback(this[i], i, this)) {
            result.push(this[i]);
        }
    }
    return result;
};
```

### `Array.prototype.reduce()`
Reduce is tricky because it takes an optional `initialValue`.
```javascript
Array.prototype.myReduce = function(callback, initialValue) {
    let accumulator = initialValue !== undefined ? initialValue : this[0];
    // If no initialValue was provided, start looping from index 1 instead of 0
    let startIndex = initialValue !== undefined ? 0 : 1;

    for (let i = startIndex; i < this.length; i++) {
        accumulator = callback(accumulator, this[i], i, this);
    }
    return accumulator;
};
```

### `Array.prototype.forEach()` & `find()`
```javascript
Array.prototype.myForEach = function(callback) {
    for (let i = 0; i < this.length; i++) {
        callback(this[i], i, this);
    }
};

Array.prototype.myFind = function(callback) {
    for (let i = 0; i < this.length; i++) {
        if (callback(this[i], i, this)) {
            return this[i]; // Return the first element that matches
        }
    }
    return undefined;
};
```

---

## 2. Function Polyfills (`call`, `apply`, `bind`)

To polyfill function methods, we add them to `Function.prototype`. The key trick here is that `this` refers to the function itself! We attach `this` (the function) as a temporary property onto the provided `context` object, execute it, and then delete it.

### `Function.prototype.call()`
```javascript
Function.prototype.myCall = function(context = {}, ...args) {
    // 'this' is the function being called.
    // We attach it to the context object temporarily.
    const fnSymbol = Symbol(); // Use a symbol to prevent overwriting existing properties
    context[fnSymbol] = this;

    // Execute the function with the provided arguments
    const result = context[fnSymbol](...args);

    // Clean up
    delete context[fnSymbol];

    return result;
};

function printName(age) {
    console.log(`${this.name} is ${age}`);
}
printName.myCall({ name: "Raj" }, 25); // "Raj is 25"
```

### `Function.prototype.apply()`
Almost identical to `call`, but arguments are passed as an array.
```javascript
Function.prototype.myApply = function(context = {}, argsArray = []) {
    const fnSymbol = Symbol();
    context[fnSymbol] = this;
    
    // Spread the array of arguments
    const result = context[fnSymbol](...argsArray);
    
    delete context[fnSymbol];
    return result;
};
```

### `Function.prototype.bind()`
`bind` doesn't execute the function immediately. It returns a *new function* that, when executed, will have the correct `this` context and any pre-filled arguments.
```javascript
Function.prototype.myBind = function(context = {}, ...args) {
    const originalFunc = this;

    // Return a new function
    return function(...newArgs) {
        // Execute the original function using apply, combining both sets of args
        return originalFunc.apply(context, [...args, ...newArgs]);
    };
};

const boundPrint = printName.myBind({ name: "Shubham" });
boundPrint(30); // "Shubham is 30"
```
