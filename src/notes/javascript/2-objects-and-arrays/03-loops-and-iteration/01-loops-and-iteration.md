# 🔁 Loops & Iteration (`for...in` vs `for...of`)

JavaScript provides several ways to loop through data. The most common point of confusion in interviews is knowing the difference between `for...in` and `for...of`.

```mermaid
flowchart LR
    A["Data Structures"] --> B{"Is it an Object or Iterable?"}
    B -->|Object| C["for...in"]
    B -->|Iterable (Array, String)| D["for...of"]
    
    C --> E["Iterates over KEYS"]
    D --> F["Iterates over VALUES"]
```

---

## 🗂️ 1. `for...in` (The Object Loop)

The `for...in` loop is designed to iterate over all **enumerable properties** (keys) of an object.

> **Mnemonic:** `in` stands for **In**specting Objects.

```javascript
const user = {
    name: "Alice",
    age: 25,
    role: "Admin"
};

for (const key in user) {
    console.log(key, "->", user[key]);
}
// Output:
// name -> Alice
// age -> 25
// role -> Admin
```

### 🚨 Why shouldn't you use `for...in` on Arrays?
Technically, arrays are just objects where the keys are numbers (`0, 1, 2`). So `for...in` *will* work, but it returns the **indexes as strings** (`"0"`, `"1"`), not the values! It also loops over any custom properties attached to the array object, which can cause massive bugs.

```javascript
const colors = ["red", "blue", "green"];
colors.customProperty = "Hello"; // Arrays are objects, you can do this!

for (const index in colors) {
    console.log(index); 
}
// Output: "0", "1", "2", "customProperty" (Yikes!)
```

---

## 📚 2. `for...of` (The Iterable Loop)

Introduced in ES6, `for...of` is designed to iterate over **Iterables** (Arrays, Strings, Maps, Sets). It loops over the actual **values**, not the keys.

> **Mnemonic:** `of` stands for Values **Of** Arrays.

```javascript
const colors = ["red", "blue", "green"];

for (const color of colors) {
    console.log(color);
}
// Output:
// red
// blue
// green
```

### What if you try `for...of` on a plain Object?
It will throw an error! Plain objects are **not iterable** by default.
```javascript
const user = { name: "Alice", age: 25 };

for (const value of user) {
    console.log(value); 
}
// ❌ TypeError: user is not iterable
```

*(Note: To loop over object values, use `Object.values(user)` or `Object.entries(user)` combined with `for...of`!)*

---

## 🔄 3. Standard Loops

### The Classic `for` Loop
Best used when you need precise control over the index, or you need to loop a specific number of times.

```javascript
for (let i = 0; i < 5; i++) {
    console.log(i); // 0, 1, 2, 3, 4
}
```

### `while` and `do...while`
- `while`: Checks the condition **before** running the block. Might run zero times.
- `do...while`: Checks the condition **after** running the block. Guaranteed to run at least once.

```javascript
let count = 0;
do {
    console.log("This prints once even though 0 < 0 is false!");
} while (count < 0);
```

---

## 🛑 4. `break` and `continue`

- **`break`**: Completely exits the loop immediately.
- **`continue`**: Skips the rest of the current iteration and jumps to the next one.

```javascript
for (let i = 1; i <= 5; i++) {
    if (i === 3) continue; // Skips printing 3
    if (i === 5) break;    // Stops the loop entirely before 5
    
    console.log(i); 
}
// Output: 1, 2, 4
```

---

## ⚠️ 5. The Loop Declaration Gotcha (`var` vs `let` vs `const`)

It is highly recommended to use `let` in loops, but what happens if you use `const` or `var`?

### Using `const` in Loops
You **CAN** use `const` in `for...in` and `for...of` loops! 
```javascript
const user = { name: "Shubh", age: 22 };

// ✅ This works perfectly!
for (const key in user) {
    console.log(key); 
}
```
**Why does it work?** Because in `for...in` and `for...of` loops, a *brand new block scope* is created for every single iteration. `key` is effectively a new constant created from scratch each time the loop runs. (Note: You still cannot reassign `key` *inside* the loop body).

**However, `const` FAILS in a standard `for` loop:**
```javascript
// ❌ TypeError: Assignment to constant variable.
for (const i = 0; i < 5; i++) { 
    console.log(i);
}
```
**Why?** Because the standard `for` loop explicitly attempts to reassign the same variable (`i++`), which `const` forbids.

### Using `var` in Loops (Dangerous!)
You **CAN** use `var` in all loops, but it is dangerous because `var` does **not** have block scope. It will "leak" outside of the loop!

```javascript
for (var i = 0; i < 3; i++) {
    console.log("Inside:", i);
}

// ⚠️ 'i' still exists out here and holds the value 3!
console.log("Outside:", i); 
```
If you used `let` or `const`, accessing `i` outside the loop would correctly throw a `ReferenceError`. Using `var` inside a loop with asynchronous code (like `setTimeout`) also causes a famous bug where the timeout callbacks all reference the *final* value of the loop variable!

---

## 🎯 Common Interview Questions

**Q: What is the main difference between `for...in` and `for...of`?**
- **A:** `for...in` loops over the **keys** of an object (including inherited enumerable properties). `for...of` loops over the **values** of an Iterable (like an Array, String, or Map).

**Q: Why is it bad practice to use `for...in` on an Array?**
- **A:** Because arrays are objects, `for...in` will return the array indexes as strings (`"0"`, `"1"`). Worse, if a third-party library attached a custom property to `Array.prototype`, the `for...in` loop will iterate over that custom property too, causing unexpected bugs!
