# 📚 Array Methods Deep Dive

Arrays in JavaScript are Objects equipped with dozens of powerful built-in methods. A critical concept for interviews is understanding which methods **mutate** (change) the original array, and which methods **return a new array** (non-mutating).

## 1. Mutating vs Non-Mutating Methods

| Mutating (Modifies Original) | Non-Mutating (Returns New Array/Value) |
| :--- | :--- |
| `push()`, `pop()` | `concat()` |
| `shift()`, `unshift()` | `slice()` |
| `splice()` | `flat()` |
| `reverse()` | `join()` |
| `fill()` | `includes()`, `indexOf()` |

> **💡 Where are `map`, `filter`, and `reduce`?**
> These are **Higher-Order Functions** that require passing functions as arguments (callbacks). We will cover them deeply in the [Functions](/javascript/3-functions/01-functions/01-first-class-functions) section once you learn about Callbacks!

---

## 2. The Big Two: `splice()` vs `slice()`

Interviewers love testing the difference between these two.

### ✂️ `slice(start, end)` (Non-Mutating)
Copies a portion of the array into a **new** array.
```javascript
const arr = ['a', 'b', 'c', 'd'];
const copy = arr.slice(1, 3); 

console.log(copy); // ['b', 'c']
console.log(arr);  // ['a', 'b', 'c', 'd'] (Original is unchanged)
```

### 🔪 `splice(start, deleteCount, ...items)` (Mutating)
Changes the contents of an array by removing or replacing existing elements and/or adding new elements in place.
```javascript
const arr = ['a', 'b', 'c', 'd'];
const removed = arr.splice(1, 2, 'X'); 

console.log(removed); // ['b', 'c'] (What was deleted)
console.log(arr);     // ['a', 'X', 'd'] (Original IS mutated!)
```

---

## 3. Adding and Removing

- **`push()`**: Adds to the **end**. Returns new length. (Mutating)
- **`pop()`**: Removes from the **end**. Returns the removed item. (Mutating)
- **`unshift()`**: Adds to the **beginning**. Returns new length. (Mutating)
- **`shift()`**: Removes from the **beginning**. Returns the removed item. (Mutating)

---

## 4. Searching and Checking

- **`indexOf(item)`**: Returns the first index of the item, or `-1` if not found.
- **`includes(item)`**: Returns `true` or `false` (Better for `NaN` checks than `indexOf`).

---

## 5. Sorting 

### `sort()` (Mutating)
Sorts the elements of an array **in place**.
🚨 **Gotcha:** By default, `sort()` converts elements to strings and compares their UTF-16 code unit values! 

```javascript
const nums = [10, 2, 30];
nums.sort(); // ❌ Result: [10, 2, 30] (Because "10" comes before "2" in strings)
```
*(To sort numbers properly, you need to pass a callback function to `sort()`, which we will learn about in the next section!)*

---

## 🎯 Interview Checklist
- [ ] Know the difference between `slice` and `splice`.
- [ ] Memorize which methods mutate the original array.
- [ ] Understand the default string-based sorting behavior of `sort()`.
