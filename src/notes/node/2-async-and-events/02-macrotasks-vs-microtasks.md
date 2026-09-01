# Macrotasks vs Microtasks (The Hidden Queues)

> [!TIP]
> **The 30-Second Interview Pitch**
> *"While the main Event Loop handles phases like Timers and I/O (Macrotasks), Node.js also maintains two hidden Microtask queues: the `nextTick` queue and the `Promise` queue. These Microtask queues are heavily prioritized. They are completely drained and executed *in between* every single phase of the Event Loop, and even in between individual Macrotask executions, making them the fastest way to execute asynchronous code."*

## The Queue Hierarchy

We learned about the 6 phases of the Event Loop (Timers, Poll, Check, etc.). Those queues handle **Macrotasks**.

But hidden in the shadows are the **Microtasks**. They have absolute priority over everything else.

There are two Microtask queues, in this strict order of priority:
1. **The `nextTick` Queue:** Callbacks added via `process.nextTick()`.
2. **The `Promise` Queue:** Callbacks added via `.then()` or `catch()` on Promises.

## How Execution Works

Node's execution engine follows this strict loop:
1. Execute the current Macrotask (e.g., one timer, or one I/O callback).
2. **Drain the `nextTick` Queue completely.**
3. **Drain the `Promise` Queue completely.**
4. Move to the next Macrotask, or move to the next phase of the Event Loop.

### The Interview Question: Execution Order

```javascript
setTimeout(() => console.log('1. Macrotask (Timer)'), 0);

setImmediate(() => console.log('2. Macrotask (Immediate)'));

Promise.resolve().then(() => console.log('3. Microtask (Promise)'));

process.nextTick(() => console.log('4. Microtask (nextTick)'));

console.log('5. Synchronous');
```

**Output:**
```
5. Synchronous
4. Microtask (nextTick)
3. Microtask (Promise)
1. Macrotask (Timer)
2. Macrotask (Immediate)
```

**Explanation:**
1. `5. Synchronous` runs first because it's on the main call stack.
2. The main stack finishes. Node checks the Microtask queues before starting the Event Loop.
3. `nextTick` has higher priority than Promises, so `4. nextTick` prints.
4. The Promise queue is drained, so `3. Promise` prints.
5. The Microtask queues are now empty! Node enters the Event Loop.
6. Phase 1 is Timers, so `1. Timer` prints.
7. Phase 5 is Check, so `2. Immediate` prints.

## 🚨 The `process.nextTick` Danger

Because `process.nextTick` executes *before* the Event Loop can continue, you can easily starve the Event Loop and crash your application!

```javascript
// ❌ THIS WILL FREEZE YOUR SERVER
function infiniteTick() {
  process.nextTick(infiniteTick);
}
infiniteTick();
```
If you do this, the `nextTick` queue will never empty. The Event Loop will be blocked forever. It will never reach the Poll phase to handle incoming HTTP requests, and your server will appear dead.

If you must queue a recursive async task, use `setImmediate()`. It queues the task in the Check Phase of the Event Loop, allowing the loop to continue spinning and serving other requests in the meantime.
