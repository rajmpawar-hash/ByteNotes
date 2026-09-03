# 🧩 TypeScript Types & Interfaces

> [!TIP]
> **The 30-Second Interview Pitch**
> TypeScript extends JavaScript by adding static typing. It provides basic types (string, number, boolean) and advanced types like `Tuple`, `Enum`, `Union`, and `Intersection`. `any` turns off type checking, while `unknown` is a safer alternative that forces type checking before use. `Interfaces` are used to define the shape of objects, and type assertions let you override TypeScript's inferred types.

## 1. Basic Types

TypeScript supports all standard JavaScript types, plus a few additions.

```typescript
let isDone: boolean = false;
let age: number = 25;
let firstName: string = "Raj";
let ids: number[] = [1, 2, 3, 4, 5];
```

---

## 2. Special Types: `any` vs `unknown`

### `any` (Avoid if possible!)
`any` completely disables TypeScript's type checking for that variable. It is a quick escape hatch but defeats the purpose of using TS.
```typescript
let obj: any = { x: 0 };
// None of these will throw a compile error!
obj.foo();
obj();
obj.bar = 100;
obj = "hello";
```

### `unknown` (The safer `any`)
`unknown` is like `any`, but **type-safe**. You can assign anything to an `unknown` variable, but you **cannot perform operations on it** until you narrow its type.
```typescript
let value: unknown = "Hello World";

// value.toUpperCase(); // ❌ Error: Object is of type 'unknown'

if (typeof value === "string") {
    console.log(value.toUpperCase()); // ✅ Works! Type is narrowed to string
}
```

---

## 3. `void` vs `never`

### `void`
Used for functions that do not return a value.
```typescript
function logMessage(message: string): void {
    console.log(message);
    // implicitly returns undefined
}
```

### `never`
Used for functions that **never** reach the end of their execution (e.g., they throw an error or contain an infinite loop).
```typescript
function throwError(message: string): never {
    throw new Error(message);
}

function infiniteLoop(): never {
    while (true) {}
}
```

---

## 4. Tuples & Enums

### Tuple
A Tuple is an array with a fixed number of elements whose types are known.
```typescript
let user: [number, string] = [1, "Raj"];
// user = ["Raj", 1]; // ❌ Error: Type 'string' is not assignable to type 'number'
```

### Enum
Enums allow you to define a set of named constants. By default, they are numeric, starting at 0.
```typescript
enum Direction {
    Up = 1,    // Starts at 1
    Down,      // 2
    Left,      // 3
    Right,     // 4
}
console.log(Direction.Up); // 1

// String Enums
enum Status {
    Pending = "PENDING",
    Success = "SUCCESS",
    Failed = "FAILED",
}
```

---

## 5. Unions, Intersections & Type Assertions

### Union Types (`|`)
Allows a variable to be one of multiple types.
```typescript
function printId(id: number | string) {
    console.log(`Your ID is: ${id}`);
}
printId(101); // OK
printId("202"); // OK
```

### Intersection Types (`&`)
Combines multiple types into one. Often used with interfaces/objects.
```typescript
type Draggable = { drag: () => void };
type Resizable = { resize: () => void };

type UIWidget = Draggable & Resizable;

const widget: UIWidget = {
    drag: () => console.log("Dragging"),
    resize: () => console.log("Resizing")
};
```

### Type Assertions (`as`)
Sometimes you know more about a value's type than TypeScript does. You can use `as` to override the compiler.
```typescript
// TS only knows this is an HTMLElement, but WE know it's a Canvas
const myCanvas = document.getElementById("main_canvas") as HTMLCanvasElement;

// Alternative syntax (not allowed in React JSX):
const myCanvas2 = <HTMLCanvasElement>document.getElementById("main_canvas");
```

---

## 🎯 Common Interview Questions

**Q: What is the difference between `any` and `unknown`?**
- **A:** `any` turns off type checking entirely, allowing any operation. `unknown` accepts any value but forces you to perform type checking (narrowing) before you can actually use the value or call methods on it, making it much safer.
