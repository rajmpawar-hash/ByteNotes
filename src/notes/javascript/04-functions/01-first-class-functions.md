# First Class Functions

In JavaScript, functions are treated as **First Class Citizens**. But what does that actually mean?

It means that functions in JavaScript are treated exactly like regular variables. 
You can:
1. Assign them to a variable.
2. Pass them as an argument to another function.
3. Return them from a function.

Let's look at the different ways we can define functions in JavaScript.

## Function Statement (Function Declaration)
The standard way to create a function. These functions are hoisted, meaning you can call them before you define them.

```javascript
function greet() {
    console.log("Hello!");
}
```

## Function Expression
You can assign a function to a variable. Unlike Function Statements, Function Expressions are *not* hoisted. If you try to call `greet2` before this line, you will get a TypeError because `greet2` will be `undefined`.

```javascript
var greet2 = function() {
    console.log("Hello again!");
}
```

## Anonymous Function
A function without a name. Anonymous functions are used when a function is used as a value (like in a Function Expression or passed as a callback).

```javascript
// This is an anonymous function being assigned to a variable
var myFunc = function() { ... }
```

If you try to write an anonymous function as a standard statement without assigning it, you will get a Syntax Error!

## Named Function Expression
Similar to a Function Expression, but the function has a name. 

```javascript
var greet3 = function sayHi() {
    console.log("Hi!");
}

greet3(); // Works!
// sayHi(); // ReferenceError! sayHi is not defined in the outer scope
```
Note that `sayHi` is only available *inside* its own local scope, it is not available in the global scope.

## Returning and Passing Functions
This is what makes functions "First Class Citizens".

```javascript
// Passing a function as an argument
function executor(fn) {
    fn();
}

executor(function() {
    console.log("I am passed as an argument!");
});

// Returning a function
function createGreeter() {
    return function() {
        console.log("I was returned!");
    }
}
```
