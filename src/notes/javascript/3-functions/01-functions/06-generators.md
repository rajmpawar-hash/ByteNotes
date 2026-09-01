# ⚙️ Generator Functions

> [!TIP]
> **The 30-Second Interview Pitch**
> A Generator is a special type of function in JavaScript (denoted by `function*`) that can pause its execution and resume it later. Using the `yield` keyword, it returns multiple values one at a time, instead of all at once. This is heavily used in libraries like Redux Saga to handle complex asynchronous data streams.

## 1. How Generators Work

Unlike normal functions that run from top to bottom without stopping, **generators can yield control back to the calling code** and then pick up right where they left off.

```javascript
function* messages() {
    yield "Start process";
    console.log("This happens between yields!");
    yield "Processing...";
    yield "Process completed";
}

const gen = messages(); // Returns a generator object (an Iterator)

console.log(gen.next()); // { value: 'Start process', done: false }
console.log(gen.next()); // { value: 'Processing...', done: false }
console.log(gen.next()); // { value: 'Process completed', done: false }
console.log(gen.next()); // { value: undefined, done: true }
```

### Breakdown of the Output Object
When you call `gen.next()`, it returns an object with two properties:
1. **`value`**: The value that was `yield`ed.
2. **`done`**: A boolean indicating if the function has finished executing (`true` when there are no more yields).

---

## 2. Key Terminology

### `function*`
The asterisk denotes that this is a generator function, not a standard function. (It can be written as `function* name()` or `function *name()`).

### `yield`
The `yield` keyword pauses the execution of the generator function and returns a value to the caller. The function stays paused until `.next()` is called again.

### `next()`
The `.next()` method resumes the generator function from exactly where it stopped. 

> [!IMPORTANT]
> **Gotcha: Passing Values back into `next()`**
> You can actually pass values back *into* the generator by providing an argument to `.next()`. This replaces the entire `yield` expression with the passed value!

```javascript
function* mathGenerator() {
    const x = yield "Give me a number";
    const y = yield "Give me another number";
    yield `The sum is ${x + y}`;
}

const mathGen = mathGenerator();

console.log(mathGen.next());       // { value: 'Give me a number', done: false }
console.log(mathGen.next(10));     // Passes 10 to 'x' -> { value: 'Give me another number', done: false }
console.log(mathGen.next(20));     // Passes 20 to 'y' -> { value: 'The sum is 30', done: false }
```

---

## 3. Real-World Use Cases

Generators are rarely used for basic UI logic, but they shine in specific complex scenarios:

1. **Custom Iterators:** Generating infinite sequences (e.g., ID generation) without causing a memory overflow.
2. **Redux Saga:** Managing complex, long-running asynchronous flows in Redux (side effects).
3. **Data Streaming:** Processing large chunks of data sequentially without blocking the main thread.

### Example: Infinite ID Generator

Because a generator pauses after every `yield`, you can safely write an infinite `while(true)` loop inside it!

```javascript
function* idMaker() {
    let index = 0;
    while (true) {
        yield index++;
    }
}

const gen = idMaker();

console.log(gen.next().value); // 0
console.log(gen.next().value); // 1
console.log(gen.next().value); // 2
// You can call this forever, it will never crash the browser!
```

---

## 🎯 Common Interview Questions

**Q: What is the difference between `yield` and `return`?**
- **A:** `yield` pauses the function and returns a value, allowing it to be resumed later. `return` permanently terminates the function and returns a value.

**Q: Can you use arrow functions to create generators?**
- **A:** **No.** You cannot use arrow functions (`() => {}`) to create generators. You must use the `function*` keyword syntax.
