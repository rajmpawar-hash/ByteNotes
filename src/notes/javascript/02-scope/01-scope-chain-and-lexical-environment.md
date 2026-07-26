# The Scope Chain & Lexical Environment

When you try to use a variable in JavaScript, how does the engine know where to find it? It uses the **Scope Chain** and the **Lexical Environment**.

## What is a Lexical Environment?

"Lexical" simply means in hierarchy or in sequence. Where is the code physically written in your file?

Whenever an Execution Context is created, a **Lexical Environment** is also created. 
A Lexical Environment consists of:
1. The local memory of that specific execution context.
2. A reference to the Lexical Environment of its **parent**.

## The Scope Chain

When JavaScript needs to find a variable, it looks in the current local memory. If it can't find it there, it follows the reference to its parent's Lexical Environment and looks there. 

It keeps doing this, moving up the hierarchy, until it reaches the Global Execution Context. If it still can't find the variable, it looks at the parent of the Global Execution Context, which is `null`. At that point, it gives up and throws a `ReferenceError: not defined`.

This process of traveling up the chain of Lexical Environments is called the **Scope Chain**.

## Example

```javascript
function a() {
    var x = 10;
    
    function b() {
        console.log(x); 
    }
    
    b();
}

a();
```

**How JavaScript finds `x` inside `b()`:**
1. Engine looks for `x` inside `b()`'s local memory. It's not there.
2. It follows `b()`'s lexical reference to its parent, which is `a()`.
3. It looks in `a()`'s memory, finds `x = 10`, and prints it!

Even though `b()` didn't have `x`, it had access to it because `b()` is lexically (physically) written inside `a()`.
