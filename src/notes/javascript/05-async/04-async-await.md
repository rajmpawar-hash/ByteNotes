# Async / Await

`async/await` is modern syntactic sugar on top of Promises. It makes asynchronous code look and behave exactly like synchronous code, making it incredibly easy to read.

## What is `async`?
The `async` keyword is placed before a function. It does one simple thing: **It guarantees that the function will always return a Promise.** 

If you return a regular value from an `async` function, JavaScript automatically wraps that value inside a resolved Promise!

```javascript
async function getData() {
    return "Hello World";
}

const dataPromise = getData();
dataPromise.then(res => console.log(res)); // Prints: Hello World
```

## What is `await`?
The `await` keyword can **only** be used inside an `async` function. 

You place `await` in front of a Promise. When the JavaScript engine sees the `await` keyword, it **suspends the execution of that specific function** until the Promise settles.

```javascript
const p = new Promise((resolve) => {
    setTimeout(() => {
        resolve("Promise Resolved Value");
    }, 5000);
});

async function handlePromise() {
    console.log("Start");
    
    // The function pauses here for 5 seconds!
    const val = await p; 
    
    console.log("End");
    console.log(val);
}

handlePromise();
```

### Wait, doesn't that block the main thread?
**NO!** This is the magic of `async/await`. 

When the engine hits the `await` keyword, it suspends the `handlePromise` execution context and completely removes it from the Call Stack! The Call Stack is now free to execute other scripts, click events, or renders. 

Once the 5 seconds are up and the Promise resolves, the `handlePromise` execution context is pushed *back* onto the Call Stack exactly where it left off!

## Error Handling
Since `async/await` code looks synchronous, you handle errors using standard `try/catch` blocks instead of `.catch()` chains.

```javascript
async function fetchUser() {
    try {
        const response = await fetch('https://api.example.com/user');
        const data = await response.json();
        console.log(data);
    } catch (err) {
        console.log("Something went wrong:", err.message);
    }
}
```
