# Promise APIs

JavaScript provides four powerful APIs to handle multiple Promises concurrently.

Imagine you have three API calls (P1, P2, and P3) that you want to execute at the same time.

## 1. `Promise.all([P1, P2, P3])`
Use this when you need **ALL** promises to succeed.
- **Success:** If all three succeed, it waits for the longest one to finish (e.g., 3 seconds). It returns an array of the three results: `[val1, val2, val3]`.
- **Failure:** If *even one* promise fails (e.g., P2 fails after 1 second), `Promise.all` immediately throws an error and completely cancels the operation. It will not wait for P1 or P3 to finish.

## 2. `Promise.allSettled([P1, P2, P3])`
Use this when you want all results, **regardless of success or failure**.
- **Behavior:** It will wait for all three promises to finish (settle), whether they resolve or reject.
- **Result:** It returns an array of objects detailing the status of each promise. 
  `[{status: "fulfilled", value: val1}, {status: "rejected", reason: err2}, ...]`

## 3. `Promise.race([P1, P2, P3])`
Use this when you want the result of the **first promise to finish**, whether it succeeded or failed.
- **Behavior:** It's a literal race. Whichever promise settles first (e.g., P2 takes 1 second, the others take 3), it returns that result.
- **Result:** If the winner resolved, it returns the value. If the winner rejected, it throws the error.

## 4. `Promise.any([P1, P2, P3])`
Use this when you want the result of the **first SUCCESSFUL promise**.
- **Behavior:** It waits for the first promise to resolve and returns its value. It completely ignores rejected promises.
- **Failure:** What if all of them fail? It will wait for all of them to fail, and then throw an `AggregateError` containing an array of all the errors.
