# 🤝 Promise Polyfills

> [!TIP]
> **The 30-Second Interview Pitch**
> Writing polyfills for Promise combinators (`Promise.all`, `Promise.any`, `Promise.race`, `Promise.allSettled`) tests your understanding of concurrency, asynchronous iteration, and closure states in JavaScript. The key pattern is maintaining an array of results and a counter to track how many Promises have resolved.

---

## 1. `Promise.all()` Polyfill

`Promise.all` takes an array of promises. It resolves with an array of all results **only if ALL promises resolve**. If **even one** promise rejects, the entire `Promise.all` rejects immediately with that error.

```javascript
Promise.myAll = function (promises) {
    return new Promise((resolve, reject) => {
        let results = [];
        let completedPromises = 0;

        if (promises.length === 0) resolve(results);

        promises.forEach((promise, index) => {
            // Wrap in Promise.resolve to handle non-promise values (e.g., [1, 2, Promise.resolve(3)])
            Promise.resolve(promise)
                .then(value => {
                    results[index] = value; // Place result at the correct index!
                    completedPromises += 1;

                    // If all promises are done, resolve the main promise
                    if (completedPromises === promises.length) {
                        resolve(results);
                    }
                })
                .catch(error => {
                    // Reject immediately on the first error
                    reject(error);
                });
        });
    });
};
```
> [!IMPORTANT]
> **Gotcha:** Why use `results[index] = value` instead of `results.push(value)`? Because promises can resolve out of order! `results[index]` guarantees the output array perfectly matches the order of the input array.

---

## 2. `Promise.any()` Polyfill

`Promise.any` returns the value of the **first** promise that resolves. It only rejects if **ALL** promises reject (returning an `AggregateError`).

```javascript
Promise.myAny = function (promises) {
    return new Promise((resolve, reject) => {
        let errors = [];
        let rejectedCount = 0;

        if (promises.length === 0) reject(new AggregateError([]));

        promises.forEach((promise, index) => {
            Promise.resolve(promise)
                .then(value => {
                    // Resolve immediately on the first success
                    resolve(value);
                })
                .catch(error => {
                    errors[index] = error;
                    rejectedCount += 1;

                    // If all promises failed, reject with an AggregateError
                    if (rejectedCount === promises.length) {
                        reject(new AggregateError(errors, "All promises were rejected"));
                    }
                });
        });
    });
};
```

---

## 3. `Promise.allSettled()` Polyfill

`Promise.allSettled` waits for all promises to finish (either resolve or reject) and returns an array of objects describing the outcome of each.

```javascript
Promise.myAllSettled = function (promises) {
    return new Promise((resolve) => {
        let results = [];
        let settledCount = 0;

        if (promises.length === 0) resolve(results);

        promises.forEach((promise, index) => {
            Promise.resolve(promise)
                .then(value => {
                    results[index] = { status: 'fulfilled', value };
                })
                .catch(reason => {
                    results[index] = { status: 'rejected', reason };
                })
                .finally(() => {
                    settledCount += 1;
                    // When all are settled (success or fail), resolve the main promise
                    if (settledCount === promises.length) {
                        resolve(results);
                    }
                });
        });
    });
};
```

---

## 4. `Promise.race()` Polyfill

`Promise.race` returns as soon as the first promise settles (resolves **OR** rejects).

```javascript
Promise.myRace = function (promises) {
    return new Promise((resolve, reject) => {
        if (promises.length === 0) return; // Promise hangs forever (standard behavior)

        promises.forEach(promise => {
            Promise.resolve(promise)
                .then(resolve) // First one to resolve wins
                .catch(reject); // First one to reject wins
        });
    });
};
```

---

## 5. `Promise.prototype.finally()` Polyfill

The `.finally()` method runs a callback whether the promise was resolved or rejected, and it transparently passes the value/error down the chain.

```javascript
Promise.prototype.myFinally = function(callback) {
    return this.then(
        // Wait for the callback to finish, then return the original value
        value => Promise.resolve(callback()).then(() => value),
        // Wait for the callback to finish, then re-throw the original error
        reason => Promise.resolve(callback()).then(() => { throw reason; })
    );
};
```
