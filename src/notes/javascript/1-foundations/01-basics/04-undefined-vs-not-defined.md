# ❓ Undefined vs Not Defined

In JavaScript, `undefined` and `not defined` might sound like the exact same thing in English, but they mean **two completely different things** to the JS Engine!

```mermaid
flowchart LR
    A[Variable Status] --> B(undefined)
    A --> C(not defined)
    
    B -->|Memory Allocated| D[Has memory, no value yet]
    C -->|Memory Missing| E[Never declared, no memory]
```

## 👻 1. `undefined` (The Placeholder)
When a variable is declared with `var`, JavaScript allocates memory for it during the Creation Phase. Before the code actually runs and assigns it a real value, it assigns it a special placeholder keyword: `undefined`.

- Think of it as a blank reserved seat at a theater. The seat exists, but no one is sitting in it yet.
- It is a specific data type in JavaScript.

```javascript
var a;
console.log(a); // Output: undefined (Memory exists, value is empty)
a = 10;
console.log(a); // Output: 10 (Value assigned!)
```

## 🚨 2. `not defined` (The Error)
If you try to access a variable that was *never declared* anywhere in your code, JavaScript hasn't allocated any memory for it. When it tries to find it in the Execution Context, it throws a `ReferenceError`.

- Think of it as trying to sit in row Z, when the theater only goes up to row F. The seat doesn't exist!

```javascript
console.log(x); // ReferenceError: x is not defined
```

---

## ⚠️ A Bad Practice

Since `undefined` is an actual value in JavaScript, you technically *can* manually assign it to a variable.

```javascript
var a = 10;
a = undefined; // ❌ DO NOT DO THIS!
```

**Why is it bad?** 
`undefined` is meant to be the system's way of saying "I haven't touched this yet." If you manually assign `undefined`, you destroy that meaning and make debugging very confusing. 

If you need to intentionally clear a variable's value, use `null` instead!

---

## 🧊 3. The Third State: TDZ (Temporal Dead Zone)
With `let` and `const`, there's actually a **third state** that many people miss! The variable has memory allocated (it IS hoisted), but you can't access it before its declaration line. The error message is **different** from "not defined":

```javascript
console.log(a); // ❌ ReferenceError: Cannot access 'a' before initialization
let a = 10;
```

Notice the difference:
- `x is not defined` → Variable was **never declared** anywhere.
- `Cannot access 'a' before initialization` → Variable **exists** in memory (hoisted), but you're in the Temporal Dead Zone!

```mermaid
flowchart TD
    A[Variable Access] --> B{"Was it declared?"}
    B -->|"No"| C["❌ ReferenceError: x is not defined"]
    B -->|"Yes, with var"| D["undefined (placeholder)"]
    B -->|"Yes, with let/const"| E{"Are we past the declaration line?"}
    E -->|"No (in TDZ)"| F["❌ ReferenceError: Cannot access before initialization"]
    E -->|"Yes"| G["✅ Actual value"]
```

## 🔎 4. The `typeof` Trick
The `typeof` operator is normally safe to use on undeclared variables (it returns `"undefined"` instead of throwing an error). But with TDZ variables, even `typeof` throws!

```javascript
console.log(typeof undeclaredVar);  // "undefined" — safe, no error!
console.log(typeof tdzVar);         // ❌ ReferenceError! — let/const in TDZ!
let tdzVar = 10;
```

> **Interview Tip:** If asked "what's the difference between `undefined`, `not defined`, and TDZ?" — these are three distinct states, not two!


## 🎯 Common Interview Questions

**Q: What does `typeof` return for an undeclared variable vs a TDZ variable?**
- **A:** `typeof undeclaredVar` returns `"undefined"` safely without error. However, using `typeof` on a `let`/`const` variable while it is in the TDZ throws a `ReferenceError`.

**Q: Is it good practice to assign `undefined` to clear a variable?**
- **A:** No. `undefined` should be left for the JS engine to use. Use `null` if you intentionally want to signify "empty value".