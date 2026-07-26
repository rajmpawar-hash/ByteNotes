# Block Scope and Shadowing

In JavaScript, a **Block** is defined by curly braces `{ }`. 

Blocks are used to group multiple statements together into a single compound statement. You usually see blocks used with `if` statements, `for` loops, and `while` loops, because those structures expect a single statement, but you often want to execute multiple lines of code!

## Block Scope

**Block Scope** means what variables and functions you can access *inside* that specific block.

- `let` and `const` are **block-scoped**. This means if they are declared inside a block, they cannot be accessed from outside that block. They are stored in a separate memory space reserved just for that block.
- `var` is **function-scoped** (or global). If you declare a `var` inside a block, it completely ignores the block and attaches itself to the global scope or the nearest function scope.

```javascript
{
    var a = 10;
    let b = 20;
    const c = 30;
}

console.log(a); // 10
console.log(b); // ReferenceError: b is not defined
```

## Shadowing

If you have a variable with the same name declared outside a block, and you declare a variable with the same name *inside* a block, the inner variable **shadows** the outer variable.

```javascript
var a = 100;

{
    var a = 10; // Shadows the global 'a'
    console.log(a); // 10
}

console.log(a); // 10! The inner 'var a' permanently changed the global 'a'
```

Because `var` is global, the inner `var a = 10` literally overwrote the outer `var a = 100`.

However, `let` and `const` behave safely because they are block-scoped:

```javascript
let b = 100;

{
    let b = 20; // Shadows the outer 'b', but only within this block
    console.log(b); // 20
}

console.log(b); // 100. The outer 'b' remained completely untouched!
```

## Illegal Shadowing

You can shadow a `let` using a `let`.
You can shadow a `var` using a `let`.
But you **cannot** shadow a `let` using a `var`. This is called Illegal Shadowing and will result in an error.

```javascript
let a = 20;
{
    var a = 20; // SyntaxError: Identifier 'a' has already been declared
}
```
