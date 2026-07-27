# ⏳ Async / Await

`async/await` is syntactic sugar built on top of Promises. It allows us to write asynchronous code that *looks* and *behaves* like synchronous code, making it incredibly easy to read!

```mermaid
flowchart LR
    A[async function] --> B(Always returns a Promise)
    C[await keyword] --> D(Pauses execution until Promise resolves)
```

## ✨ 1. The `async` keyword
When you place the word `async` before a function, two things happen:
1. It guarantees that the function will always return a Promise.
2. If you return a primitive value (like a string or number), JavaScript automatically wraps it inside a Promise!

## 🛑 2. The `await` keyword
`await` can **only** be used inside an `async` function.
It tells JavaScript to **pause execution** on that specific line until the Promise settles (resolves or rejects).

```javascript
async function handleData() {
    console.log("Starting...");
    
    // JS pauses here until fetch resolves!
    const response = await fetch("https://api.example.com/data"); 
    
    // JS pauses here until parsing is complete!
    const data = await response.json();
    
    console.log(data);
}
```

### 🧠 How `await` actually works under the hood
Does `await` actually freeze the entire JavaScript engine? **NO!** Remember, JS is single-threaded. If it froze, the browser would freeze.

When JS hits an `await` keyword:
1. It suspends the Execution Context of the `async` function.
2. It pops it off the Call Stack.
3. The rest of the program continues running normally.
4. Once the awaited Promise resolves in the background, the function's Execution Context is pushed *back* onto the Call Stack right where it left off!

## 🛡️ 3. Error Handling
Since `await` doesn't use `.catch()`, how do we handle errors? We use standard `try...catch` blocks!

```mermaid
stateDiagram-v2
    state "try { ... }" as Try
    state "catch (error) { ... }" as Catch
    
    Try --> Success: await resolves
    Try --> Catch: await rejects
```

```javascript
async function getData() {
    try {
        const response = await fetch("invalid-url");
        const data = await response.json();
    } catch (error) {
        console.error("Oops! Something went wrong:", error);
    }
}
```
