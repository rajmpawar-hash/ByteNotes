# 🦕 TypeScript Foundations

> [!TIP]
> **The 30-Second Interview Pitch**
> TypeScript is a superset of JavaScript that adds static typing. It catches errors at compile-time rather than run-time, improving developer experience and code maintainability, especially in large codebases. Browsers cannot run TypeScript; it must be compiled (transpiled) down to plain JavaScript.

## 1. Why TypeScript?

JavaScript is **dynamically typed**, meaning variables can change types at runtime:
```javascript
let myVar = "Hello";
myVar = 42; // Perfectly valid in JS
```

TypeScript is **statically typed**. You define the type, and it strictly enforces it:
```typescript
let myVar: string = "Hello";
myVar = 42; // ❌ Compile Error: Type 'number' is not assignable to type 'string'
```

### Key Benefits:
1. **Early Bug Detection:** Catches type-related errors before the code even runs in the browser.
2. **Superior Autocomplete:** IDEs (like VSCode) can provide highly accurate intellisense because they know exactly what properties exist on an object.
3. **Self-Documenting Code:** Types serve as built-in documentation for what a function expects.

---

## 2. Basic Types

```typescript
// Primitives
const isDone: boolean = false;
const age: number = 25;
const firstName: string = "Shubh";

// Arrays
const numbers: number[] = [1, 2, 3];
const names: Array<string> = ["React", "Node"]; // Generic syntax

// Any (Avoid this!)
// 'any' completely disables type checking. 
let anything: any = 4;
anything = "Now a string"; 
```

---

## 3. Interfaces & Type Aliases

The most common way to define the shape of objects.

### Interface
Used strictly for defining object shapes. They can be extended easily.
```typescript
interface User {
    name: string;
    age: number;
    isAdmin?: boolean; // Optional property
}

const user1: User = {
    name: "Shubh",
    age: 22
};
```

### Type Alias
More flexible. Can define objects, primitives, or unions.
```typescript
// Defining a Union type (can be one OR the other)
type Status = "pending" | "approved" | "rejected";

let currentStatus: Status = "pending";
// currentStatus = "unknown"; // ❌ Error!
```

---

## 🎯 Common Interview Questions

**Q: What is the difference between `interface` and `type` in TypeScript?**
- **A:** Both are used to define the shape of data. `interface` is specifically for objects and supports declaration merging (defining the same interface twice merges them). `type` aliases are more flexible and can define primitive unions (e.g., `string | number`) and tuples, but do not support declaration merging. Use `interface` for object shapes and `type` for complex unions or aliases.

**Q: Does TypeScript improve runtime performance?**
- **A:** No. TypeScript only exists at compile-time. Before running in the browser, all TypeScript is stripped away and compiled down to standard JavaScript. It improves *developer* speed and safety, not browser execution speed.
