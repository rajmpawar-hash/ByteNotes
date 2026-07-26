# Higher-Order Functions

A **Higher-Order Function (HOF)** is a function that does at least one of the following:
1. Takes one or more functions as arguments (a callback).
2. Returns a function as its result.

If a function does neither of these, it is a First-Order Function.

## Why use Higher-Order Functions?
HOFs are the backbone of Functional Programming. They allow us to write code that is highly modular, reusable, and declarative. 

Instead of writing complex logic over and over, we can abstract the logic into a Higher-Order Function and pass smaller, focused functions into it.

## Example: Calculating Areas and Perimeters

Imagine we have an array of circle radiuses, and we want to calculate the area, circumference, and diameter for all of them.

### The Bad Way (WET Code - Write Everything Twice)
```javascript
const radiusArr = [3, 1, 2, 4];

const calculateArea = function (radiusArr) {
    const output = [];
    for (let i = 0; i < radiusArr.length; i++) {
        output.push(Math.PI * radiusArr[i] * radiusArr[i]);
    }
    return output;
}

const calculateCircumference = function (radiusArr) {
    const output = [];
    for (let i = 0; i < radiusArr.length; i++) {
        output.push(2 * Math.PI * radiusArr[i]);
    }
    return output;
}
```
Notice how 90% of the code is identical? We are repeating the array creation, the loop, and the pushing logic.

### The Good Way (Using a Higher-Order Function)
Let's abstract the repetitive logic into a HOF, and pass the specific math formulas as callbacks.

```javascript
const radiusArr = [3, 1, 2, 4];

// Callbacks (First-Order Functions)
const area = function (radius) {
    return Math.PI * radius * radius;
}

const circumference = function (radius) {
    return 2 * Math.PI * radius;
}

// Our Higher-Order Function!
const calculate = function(arr, logic) {
    const output = [];
    for (let i = 0; i < arr.length; i++) {
        output.push(logic(arr[i]));
    }
    return output;
}

console.log(calculate(radiusArr, area));
console.log(calculate(radiusArr, circumference));
```

By using a Higher-Order Function, our code is cleaner, infinitely more scalable, and adheres to the DRY (Don't Repeat Yourself) principle!

*(Fun fact: our `calculate` function behaves exactly like the built-in `Array.prototype.map` function!)*
