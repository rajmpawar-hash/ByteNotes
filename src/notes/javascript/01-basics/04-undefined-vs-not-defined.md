# `undefined` vs `not defined`

In JavaScript, `undefined` and `not defined` might sound like the exact same thing in plain English, but they mean two completely different things to the JavaScript Engine.

## What is `undefined`?

`undefined` is a special keyword and a reserved data type in JavaScript. 

It means that a variable **has been allocated memory**, but it **has not been assigned a value yet**. JavaScript automatically puts the placeholder `undefined` in that memory space during the memory creation phase.

```javascript
var username;
console.log(username); // Output: undefined

// Later in the code...
username = "Alex";
console.log(username); // Output: Alex
```

## What is `not defined`?

`not defined` is an **Error**. 

It means that the variable you are trying to access **does not exist in memory at all**. You never declared it, so JavaScript has no idea what you are talking about.

```javascript
console.log(password); // Uncaught ReferenceError: password is not defined
```

## Best Practices

While you *can* manually assign `undefined` to a variable, it is highly discouraged. `undefined` should be left for the JavaScript engine to use as a placeholder.

```javascript
var status = "active";

// BAD PRACTICE ❌
status = undefined; 

// GOOD PRACTICE ✅ (If you need to intentionally empty a variable)
status = null;
```
