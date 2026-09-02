# 🎛️ Operators & Control Flow

> [!TIP]
> **The 30-Second Interview Pitch**
> JavaScript operators follow strict precedence rules and can trigger implicit type coercion (like the `+` vs `-` operator differences). **Control Flow** is the mechanism by which your code makes decisions and branches its execution paths, primarily handled using `if...else` statements, `switch` statements, and the ternary operator.

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

## 2. Control Flow

Control Flow refers to how your code makes decisions. Without control flow, your program would just execute every single line from top to bottom. Control flow allows the code to *branch* based on logic.

### 🔀 `if / else if / else`
The most common way to branch code. It relies on truthy/falsy evaluation.

```javascript
const age = 20;

if (age < 18) {
    console.log("Too young");
} else if (age >= 18 && age < 21) {
    console.log("Adult, but no drinking");
} else {
    console.log("Full adult");
}
```

### 🚦 `switch` Statements
When you need to check a single variable against many possible exact values, a `switch` is much cleaner than a massive `if/else` chain.

> [!WARNING]
> **Gotcha: The Missing `break` (Fall-through)**
> A `switch` statement uses strict equality (`===`). If you forget to add `break;` at the end of a `case`, JavaScript will execute that case AND "fall through" to execute every subsequent case below it, regardless of whether they match!

```javascript
const role = "editor";

switch (role) {
    case "admin":
        console.log("Full Access");
        break;
    case "editor":
        console.log("Can Edit");
        // Oops, we forgot the break statement!
    case "viewer":
        console.log("Can View");
        break;
    default:
        console.log("Unknown Role");
}
// Output for "editor" will be:
// "Can Edit"
// "Can View" (Because it fell through!)
```

### ❓ The Ternary Operator
The ternary operator is the only JavaScript operator that takes three operands. It is frequently used in React as a one-line alternative to `if/else`.

```javascript
const isPremium = true;

// if/else way
let greeting;
if (isPremium) {
    greeting = "Welcome back, VIP!";
} else {
    greeting = "Welcome!";
}

// Ternary way
const shortGreeting = isPremium ? "Welcome back, VIP!" : "Welcome!";
```
