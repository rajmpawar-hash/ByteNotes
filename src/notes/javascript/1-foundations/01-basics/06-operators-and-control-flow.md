# 🎛️ Operators & Control Flow

> [!TIP]
> **The 30-Second Interview Pitch**
> JavaScript operators follow strict precedence rules and can trigger implicit type coercion (like the `+` vs `-` operator differences). For iteration, understanding the difference between `for...in` (iterates over enumerable string properties/keys) and `for...of` (iterates over iterable values like Arrays/Strings, but NOT plain objects) is crucial for avoiding runtime errors.

## 1. JavaScript Operators

### Unary, Binary, and Ternary
Operators can be classified by the number of operands they take:
- **Unary (1 operand):** `++a`, `a--`, `!true`, `typeof "hello"`
- **Binary (2 operands):** `a + b`, `a === b`, `a && b`
- **Ternary (3 operands):** `condition ? exprIfTrue : exprIfFalse`

### Pre-Increment vs Post-Increment
- `++a` (Pre): Increments the value first, then returns the new value.
- `a++` (Post): Returns the current value first, *then* increments it in memory.

```javascript
let x = 5;
console.log(x++); // 5 (Returns first)
console.log(x);   // 6 (Incremented)

let y = 5;
console.log(++y); // 6 (Increments first, then returns)
```

> [!IMPORTANT]
> **Operator Precedence (The Order of Operations)**
> Parentheses `()` always win. Then Postfix `a++` > Prefix `++a` > Exponentiation `**` > Multiplication/Division `* /` > Addition/Subtraction `+ -` > Relational `< >` > Equality `===` > Logical AND `&&` > Logical OR `||`.

---

## 2. Control Flow: The Loop Gotchas

JavaScript provides standard loops (`for`, `while`, `do...while`), but the most frequently tested concepts are `for...in` vs `for...of`.

### `for...in` (Iterates Keys)
Best used for exploring the properties (keys) of an **Object**.

```javascript
const user = { name: "Shubh", age: 22 };

for (let key in user) {
    console.log(key); // Output: "name", "age"
    console.log(user[key]); // Output: "Shubh", 22
}
```

### `for...of` (Iterates Values)
Best used for iterating over iterable data structures like **Arrays, Strings, Maps, and Sets**.

> [!WARNING]
> **Gotcha: Plain Objects are NOT Iterable!**
> If you try to use a `for...of` loop on a standard JavaScript object, it will throw a `TypeError`.

```javascript
// ❌ WRONG: Objects are not iterable
const user = { name: "Shubh", age: 22 };
for (let val of user) {
    console.log(val); // TypeError: user is not iterable
}

// ✅ CORRECT: Arrays are iterable
const numbers = [10, 20, 30];
for (let num of numbers) {
    console.log(num); // Output: 10, 20, 30
}

// ✅ CORRECT: Strings are iterable
for (let char of "Shubh") {
    console.log(char); // Output: "S", "h", "u", "b", "h"
}
```
