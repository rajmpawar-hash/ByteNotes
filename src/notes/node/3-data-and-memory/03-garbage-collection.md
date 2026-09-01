# V8 Garbage Collection & Memory Leaks

> [!TIP]
> **The 30-Second Interview Pitch**
> *"Node.js relies on the V8 engine's Generational Garbage Collector to manage memory. It divides the heap into 'New Space' (where short-lived objects are quickly cleaned up using a Scavenger algorithm) and 'Old Space' (where long-lived objects are cleaned up using a heavier Mark-and-Sweep algorithm). In Node.js, the most common cause of memory leaks is dangling closures or global variables preventing the Mark-and-Sweep algorithm from freeing memory."*

Since Node.js servers run for months without restarting, memory leaks are catastrophic. If you leak 1MB of RAM on every HTTP request, a high-traffic server will crash with an `Out Of Memory` (OOM) error in minutes.

## How V8 Garbage Collection Works

JavaScript is garbage collected. You don't manually `free()` memory like in C. The V8 engine does it for you using a **Generational Hypothesis**: *"Most objects die young."*

V8 splits your RAM (The Heap) into two main areas:

### 1. New Space (The Nursery)
When you create a new variable (e.g., inside an Express route handler), it is allocated in the New Space. 
- This space is very small (usually between 1MB and 8MB).
- It fills up quickly. When it's full, V8 runs a lightning-fast **Scavenger** algorithm. It deletes all the objects that are no longer needed (which is usually 99% of them, since the HTTP request already finished).

### 2. Old Space
If an object survives two Scavenger runs in the New Space (meaning it's still actively being used by your app), V8 promotes it to the **Old Space**.
- This space is massive (up to 1.5GB by default).
- When Old Space gets full, V8 runs a much heavier **Mark-and-Sweep** algorithm. 
- **The "Stop The World" Pause:** Mark-and-Sweep actually pauses your main JavaScript thread to map out all active memory. If your Old Space is massively bloated, this pause can last for hundreds of milliseconds, causing horrible latency spikes in your API!

## Finding and Fixing Memory Leaks

A memory leak occurs when an object is no longer needed by your business logic, but V8 cannot delete it because *something* in your code still holds a reference to it.

### The #1 Cause: Dangling Closures

```javascript
// ❌ MASSIVE MEMORY LEAK
let requestLogs = []; // Global array

app.get('/api/data', (req, res) => {
  // Every time a user hits this route, we push an object into a global array.
  // V8 can NEVER garbage collect these objects because the global array still references them!
  requestLogs.push({ url: req.url, time: Date.now() }); 
  
  res.send('Success');
});
```

### How to Detect It in Production
If your server keeps crashing with OOM errors, how do you find the exact line of code causing it?

You take a **Heap Snapshot**.

1. You can trigger a heap snapshot programmatically using the `v8` module:
```javascript
const v8 = require('v8');
v8.writeHeapSnapshot('./snapshot.heapsnapshot');
```
2. You open Google Chrome, go to `DevTools -> Memory -> Load`, and upload the snapshot file.
3. Chrome will visualize exactly which arrays or objects are consuming the most RAM, allowing you to trace the leak directly back to your code!
