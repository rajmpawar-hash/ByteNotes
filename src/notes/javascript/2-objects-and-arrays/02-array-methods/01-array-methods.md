# 📚 Array Methods Deep Dive

> [!TIP]
> **The 30-Second Interview Pitch**
> JavaScript Arrays come with powerful built-in methods. Crucially, you must distinguish between mutating methods (like `splice`, `push`, `sort`) that modify the original array in memory, and non-mutating methods (like `slice`, `map`, `filter`) that return a new array. Additionally, understand that `map()` transforms and returns a new array, while `forEach()` only iterates for side-effects and returns `undefined`.

Arrays in JavaScript are Objects equipped with dozens of powerful built-in methods. 

## 1. Mutating vs Non-Mutating Methods

| Mutating (Modifies Original) | Non-Mutating (Returns New Array/Value) |
| :--- | :--- |
| `push()`, `pop()` | `concat()` |
| `shift()`, `unshift()` | `slice()` |
| `splice()` | `flat()` |
| `reverse()` | `join()` |
| `fill()`, `sort()` | `map()`, `filter()`, `reduce()` |

---

## 2. The Big Two: `splice()` vs `slice()`

Interviewers love testing the difference between these two.

### ✂️ `slice(start, end)` (Non-Mutating)
Copies a portion of the array into a **new** array from `start` up to (but not including) `end`.
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
const removed = arr.splice(1, 2, 'X', 'Y'); 

console.log(removed); // ['b', 'c'] (What was deleted)
console.log(arr);     // ['a', 'X', 'Y', 'd'] (Original IS mutated!)
```

---

## 3. Iteration & Transformation: `map`, `filter`, `reduce`, `forEach`

### `map()`
Transforms every element in an array and returns a **new array**.
```javascript
let arr1 = [1, 2, 3];
let mapArray = arr1.map((e) => e * 2);
console.log(mapArray); // [2, 4, 6]
```

### `filter()`
Returns a **new array** containing only elements that pass the given condition.
```javascript
const arr = [1, 2, 3, 4, 5];
let result = arr.filter((num) => num % 2 === 0);
console.log(result); // [2, 4]
```

### `reduce()`
Reduces the array to a single value (can be a number, string, object, etc.).
```javascript
const fruits = ["apple", "apple", "banana"];
const count = fruits.reduce((acc, curr) => {
    acc[curr] = (acc[curr] || 0) + 1;
    return acc;
}, {}); // {} is the initial value for the accumulator

console.log(count); // { apple: 2, banana: 1 }
```

### `forEach()`
Iterates over the array but **does not return anything** (returns `undefined`). Used strictly for side effects.

> [!WARNING]
> **Gotchas of `forEach()`**
> 1. You **cannot** use `break` or `continue` inside a `forEach` loop. If you try, you'll get a syntax error.
> 2. It always returns `undefined`, so chaining it like `arr.map().forEach().filter()` will fail because `forEach` breaks the chain.

```javascript
let arr2 = [1, 2, 3].forEach(e => console.log(e));
console.log(arr2); // Output: undefined
```

---

## 4. Array Destructuring

Extracts elements from an array and assigns them to variables in one line.
```javascript
let data = ["first", "second", "third"];
let [a, b, c] = data;

console.log(a); // "first"
```

---

## 5. Array-Like Objects

> [!IMPORTANT]
> **What is an Array-Like Object?**
> Array-like objects have indexed elements (`obj[0]`) and a `length` property, but they **do not** have array methods like `map()`, `push()`, or `filter()`.
> Examples: Strings, the `arguments` object in functions, and DOM `NodeList` (from `document.querySelectorAll`).

**How to convert an Array-Like Object to a real Array:**
1. `Array.from(arrayLike)`
2. Spread Operator: `[...arrayLike]`
3. Legacy way: `Array.prototype.slice.call(arrayLike)`

```javascript
function example() {
    // arguments is an array-like object
    let realArray = Array.from(arguments);
    realArray.push(4); // Now we can use array methods!
}
```

---

## 🎯 Interview Checklist
- [ ] `slice` (returns new array) vs `splice` (mutates).
- [ ] `map` (returns new array) vs `forEach` (returns undefined, no break/continue).
- [ ] How to convert an Array-Like Object (like `arguments` or `NodeList`) into a real Array.
