# Understanding Closures

A **Closure** is one of the most powerful and often misunderstood concepts in JavaScript.

In simple terms: A closure is a function bundled together (enclosed) with its lexical environment. 

In even simpler terms: **A function remembers the variables outside of it, even after the outer function has finished executing.**

## How Closures Work

When a function is returned from another function, it doesn't just return the code block. It returns the code block *along with a reference to its lexical scope*. It remembers where it was born and all the variables it had access to at birth.

```javascript
function outer() {
    var a = 10;
    
    function inner() {
        console.log(a);
    }
    
    return inner;
}

var myFunc = outer(); // outer() runs and is completely removed from the call stack
myFunc();             // Prints 10!
```

Wait, if `outer()` finished executing and was removed from the Call Stack, how did `myFunc()` remember what `a` was?

Because of Closures! When `inner` was returned, it took a "backpack" with it containing the lexical environment of `outer()`. When it needs `a`, it reaches into its backpack.

## Common Pitfall: Stale Closures

Closures do not store a static *value* of the variable. They store a **reference** to the variable's memory location. If the variable changes later, the closure will see the updated value.

```javascript
function counter() {
    var count = 0;
    
    return function() {
        count++;
        console.log(count);
    }
}

var increment = counter();
increment(); // 1
increment(); // 2
increment(); // 3
```

In the example above, the closure remembers the *reference* to `count`. Every time we call `increment()`, it updates that same memory space.

## Uses of Closures
Closures are used everywhere in advanced JavaScript:
1. Module Design Pattern
2. Currying
3. Memoization (Caching)
4. Maintaining state in async world (like `setTimeout`)
5. Data hiding and encapsulation (creating private variables)
