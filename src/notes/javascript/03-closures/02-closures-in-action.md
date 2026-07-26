# Closures in Action & Interview Questions

Closures frequently show up in interviews, usually disguised as trick questions involving loops and `setTimeout`.

## The Classic `setTimeout` Problem

Look at the following code. What do you expect it to print?

```javascript
function printNumbers() {
    for (var i = 1; i <= 5; i++) {
        setTimeout(function() {
            console.log(i);
        }, i * 1000);
    }
    console.log("Timer started");
}

printNumbers();
```

You might expect it to print `1, 2, 3, 4, 5` over five seconds. 
But if you run it, it prints `6, 6, 6, 6, 6`!

### Why did this happen?

1. JavaScript is synchronous and doesn't wait for `setTimeout`. It quickly spins up 5 timers and finishes the `for` loop.
2. By the time the loop finishes, the value of `i` has become `6`.
3. The callback function inside `setTimeout` forms a **closure** and remembers the *reference* to `i`.
4. When the timers finally expire and execute, they all look at the reference of `i`, which is now `6`.

## How to Fix It

### Solution 1: Use `let`
The easiest modern way to fix this is to change `var` to `let`.

```javascript
function printNumbers() {
    for (let i = 1; i <= 5; i++) {
        setTimeout(function() {
            console.log(i);
        }, i * 1000);
    }
}
```
Because `let` is **block-scoped**, a brand new copy of `i` is created for every single iteration of the loop. Each callback function remembers its own unique copy of `i`.

### Solution 2: Use a Closure (The old way)
If the interviewer forbids you from using `let`, you must create a new function scope to force a new closure for every iteration.

```javascript
function printNumbers() {
    for (var i = 1; i <= 5; i++) {
        function close(x) {
            setTimeout(function() {
                console.log(x);
            }, x * 1000);
        }
        close(i);
    }
}
```
By passing `i` into `close(x)`, we create a brand new variable `x` in the local memory of `close()`. The `setTimeout` forms a closure with `x`, locking in the correct value for every iteration!

## Data Hiding with Closures

Closures can be used to simulate private variables, a feature that didn't exist natively in older JavaScript.

```javascript
function createCounter() {
    let count = 0; // 'count' is hidden! You cannot access it directly from outside.
    
    return {
        increment: function() {
            count++;
            console.log(count);
        },
        decrement: function() {
            count--;
            console.log(count);
        }
    }
}

const counter = createCounter();
counter.increment(); // 1
// console.log(counter.count); // undefined! Completely hidden and secure.
```
