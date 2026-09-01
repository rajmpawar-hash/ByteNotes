# Worker Threads (Don't Block the Main Thread)

> [!TIP]
> **The 30-Second Interview Pitch**
> *"Because Node.js is single-threaded, running a heavy CPU-bound task (like image processing or cryptography) will block the Event Loop, freezing the server for all other users. To solve this, Node.js introduced `worker_threads`. Worker threads allow you to spin up independent V8 isolates running in parallel on separate CPU cores, enabling true multi-threading for CPU-intensive operations without blocking the main event loop."*

## The Problem: CPU-Bound Tasks

Node.js is incredibly fast at **I/O-bound tasks** (database queries, file reads) because `libuv` handles them asynchronously.

However, Node is terrible at **CPU-bound tasks** (doing heavy math on the main thread).

```javascript
// ❌ THIS WILL FREEZE YOUR SERVER
app.get('/hash', (req, res) => {
  // A heavy loop that takes 5 seconds to complete
  for (let i = 0; i < 10000000000; i++) {} 
  
  res.send('Done!');
});
```
If User A requests `/hash`, the Event Loop is blocked for 5 seconds. If User B requests a simple `/ping` during those 5 seconds, User B has to wait until User A's loop finishes!

## The Solution: Worker Threads

Introduced in Node v10, `worker_threads` allow you to execute JavaScript in parallel.

Unlike traditional OS threads (which share memory and are prone to race conditions), Node.js Workers use **Isolated V8 Instances**. They do not share memory by default; they communicate by passing messages.

### Implementation

**Main File (`index.js`)**
```javascript
const { Worker } = require('worker_threads');

app.get('/hash', (req, res) => {
  // 1. Offload the heavy task to a separate thread
  const worker = new Worker('./heavy-math.js');

  // 2. Listen for the result asynchronously
  worker.on('message', (result) => {
    res.send(`Result: ${result}`);
  });

  worker.on('error', (err) => res.status(500).send(err));
});
```

**Worker File (`heavy-math.js`)**
```javascript
const { parentPort } = require('worker_threads');

// Run the heavy loop on this separate CPU core
let count = 0;
for (let i = 0; i < 10000000000; i++) {
  count++;
}

// Send the result back to the main thread
parentPort.postMessage(count);
```

> [!IMPORTANT]
> **When NOT to use Worker Threads**
> Do not use Worker Threads for I/O operations (like database queries). Node's built-in asynchronous I/O (via `libuv`) is already highly optimized for that. Only use Worker Threads for pure CPU-intensive math/computation.
