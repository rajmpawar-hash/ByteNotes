# The Event Loop

JavaScript is a synchronous, single-threaded language. It has one Call Stack, and it can only do one thing at a time. 

So how does JavaScript handle timers, API calls, and event listeners without completely freezing the browser? The secret lies in the Web APIs and the **Event Loop**.

## Web APIs
The browser provides superpowers to the JavaScript engine. These superpowers are called Web APIs:
- `setTimeout()`
- `DOM APIs` (document.getElementById, etc.)
- `fetch()`
- `localStorage`
- `console`

These are *not* part of JavaScript! They are part of the browser environment. The browser simply gives the JavaScript engine access to them through the Global Object (`window`).

## How Asynchronous Code Runs

When you call `setTimeout(callback, 5000)`, here is what happens:
1. The browser takes the callback function and starts a timer for 5000ms.
2. The JavaScript engine moves on to the next line of code immediately. It does **not** wait.
3. When the 5000ms timer expires, the browser cannot simply shove the callback into the Call Stack (that would interrupt whatever JS is currently doing!).
4. Instead, the browser puts the callback into a waiting area called the **Callback Queue**.

## The Event Loop

The **Event Loop** has one very simple job: It acts as a gatekeeper between the Callback Queue and the Call Stack.

It constantly asks two questions:
1. Is the Call Stack completely empty?
2. Is there anything waiting in the Callback Queue?

If the answer to **both** is YES, the Event Loop takes the function from the Callback Queue and pushes it onto the Call Stack to be executed.

## Microtask Queue

There is actually a second queue that is *more important* than the Callback Queue. It's called the **Microtask Queue**.

- The Microtask Queue gets absolute priority over the Callback Queue.
- What goes in the Microtask Queue? **Promises** and **Mutation Observers**.
- What goes in the Callback Queue? Everything else (`setTimeout`, DOM events, etc.).

If there is a task waiting in the Microtask Queue and a task waiting in the Callback Queue, the Event Loop will *always* execute the Microtask first!

> [!WARNING]
> **Starvation:** If you write code that constantly generates new Promises (filling up the Microtask Queue over and over), the Event Loop will never get a chance to look at the regular Callback Queue. The callbacks waiting in the regular queue will never execute! This is known as starvation.
