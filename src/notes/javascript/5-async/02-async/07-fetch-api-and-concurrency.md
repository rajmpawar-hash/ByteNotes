# 🌐 Fetch API & Concurrency

> [!TIP]
> **The 30-Second Interview Pitch**
> JavaScript is a single-threaded, synchronous language. However, it achieves **concurrency** (handling multiple tasks at once) through its Asynchronous, Non-Blocking I/O model driven by the Event Loop. The `fetch` API is a modern Web API used to make network requests; it always returns a Promise, allowing the main thread to continue executing other code while waiting for the network response.

## 1. Concurrency and Non-Blocking I/O

Concurrency is the ability of a program to handle multiple tasks at the same time. Since JavaScript is single-threaded, it executes one task at a time on the main thread. If a task takes too long (like a network request), it would "block" the UI.

To solve this, JS delegates time-consuming tasks (like `setTimeout`, DOM events, or `fetch`) to Web APIs. This is called **Non-Blocking I/O**. 

```javascript
async function task1() {
    setTimeout(() => console.log("Task 1 finished"), 5000);
}

async function task2() {
    setTimeout(() => console.log("Task 2 finished"), 5000);
}

task1();
task2();
console.log("Main thread continues!");

// Output immediately: "Main thread continues!"
// Output after ~5 seconds: "Task 1 finished", "Task 2 finished"
```

> **What just happened?**
> Even though both tasks take 5 seconds, it does *not* take 10 seconds total. JS fires off `task1` to the Web APIs, immediately fires off `task2`, and moves on. They run concurrently in the background.

---

## 2. The Fetch API

The `fetch()` method is used to request data from a server. **It always returns a Promise**, which resolves to the `Response` object representing the response to the request.

Because it returns a Promise, we almost always use `async/await` to handle it cleanly.

### Basic GET Request
```javascript
async function fetchUser() {
    try {
        // 1. Await the network request
        let response = await fetch('https://jsonplaceholder.typicode.com/users/1');
        
        // 2. Await the parsing of the JSON body
        let userData = await response.json();
        
        console.log(userData);
    } catch (error) {
        console.error("Network error: ", error);
    }
}

fetchUser();
```

> [!WARNING]
> **Gotcha: `fetch()` only rejects on network failure!**
> A common mistake is thinking `fetch` will throw an error if the server returns a 404 or 500 status code. **It won't!** It only rejects if there is a network error (like being offline). You must manually check `response.ok`.

```javascript
// ✅ CORRECT WAY TO HANDLE FETCH ERRORS
let response = await fetch('https://api.example.com/data');

if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
}
```

### POST Request with Payload
To send data *to* the server, you pass an `options` object as the second argument to `fetch`.

```javascript
async function createUser() {
    const options = {
        method: 'POST',
        // Convert JS object to JSON string
        body: JSON.stringify({
            title: 'New Post',
            body: 'This is the content',
            userId: 1,
        }),
        // Tell the server we are sending JSON
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    };

    let response = await fetch('https://jsonplaceholder.typicode.com/posts', options);
    let data = await response.json();
    return data;
}
```

---

## 🎯 Common Interview Questions

**Q: How does JavaScript achieve concurrency if it's single-threaded?**
- **A:** Through the Event Loop and Web APIs. When an asynchronous operation (like `fetch` or `setTimeout`) is called, JS hands it off to the browser's Web APIs to process in the background. The main thread continues executing. Once the background task finishes, its callback is pushed to the task queue, and the Event Loop eventually pushes it back onto the call stack.

**Q: Why doesn't my `fetch` catch block trigger on a 404 error?**
- **A:** The `fetch` API only rejects the Promise on network failures (e.g., DNS lookup failure, no internet connection). For HTTP error statuses (400s, 500s), the Promise still resolves. You must manually check the `response.ok` property and throw an error if it's false.
