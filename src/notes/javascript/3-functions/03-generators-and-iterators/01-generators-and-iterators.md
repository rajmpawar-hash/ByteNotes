# ⚙️ Generators & Iterators

In JavaScript, regular functions run to completion. Once you call `return`, the function is completely done and its execution context is destroyed.

But what if you wanted to pause a function halfway through, step outside, do something else, and then resume it right where it left off? That's where **Generators** come in!

## 🏭 1. Generator Functions (`function*`)

You create a generator by adding an asterisk `*` after the `function` keyword. Instead of returning a single value, a generator uses the `yield` keyword to pause execution and "yield" multiple values over time.

```javascript
function* numberGenerator() {
    console.log("Start!");
    yield 1;
    console.log("Middle!");
    yield 2;
    console.log("End!");
    yield 3;
}
```

### How do you run it?
When you call a generator function, it does **not** execute the code. Instead, it returns a special object called an **Iterator**.

```javascript
const iterator = numberGenerator(); // Nothing is printed yet!

console.log(iterator.next()); 
// Prints: "Start!"
// Returns: { value: 1, done: false }

console.log(iterator.next()); 
// Prints: "Middle!"
// Returns: { value: 2, done: false }

console.log(iterator.next()); 
// Prints: "End!"
// Returns: { value: 3, done: false }

console.log(iterator.next()); 
// Returns: { value: undefined, done: true }
```

Every time you call `.next()`, the code runs until it hits the next `yield`, returns that value, and then pauses.

---

## 🔁 2. The Iterator Protocol

Notice how `next()` always returns an object that looks like this: `{ value: 1, done: false }`?

This is called the **Iterator Protocol**. 
- `value`: The actual data yielded.
- `done`: A boolean that tells you if there are any more values left.

### Why does this matter?
Because **this is exactly how `for...of` loops work under the hood!**
When you use `for...of` on an Array or a Map, JavaScript secretly looks for an Iterator and calls `.next()` over and over until `done` is `true`!

Because Generators return Iterators, you can use `for...of` directly on them:

```javascript
function* abc() {
    yield 'a';
    yield 'b';
    yield 'c';
}

for (const letter of abc()) {
    console.log(letter); // 'a', then 'b', then 'c'
}
```

---

## ♾️ 3. Infinite Generators
Because generators pause execution, you can safely write infinite loops inside them without crashing your browser! They will only generate the next number when you explicitly ask for it.

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
// ... can go on forever, but only on demand!
```

---

## 🎯 Common Interview Questions

**Q: What is the difference between a regular function and a generator function?**
- **A:** A regular function runs to completion and returns one value. A generator function can be paused and resumed using the `yield` keyword, and returns an Iterator object that produces multiple values over time.

**Q: What does an Iterator's `next()` method return?**
- **A:** It returns an object with two properties: `value` (the yielded data) and `done` (a boolean indicating whether the iteration is complete).

**Q: Can you use a `for...of` loop on a Generator?**
- **A:** Yes! Generators return Iterables, meaning they perfectly adhere to the protocols required by `for...of` and the spread operator (`...`).
