# 🦾 Advanced Machine Coding

> [!TIP]
> **The 30-Second Interview Pitch**
> Advanced machine coding rounds test your ability to implement complex utility functions and design patterns from scratch. Common tasks include writing rate-limiters (Debounce/Throttle), concurrency controllers (`Maplimit`, `Parallel Limit`), custom Event Emitters, Object flattener functions, and recursive API retry wrappers.

---

## 1. Deep Flatten an Object / Array

### Flatten Array
```javascript
function flattenArray(arr) {
    return arr.reduce((acc, curr) => {
        return acc.concat(Array.isArray(curr) ? flattenArray(curr) : curr);
    }, []);
}
```

### Flatten Deeply Nested Object
```javascript
function flattenObject(obj, prefix = '') {
    let result = {};

    for (let key in obj) {
        if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
            // Recursively flatten the nested object, appending the key
            const nested = flattenObject(obj[key], `${prefix}${key}.`);
            result = { ...result, ...nested };
        } else {
            // Base case: primitive value or array
            result[`${prefix}${key}`] = obj[key];
        }
    }
    return result;
}

const user = { name: "Raj", address: { city: "Mumbai", zip: 400 } };
console.log(flattenObject(user)); 
// { name: "Raj", "address.city": "Mumbai", "address.zip": 400 }
```

---

## 2. Custom Event Emitter

Implement a Pub/Sub (Publish/Subscribe) pattern from scratch.
```javascript
class EventEmitter {
    constructor() {
        this.events = {};
    }

    on(eventName, callback) {
        if (!this.events[eventName]) {
            this.events[eventName] = [];
        }
        this.events[eventName].push(callback);
    }

    emit(eventName, ...args) {
        if (this.events[eventName]) {
            this.events[eventName].forEach(callback => callback(...args));
        }
    }

    off(eventName, callbackToRemove) {
        if (this.events[eventName]) {
            this.events[eventName] = this.events[eventName].filter(cb => cb !== callbackToRemove);
        }
    }
}
```

---

## 3. Memoization / Caching

Create a function that caches the results of expensive function calls.
```javascript
function memoize(fn) {
    const cache = {}; // Closure memory

    return function(...args) {
        // Create a unique cache key based on the arguments
        const key = JSON.stringify(args);

        if (cache[key]) {
            console.log("Fetching from cache...");
            return cache[key];
        } else {
            console.log("Calculating result...");
            const result = fn.apply(this, args);
            cache[key] = result;
            return result;
        }
    };
}
```

---

## 4. `setInterval` Polyfill (Using `setTimeout`)

Create a `setInterval` function using only `setTimeout`.
```javascript
function customSetInterval(callback, delay) {
    let timerId;

    function loop() {
        callback();
        timerId = setTimeout(loop, delay); // Recursively call setTimeout
    }

    timerId = setTimeout(loop, delay);

    // Return a clear function
    return function clearCustomInterval() {
        clearTimeout(timerId);
    };
}

const clear = customSetInterval(() => console.log("Tick"), 1000);
// clear(); // Call this to stop it
```

---

## 5. API Retry Wrapper

Write a function that attempts to call a Promise-based API up to `N` times before failing.
```javascript
async function fetchWithRetry(apiCall, retries = 3) {
    try {
        return await apiCall(); // Attempt the call
    } catch (error) {
        if (retries === 1) {
            throw error; // We're out of retries, throw the final error
        }
        console.log(`Failed. Retrying... (${retries - 1} left)`);
        // Recursive call with reduced retry count
        return fetchWithRetry(apiCall, retries - 1);
    }
}
```

---

## 6. Concurrency Control (Parallel Limit)

Execute an array of async tasks in parallel, but never run more than `limit` tasks at the same time.

```javascript
async function parallelLimit(tasks, limit) {
    const results = [];
    let executing = [];

    for (const task of tasks) {
        // Start the task and save the promise
        const p = task().then(result => {
            // Once finished, remove itself from the executing list
            executing.splice(executing.indexOf(p), 1);
            return result;
        });

        results.push(p);
        executing.push(p);

        // If we reached the limit, wait for at least one to finish before continuing the loop
        if (executing.length >= limit) {
            await Promise.race(executing);
        }
    }

    // Wait for all remaining tasks to finish
    return Promise.all(results);
}
```
