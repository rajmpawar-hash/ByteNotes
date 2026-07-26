# Let, Const and the Temporal Dead Zone (TDZ)

Are `let` and `const` declarations hoisted? 

**Yes, they are!** However, they behave very differently than `var`, which leads to the concept of the Temporal Dead Zone.

## The Temporal Dead Zone

When a `var` variable is hoisted, it is attached to the Global Object (`window`) and initialized with `undefined`.

When `let` and `const` variables are hoisted, they are allocated memory in a completely *separate* memory space, not the Global Object. Furthermore, they are **not initialized**. 

The time from when a `let` or `const` variable is hoisted (memory allocated) until it is actually initialized with a value is known as the **Temporal Dead Zone (TDZ)**.

If you try to access a variable while it is in the TDZ, JavaScript will throw a `ReferenceError`.

```javascript
console.log(a); // Uncaught ReferenceError: Cannot access 'a' before initialization
console.log(b); // undefined

let a = 10;
var b = 20;
```

## Types of Errors

Understanding `let` and `const` helps you understand common JavaScript errors:

1. **ReferenceError:** Thrown when you try to access a variable in the Temporal Dead Zone, or a variable that hasn't been declared at all.
2. **TypeError:** Thrown when you try to reassign a `const` variable. (`const` stands for constant, it cannot be changed).
3. **SyntaxError:** Thrown if you try to redeclare a `let` or `const` variable with the same name in the same scope, or if you forget to initialize a `const` variable when declaring it.

## Best Practices
- Always use `const` whenever possible to avoid accidental reassignments.
- If you need to reassign a variable, use `let`.
- Try to completely avoid `var` in modern JavaScript to prevent scoping bugs and global space pollution.
